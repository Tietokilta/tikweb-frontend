import { StrapiPageContentBlock, TextBlock } from "../types/strapi"

const firstSentenceFromContent = (content: StrapiPageContentBlock[]) => {
  const textBlock = content.find(
    (block) => block.strapi_component === "common-content.text-block"
  ) as TextBlock | undefined
  const firstTextBlock = textBlock?.text.data.text
  const firstSentence = firstTextBlock
    ?.replace(/#+.+\n/g, "") // Remove headings
    ?.split(/[.\n]/) // Split by sentence or line break
    .find((string) => string && string.length > 0) // Find first non-empty string
    ?.concat(".")
  return firstSentence
}

export default firstSentenceFromContent
