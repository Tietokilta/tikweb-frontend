import ContentRenderer from "../components/ContentRenderer"
import Layout from "../components/Layout"
import SideBar from "../components/SideBar"
import { StrapiNavigation, StrapiPage } from "../types/strapi"

type Props = {
  pageContext: {
    page: StrapiPage
    navigation: StrapiNavigation
  }
}

const Page: React.FC<Props> = ({ pageContext: { page, navigation } }) => {
  return (
    <Layout>
      <SideBar items={navigation.items}>
        <h1>{page.title}</h1>
        <ContentRenderer contentBlocks={page.content} />
      </SideBar>
    </Layout>
  )
}

export default Page
