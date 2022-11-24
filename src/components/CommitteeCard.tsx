import Telegram from "../assets/icons/telegram.png"
import Email from "../assets/icons/email.png"
import { ComitteeMember } from "../types/strapi"
import parseImageUrl from "../utils/parseImageUrl"

type Props = {
  member: ComitteeMember
}

const CommitteeCard: React.FC<Props> = ({ member }) => {
  const { name, email, phoneNumber, position, picture } = member
  return (
    <div className="display flex w-full rounded-lg bg-black flex-initial ">
      <div className="w-2/5">
        <img
          src={parseImageUrl(picture.url)}
          alt="member"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-3/5 flex flex-col text-white p-4 font-normal text-xs ">
        <div className="tracking-widest text-xl font-bold">{name} </div>
        <div className="text-sm flex-grow">{position}</div>
        <div className="flex items-center mb-1">
          <img className="h-2 mr-2" src={Email} alt="email" /> {email}
        </div>
        <div className="flex items-center">
          <img className="h-2 mr-2" src={Telegram} alt="telegram" />
          {phoneNumber}
        </div>
      </div>
    </div>
  )
}

export default CommitteeCard
