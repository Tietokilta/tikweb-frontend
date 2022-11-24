import TelegramIcon from "../assets/icons/telegram.svg"
import EmailIcon from "../assets/icons/email.svg"
import PhoneIcon from "../assets/icons/phone.svg"
import { ComitteeMember } from "../types/strapi"
import parseImageUrl from "../utils/parseImageUrl"
import TextWithIcon from "./TextWithIcon"

type Props = {
  member: ComitteeMember
}

const CommitteeCard: React.FC<Props> = ({ member }) => {
  const { name, email, phoneNumber, position, picture, telegramUsername } =
    member
  return (
    <div className="flex w-full h-full rounded-xl bg-gray-darkest">
      <div className="w-2/5">
        <img
          src={parseImageUrl(picture.url)}
          alt="member"
          className="h-full w-full rounded-l-xl"
        />
      </div>
      <div className="w-3/5 flex flex-col text-white p-4">
        <div className="tracking-widest text-xl font-bold font-mono">
          {name}
        </div>
        <div className="flex-grow">{position}</div>
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
