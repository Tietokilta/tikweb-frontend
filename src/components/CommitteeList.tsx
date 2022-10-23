import committeePic from '../assets/committeePic.png'
import CommitteeCard from './CommitteeCard'

interface Committee{
    id: number,
    name: string,
    description: string,
    email: string,
    phone: string,
    image: string,
}

const testCommittee:Array<Committee>=[
    {
        "id": 1,
        "name": "Tietokilta",
        "description":"lorem ipsum dolor sit amet",
        "image": committeePic,
        "email": "123213123234",
        "phone": "123123123",
    },
    {
        "id": 2,
        "name": "Tietokilta",
        "description":"lorem ipsum dolor sit amet",
        "image": committeePic,
        "email": "123213123234",
        "phone": "123123123",
    }
]


const CommiteeList = () => {
    return (
        <div className='flex flex-wrap justify-around'>
            {testCommittee.map((committee:Committee) => {
                return (
                    <div className='md:m-4 m-1 md:w-[45%] w-9/10  '>
                    <CommitteeCard key={committee.id} committee={committee}/>
                    </div>
                )
            })}
        </div>
    )
}

export default CommiteeList