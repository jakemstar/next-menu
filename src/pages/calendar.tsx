import dayjs from "dayjs";

const DAYS_ON_CALENDAR = 42;
const DAYS_BEFORE_FIRST_DAY_OF_MONTH = dayjs().startOf("month").day();
const DAYS_IN_MONTH = dayjs().daysInMonth();
const CURRENT_YEAR = dayjs().year()
const CURRENT_MONTH = dayjs().month()+1
const CURRENT_DAY = dayjs().day()

export default function Calendar() {
    return (
        <>
            <div className="grid grid-cols-7">
                <p>Sunday</p>
                <p>Monday</p>
                <p>Tuesday</p>
                <p>Wednesday</p>
                <p>Thursday</p>
                <p>Friday</p>
                <p>Saturday</p>
                {/*Loop over days before month*/}
                {Array.from(Array(DAYS_BEFORE_FIRST_DAY_OF_MONTH)).map((_i, idx) => {return <p key={idx}>emptybegin</p>})}
                {Array.from(Array(DAYS_IN_MONTH)).map((_i, idx) => {return <p key={idx}>{dayjs(`${CURRENT_YEAR}/${CURRENT_MONTH}/${idx+1}`).format('YYYY/MM/DD')}</p>})}
                {Array.from(Array(DAYS_ON_CALENDAR-(DAYS_BEFORE_FIRST_DAY_OF_MONTH+DAYS_IN_MONTH))).map((_i, idx) => {return <p key={idx}>emptyend</p>})}
            </div>
            <p>{dayjs().daysInMonth()} {dayjs().startOf("month").day() }</p>
        </>
    )
}