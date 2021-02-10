import * as React from "react"
import { PageProps } from "gatsby"


// markup
const NotFoundPage = (props: PageProps) => {
  return (
    <main>
      <h1>Not found</h1>
      <p>{props.path}</p>
    </main>
  )
}

export default NotFoundPage
