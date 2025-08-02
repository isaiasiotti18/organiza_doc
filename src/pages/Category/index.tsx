import { DocumentCard } from "@/components/DocumentCard"
import { useParams } from "react-router-dom"

import { documentsArray, DocumentCardProps } from './documentos.array'
import { useEffect, useState } from "react";

export function Category() {
  const { category } = useParams<{ category: string }>();
  const [filteredDocuments, setFilteredDocuments] = useState<DocumentCardProps[]>([]);

  useEffect(() => {
    if (category) {
      const filtered = documentsArray.filter(doc => doc.category?.toLowerCase() === category.toLowerCase());
      
      setFilteredDocuments(filtered);
    }
  }, [category]);  
  
  return(
    <div className="
      flex
      flex-col
      gap-1 flex-wrap w-full h-full p-0 m-0
      md:flex md:flex-row md:justify-stretch md:items-stretch
      sm:flex sm:flex-row
    ">
      {filteredDocuments.length === 0 ? (
        <p>Não há documentos nesta categoria.</p>
      ) : (
        filteredDocuments.map((document) => (
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
  )
}