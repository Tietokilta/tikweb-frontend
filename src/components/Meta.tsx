type Props = {
  title: string
  description?: string
  noIndex?: boolean
}

const Meta: React.FC<Props> = ({ title, description, noIndex }) => {
  return (
    <>
      <title>{title && `${title} \u2013`} Tietokilta</title>
      {description && <meta name="description" content={description} />}
      {noIndex && <meta name="robots" content="noindex" />}
    </>
  )
}

export default Meta
