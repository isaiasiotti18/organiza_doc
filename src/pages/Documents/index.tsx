import { DocumentCard } from "@/components/DocumentCard";
import { useParams } from "react-router-dom";

import { documentsArray, DocumentCardProps } from "./documentos.array";
import { useEffect, useState } from "react";

export function Documents() {
  const { category: categoryParam } = useParams<{ category: string }>();
  const [documents, setDocuments] = useState<DocumentCardProps[]>([]);

  useEffect(() => {
    if (categoryParam !== "all") {
      const filtered = documentsArray.filter(
        (doc) => doc.category?.toLowerCase() === categoryParam?.toLowerCase(),
      );

      setDocuments(filtered);
    } else {
      setDocuments(documentsArray);
    }
  }, [categoryParam]);

  return (
    <div className="m-0 flex h-full w-full flex-col flex-wrap gap-1 p-0 sm:flex sm:flex-row md:flex md:flex-row md:items-stretch md:justify-stretch">
      {documents.length === 0 ? (
        <p>Não há documentos nesta categoria.</p>
      ) : (
        documents.map((document) => (
          <DocumentCard
            key={document.url}
            category={document.category}
            description={document.description}
            name={document.name}
            url={document.url}
          />
        ))
      )}
    </div>
  );
}
