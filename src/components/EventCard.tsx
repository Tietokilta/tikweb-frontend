import classNames from "classnames";

type Props = {
    title: string;
    description?: string;
    date: Date;
    location: string;
    numberOfAttendees?: number;
    maxCapacity?: number;
    signUpLink: string;
    className?: string;
}

const days = ["su", "ma", "ti", "ke", "to", "pe", "la"]

const formatDateString = (t: Date): string => {
    const date = ('0' + t.getDate()).slice(-2);
    const month = ('0' + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear();
    const hours = ('0' + t.getHours()).slice(-2);
    const minutes = ('0' + t.getMinutes()).slice(-2);
    const day = days[t.getDay()]; // I guess the best way would to format date in strapi?
    return `${day} ${date}-${month}-${year}, klo ${hours}:${minutes}`;;
}

const EventCard: React.FC<Props> = (props: Props) => {
    return (
        <div className={classNames(props.className, "font-mono text-xl rounded-xl shadow-md bg-gray-darkest text-white p-4")}>
            <div className="flex flex-row justify-between">
                <div className="flex-column">
                    <p className="font-mono">{props.title} @ {props.location}</p>
                    <p className="font-mono text-sm">{formatDateString(props.date)}</p>
                </div>
                {props.description &&
                    <div className="flex-column justify-end py-1 px-3 rounded-2xl my-auto h-fit flex-shrink bg-white text-black font-mono text-sm font-bold">
                        {props.numberOfAttendees}/{props.maxCapacity}
                    </div>
                }
                {!props.description &&
                    <div className="flex-column justify-end my-auto font-mono text-sm font-bold">
                        <a className="link" href={props.signUpLink}>Lue lisää</a>
                    </div>
                }
            </div>
            {props.description &&
                <>
                    <div className="relative flex-row mt-3 text-sm font-sans">
                        {props.description}
                        <div className="absolute top-0 left-[-5px] h-[calc(100%+10px)] w-[calc(100%+10px)]" style={{ background: "linear-gradient(180deg, rgba(2,0,36,0) 20%, rgba(33,39,48,1) 79%)" }} />
                    </div>
                    <div className="relative flex-row mt-3 font-mono text text-sm">
                        <a className="link" href={props.signUpLink}>Ilmoittaudu</a>
                    </div>
                </>
            }
        </div>
    )
}

export default EventCard
