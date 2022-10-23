import Telegram from '../assets/icons/telegram.png'
import Email from '../assets/icons/email.png'

interface Committee{
    id: number,
    name: string,
    description: string,
    email: string,
    phone: string,
    image: string,
}



const CommitteeCard = ({committee }:{committee:Committee}) => {
    return(
        <div className='display flex w-full rounded-lg bg-black flex-initial '>
            <div className='w-2/5'>
                <img src={committee.image} alt='committee image' className='w-full h-full object-cover'/>
            </div>
            <div className='w-3/5 flex flex-col text-white p-4 font-normal text-xs '>
                <div className="tracking-widest text-xl font-bold">{committee.name} </div>
                <div className="text-sm flex-grow">{committee.description}</div>
                <div className="flex items-center mb-1"><img className='h-2 mr-2' src={Email}></img> {committee.email}</div>
                <div className="flex items-center"><img className='h-2 mr-2' src={Telegram}></img>{committee.phone}</div>
            </div>
        </div>
    )
}

export default CommitteeCard