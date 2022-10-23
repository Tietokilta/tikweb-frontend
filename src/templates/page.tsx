import ContentRenderer from "../components/ContentRenderer"
import Layout from "../components/Layout"
import SideBar from "../components/SideBar"
import { StrapiNavigation, StrapiPage, StrapiPartners } from "../types/strapi"

type Props = {
  pageContext: {
    page: StrapiPage
    navigation: StrapiNavigation
    partners: StrapiPartners
  }
}

const Page: React.FC<Props> = ({
  pageContext: { page, navigation, partners },
}) => {
  return (
    <Layout partners={partners}>
      <SideBar items={navigation.items}>
        <h1>{partners.title}</h1>
        <ContentRenderer contentBlocks={page.content} />
      </SideBar>
    </Layout>
  )
}

export default Page
