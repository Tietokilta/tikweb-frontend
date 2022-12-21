type Props = {
  title: string
  description?: string
}

const Meta: React.FC<Props> = ({ title, description }) => {
  return (
    <>
      <title>Tietokilta{title && ` - ${title}`}</title>
      {description && <meta name="description" content={description} />}
    </>
  )
}

export default Meta
