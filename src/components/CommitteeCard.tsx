import TelegramIcon from "../assets/icons/telegram.svg"
import EmailIcon from "../assets/icons/email.svg"
import PhoneIcon from "../assets/icons/phone.svg"
import { CommitteeMember } from "../types/strapi"
import parseImageUrl from "../utils/parseImageUrl"
import TextWithIcon from "./TextWithIcon"

type Props = {
  member: CommitteeMember
}

const CommitteeCard: React.FC<Props> = ({ member }) => {
  const { name, email, phoneNumber, position, picture, telegramUsername } =
    member
  return (
    <div className="flex h-60 rounded-xl bg-gray-darkest">
      <img
        src={parseImageUrl(picture.url)}
        alt="member"
        className="w-2/5 rounded-l-xl object-cover"
      />
      <div className="w-3/5 flex flex-col text-white p-4">
        <h3 className="tracking-widest text-xl font-bold font-mono">{name}</h3>
        <div className="flex-grow mb-2">{position}</div>
        <TextWithIcon icon={EmailIcon} text={email} alt="email" />
        <TextWithIcon icon={PhoneIcon} text={phoneNumber} alt="phone" />
        <TextWithIcon
          icon={TelegramIcon}
          text={telegramUsername}
          alt="telegram"
        />
      </div>
    </div>
  )
}

export default CommitteeCard
