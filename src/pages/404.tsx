import { PageProps } from "gatsby"

const NotFoundPage: React.FC<PageProps> = (props: PageProps) => {
  return (
    <main>
      <h1>Not found</h1>
      <p>{props.path}</p>
    </main>
  )
}

export default NotFoundPage
