import { PageProps } from "gatsby"

const NotFoundPage: React.FC<PageProps> = (props: PageProps) => {
  const { path } = props

  return (
    <main>
      <h1>Not found</h1>
      <p>{path}</p>
    </main>
  )
}

export default NotFoundPage
