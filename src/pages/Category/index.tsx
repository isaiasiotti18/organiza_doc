import { useParams } from "react-router-dom"

export function Category() {
  const params = useParams()
  const category = params.category
  
  return(
    <div>
      <h1>{category}</h1>
    </div>
  )
}