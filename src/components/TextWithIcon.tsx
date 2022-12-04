type Props = {
  icon: string
  text: string | undefined
  alt: string
}

const TextWithIcon: React.FC<Props> = ({ icon, text, alt }) => {
  return text ? (
    <div className="flex items-end mb-4 h-4 text-sm">
      <img className="h-full mr-2" src={icon} alt={alt} /> {text}
    </div>
  ) : null
}

export default TextWithIcon
