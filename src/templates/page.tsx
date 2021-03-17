import Layout from "../components/Layout"
import { StrapiPage } from "../types/strapi"

type Props = {
  pageContext: {
    page: StrapiPage
  }
}

const Page: React.FC<Props> = ({ pageContext: { page } }) => {
  return (
    <Layout>
      <h1>{page.title}</h1>
      {page.content.map((contentBlock) => JSON.stringify(contentBlock))}
    </Layout>
  )
}

export default Page
