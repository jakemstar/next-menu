import dayjs from "dayjs"
import Image from "next/image"

const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function Week() {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {daysOfTheWeek.map((day, idx) =>
                (<Day key={day} name={day} col={idx}/>)
            )}           
        </div>
    )
}

type dayProps = {
    name: string,
    col: number
}

function Day(dayProps: dayProps) {
    return (
        <div className={dayjs().day() === dayProps.col ? 
            "w-full bg-slate-700 border border-slate-900 rounded-lg shadow dark:bg-slate-200 dark:border-slate-200 text-slate-900 dark:text-slate-50" : 
            "w-full bg-slate-50 border border-slate-200 rounded-lg shadow dark:bg-slate-700 dark:border-slate-700"
        }>
            <a href="#">
                <img className="rounded-t-lg" src="" alt="" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className={dayjs().day() === dayProps.col ? "mb-2 text-2xl font-bold tracking-tight dark:text-slate-900 text-slate-50" : 
                    "mb-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
                    }>{dayProps.name}</h5>
                </a>
                <p className={dayjs().day() === dayProps.col ? 
                    "mb-3 font-normal text-slate-50 dark:text-slate-800" : 
                    "mb-3 font-normal text-slate-700 dark:text-slate-50"
                }>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <a href="#" className={dayjs().day() === dayProps.col ? 
                "inline-flex items-center px-3 py-2 text-sm font-medium text-center text-slate-50 bg-slate-900 hover:bg-slate-950 focus:ring-4 focus:outline-none focus:ring-slate-200 rounded-lg dark:focus:ring-slate-500 mr-2 mb-2" : 
                "inline-flex items-center px-3 py-2 text-sm font-medium text-center text-slate-50 bg-slate-900 hover:bg-slate-950 focus:ring-4 focus:outline-none focus:ring-slate-500 rounded-lg dark:focus:ring-slate-200 mr-2 mb-2"}>
                    Edit
                    <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </a>
            </div>
        </div>
    )
}