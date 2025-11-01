import { DocumentCard } from "@/components/DocumentCard";
import { useParams } from "react-router-dom";
import { useGetDocuments } from "@/hooks/documents/use-get-documents";
import { LoadingDocuments } from "@/components/DocumentCard/LoadingDocuments";
import { AlertNoDocument } from "@/components/AlertNoDocument";

export function Documents() {
  const { category: categoryParam } = useParams<{ category: string }>();
  const { data: resultDocuments, isLoading } = useGetDocuments();

  if (isLoading) return <LoadingDocuments />;

  if (!resultDocuments) return <p>Erro ao carregar documentos.</p>;

  // --- Aplica filtro somente depois que há dados ---
  const filteredDocuments =
    !categoryParam || categoryParam.toLowerCase() === "all"
      ? resultDocuments
      : resultDocuments.filter(
          (doc) =>
            doc.category?.name?.toLowerCase() === categoryParam.toLowerCase(),
        );

  // --- Renderização final ---
  if (filteredDocuments.length === 0) return <AlertNoDocument />;

  return (
    <div className="m-0 flex h-full w-full flex-col flex-wrap gap-1 p-0 sm:flex sm:flex-row md:flex md:flex-row md:items-stretch md:justify-stretch">
      {filteredDocuments.map((document) => (
        <DocumentCard
          key={document.id}
          id={document.id}
          title={document.title}
          description={document.description}
          category={document.category}
          file_url={document.file_url}
          expires_at={document.expires_at}
          created_at={document.created_at}
        />
      ))}
    </div>
  );
}
