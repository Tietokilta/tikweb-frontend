const parseImageUrl = (url: string) => {
  if (process.env.NODE_ENV === "development") {
    return `${process.env.STRAPI_URL + url}?format=webp`
  }
  return url
}

export default parseImageUrl
