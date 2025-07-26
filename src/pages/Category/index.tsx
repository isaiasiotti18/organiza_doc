import { DocumentCard } from "@/components/DocumentCard"
import { useParams } from "react-router-dom"

export function Category() {
  const params = useParams()
  const category = params.category
  
  return(
    <div className="flex flex-row gap-3 flex-wrap w-full h-full p-0 m-0">
      <DocumentCard
        category={category}
        description="Esse é um documento importante!"
        name="CNH"
        url="https://meudocumento.com.br/cnh"
      />

      <DocumentCard
        category={category}
        description="Esse é um documento importante!"
        name="CNH"
        url="https://meudocumento.com.br/cnh"
      />

      <DocumentCard
        category={category}
        description="Esse é um documento importante!"
        name="CNH"
        url="https://meudocumento.com.br/cnh"
      /> 
    </div>
  )
}