import ContentRenderer from "../components/ContentRenderer"
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
      <ContentRenderer contentBlocks={page.content} />
    </Layout>
  )
}

export default Page
