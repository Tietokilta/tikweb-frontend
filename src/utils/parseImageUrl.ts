const parseImageUrl = (url: string) => {
  if (process.env.NODE_ENV === "development") {
    return process.env.STRAPI_URL + url
  }
  return url
}

export default parseImageUrl
