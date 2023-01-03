type Props = {
  title: string
  description?: string
}

const Meta: React.FC<Props> = ({ title, description }) => {
  return (
    <>
      <title>{title && `${title} \u2013`} Tietokilta</title>
      {description && <meta name="description" content={description} />}
    </>
  )
}

export default Meta
