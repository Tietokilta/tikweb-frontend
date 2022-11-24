type Props = {
  icon: string
  text: string | undefined
  alt: string
}

const TextWithIcon: React.FC<Props> = ({ icon, text, alt }) => {
  return (
    <div className="flex items-center mb-4 h-4 text-sm">
      {text ? (
        <>
          <img className="h-full mr-2" src={icon} alt={alt} /> {text}
        </>
      ) : null}
    </div>
  )
}

export default TextWithIcon
