import { DocumentCard } from "@/components/DocumentCard"
import { useParams } from "react-router-dom"

export function Category() {
  const params = useParams()
  const category = params.category
  
  return(
    <div>
      <DocumentCard/>
    </div>
  )
}