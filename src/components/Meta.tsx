type Props = {
  title: string
  titleSuffix?: boolean
  description?: string
  noIndex?: boolean
}

const Meta: React.FC<Props> = ({
  title,
  titleSuffix = true,
  description,
  noIndex,
}) => {
  return (
    <>
      <title>
        {title}
        {titleSuffix && " \u2013 Tietokilta"}
      </title>
      {description && <meta name="description" content={description} />}
      {noIndex && <meta name="robots" content="noindex" />}
    </>
  )
}

export default Meta
