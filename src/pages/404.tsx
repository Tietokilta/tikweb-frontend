import { PageProps } from "gatsby"
import DinoGame from "../components/DinoGame"

const NotFoundPage: React.FC<PageProps> = (props: PageProps) => {
  const { path } = props

  return (
    <main className="bg-white">
      <h1>Not found</h1>
      <p>{path}</p>
      <DinoGame />
    </main>
  )
}

export default NotFoundPage
