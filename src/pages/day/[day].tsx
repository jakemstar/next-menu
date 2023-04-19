import { type Recipe } from "@prisma/client";
import dayjs from "dayjs";
import { type Session } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { type NextRouter, useRouter } from 'next/router';
import { api } from "~/utils/api";
import { classNames, daysOfTheWeek } from "~/utils/utility";

export default function Day() {
    const router = useRouter();
    const { data: recipes, isLoading: recipesLoading } = api.recipes.getAll.useQuery();
    const { data } = useSession();
    const day = router.asPath.split("/").at(-1);
    
    if (recipesLoading) return <>recipes loading</>
    if (!recipes) return <>No recipes found</>

    return (
        <>
            <h1 className="pt-4 text-4xl font-bold text-center text-slate-50">Pick a recipe for {day}</h1>
            <div className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-2 lg:grid-cols-4 text-slate-50">
                {recipes.map((recipe) => {
                    return (
                        <RecipeCard key={recipe.id} recipe={recipe} userData={data} router={router} day={day} useButton={true} />
                    )
                })}
            </div>
        </>
    )
}

type RecipeCardProps = {
    router: NextRouter
    recipe: Recipe
    userData: Session | null
    day? : string
    useButton: boolean
    href?: string
}

export function RecipeCard(props: RecipeCardProps) {
    const thisDaysDate = dayjs(dayjs().subtract(dayjs().day(), 'day').add(daysOfTheWeek.indexOf(props.day || "error"), 'day')).format('YYYY/MM/DD');
    const { mutate } = api.users.createEvent.useMutation({
        onSuccess: () => {
            props.router.back();
        }
    });

    return (
        <div className={classNames("bg-slate-50 border-slate-200 dark:bg-slate-700 dark:border-slate-700 border w-full rounded-lg shadow flex flex-col justify-between")}>
            <div>
                <h4 className={"font-bold text-3xl text-center pt-2"}>{props.recipe.title}</h4>
                <Image className="m-auto mt-4 rounded-lg" src={props.recipe.imageUrl || `/utensilplate.png`} alt="" height={150} width={150} />
            </div>
            <div className="flex flex-col px-5 pt-4">
                <p className={"text-slate-700 dark:text-slate-50 mb-3 font-normal text-center"}>{props.recipe.desc}</p>
                <div className="flex justify-center align-middle">
                    {props.useButton ?
                    <button onClick={() => {mutate({recipeId: props.recipe.id, userId: props.userData?.user.id || "", date: thisDaysDate})}} className={"active:translate-y-0.5 focus:ring-slate-500 rounded-lg dark:focus:ring-slate-200 mr-2 mb-2 inline-flex items-center px-5 py-2 text-sm font-medium text-center text-slate-50 bg-slate-900 hover:bg-slate-950 focus:ring-4 focus:outline-none"}>
                        Select
                        <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414   0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button> : <Link href={`recipe/${props.recipe.id}`} className={"focus:ring-slate-500 rounded-lg dark:focus:ring-slate-200 mr-2 mb-2 inline-flex items-center px-5 py-2 text-sm font-medium text-center text-slate-50 bg-slate-900 hover:bg-slate-950 focus:ring-4 focus:outline-none"}>
                        View recipe
                        <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414   0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </Link>
                    }
                </div>
            </div>
        </div>
    )
}