import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";
import { classNames, daysOfTheWeek } from "~/utils/utility";

export default function Week() {
    const { data, status } = useSession();
    const { data: user, isLoading: userLoading } = api.users.fromId.useQuery({userId: `${data?.user.id || ''}`});
    const { data: recipes, isLoading: recipesLoading } = api.recipes.getAll.useQuery();
    const events = user ? user?.events : undefined;
    console.log(data)
    const contentDaysOfTheWeek = daysOfTheWeek.map((day, idx) => {
        const fullSlashDate = dayjs(dayjs().subtract(dayjs().day(), 'day').add(idx, 'day')).format('YYYY/MM/DD');
        const mmYYSlateDate = dayjs(fullSlashDate).format('MM/DD')
        if (events) 
        for (const event of events) {
            if (dayjs(event.date).format('YYYY/MM/DD') === fullSlashDate) {
                if (recipes) for (const recipe of recipes) if(recipe.id === event.recipeId) return {name: day, slashDate: mmYYSlateDate, event, recipe}
            }
        }
        return {name: day, slashDate: mmYYSlateDate}
    })

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 pt-6">
            {contentDaysOfTheWeek.map((day, idx) =>
                (<Day key={day.name} href={day.name} isCurrent={idx === dayjs().day()} slashDate={day.slashDate} title={day.recipe?.title || "null"} description={day.recipe?.desc || "No meal set for this day yet."} picture={day.recipe?.imageUrl || "/utensilplate.png"} buttonText={day.recipe ? "Edit" : "Select"} />)
            )}
        </div>
    )
}

export type dayProps = {
    href: string,
    isCurrent: boolean
    slashDate: string
    title: string
    description: string
    picture: string
    buttonText: string
}

export function Day(dayProps: dayProps) {
    return (
        <div className={classNames(dayProps.isCurrent ? 
            "bg-slate-700 border-slate-900 dark:bg-slate-200 dark:border-slate-200 text-slate-900 dark:text-slate-50" : 
            "bg-slate-50 border-slate-200 dark:bg-slate-700 dark:border-slate-700", "border w-full rounded-lg shadow flex flex-col justify-between")
        }>
            <div>
                <h4 className={dayProps.isCurrent ? "font-bold text-3xl text-center pt-2 text-slate-50 dark:text-slate-900" : "font-bold text-3xl text-center pt-2"}>{dayProps.href}</h4>
                <a href="#" className="">
                    <Image className="rounded-lg m-auto mt-4" src={`${dayProps.picture}`} alt="" height={150} width={150} />
                </a>
            </div>
            <div className="px-5 pt-4 flex flex-col">
                <h5 className={classNames(dayProps.isCurrent ? "dark:text-slate-900 text-slate-50" : 
                "text-slate-900 dark:text-white", "mb-2 text-2xl font-bold tracking-tight")
                }>{dayProps.title}</h5><p className={classNames(dayProps.isCurrent ? 
                    "text-slate-50 dark:text-slate-800" : 
                    "text-slate-700 dark:text-slate-50", "mb-3 font-normal")
                }>{dayProps.description}</p>
                <div className="flex justify-between align-middle">
                    <Link href={`/day/${dayProps.href || ""}`} className={classNames(dayProps.isCurrent ? 
                        "focus:ring-slate-200 rounded-lg dark:focus:ring-slate-500" : 
                        "focus:ring-slate-500 rounded-lg dark:focus:ring-slate-200", "mr-2 mb-2 inline-flex items-center px-5 py-2 text-sm font-medium text-center text-slate-50 bg-slate-900 hover:bg-slate-950 focus:ring-4 focus:outline-none")}>
                        {dayProps.buttonText}
                        <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </Link>
                    <p className={classNames(dayProps.isCurrent ? "text-slate-50 dark:text-slate-900" : "text-slate-900 dark:text-slate-50", "text-right text-bold")}>{dayProps.slashDate}</p>
                </div>
            </div>
        </div>
    )
}