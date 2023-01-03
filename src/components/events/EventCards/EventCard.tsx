import classNames from "classnames"

type Props = {
  title: string
  description?: string
  date: string
  location: string
  numberOfAttendees?: number
  maxCapacity?: number
  signUpLink: string
  className?: string
}

const days = ["su", "ma", "ti", "ke", "to", "pe", "la"]

const formatDateString = (t: Date): string => {
  const date = `0${t.getDate()}`.slice(-2)
  const month = `0${t.getMonth() + 1}`.slice(-2)
  const year = t.getFullYear()
  const hours = `0${t.getHours()}`.slice(-2)
  const minutes = `0${t.getMinutes()}`.slice(-2)
  const day = days[t.getDay()] // I guess the best way would to format date in strapi?
  return `${day} ${date}-${month}-${year}, klo ${hours}:${minutes}`
}

const EventCard: React.FC<Props> = (props: Props) => {
  const {
    className,
    title,
    numberOfAttendees,
    date: dateString,
    location,
    signUpLink,
    description,
    maxCapacity,
  } = props
  const date = new Date(dateString)
  return (
    <div
      className={classNames(
        className,
        "font-mono text-xl rounded-xl shadow-md bg-gray-darkest text-white p-4"
      )}
    >
      <div className="flex justify-between">
        <div className="flex-column">
          <p className="font-mono">
            {title} @ {location}
          </p>
          <p className="font-mono text-sm">{formatDateString(date)}</p>
        </div>
        {description && (
          <div className="flex-column justify-end py-1 px-3 rounded-2xl my-auto h-fit flex-shrink bg-white text-black font-mono text-sm font-bold">
            {numberOfAttendees}/{maxCapacity}
          </div>
        )}
        {!description && (
          <div className="flex-column justify-end my-auto font-mono text-sm font-bold">
            <a href={signUpLink}>Lue lisää</a>
          </div>
        )}
      </div>
      {description && (
        <>
          <div className="relative mt-3 text-sm font-sans">
            {description}
            <div
              className="absolute top-0 left-[-5px] h-[calc(100%+10px)] w-[calc(100%+10px)]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(2,0,36,0) 20%, rgba(33,39,48,1) 79%)",
              }}
            />
          </div>
          <div className="relative mt-3 font-mono text text-sm">
            <a href={signUpLink}>Ilmoittaudu</a>
          </div>
        </>
      )}
    </div>
  )
}

export default EventCard
