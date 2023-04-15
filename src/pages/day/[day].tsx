import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from 'next/router';
import { api } from "~/utils/api";
import { classNames, daysOfTheWeek } from "~/utils/utility";

export default function Day() {
    const { data: recipes, isLoading: recipesLoading } = api.recipes.getAll.useQuery();
    const ctx = api.useContext();
    const {mutate, isLoading} = api.users.createEvent.useMutation({
        onSuccess: async () => {
            await ctx.users.invalidate();
            router.back();
        }
    });
    const { data, status } = useSession();
    const router = useRouter();
    const day = router.asPath.split("/").at(-1);
    const thisDaysDate = dayjs(dayjs().subtract(dayjs().day(), 'day').add(daysOfTheWeek.indexOf(day || "error"), 'day')).format('YYYY/MM/DD');

    if (recipesLoading) return <>recipes loading</>
    if (!recipes) return <>No recipes found</>

    return (
        recipes.map((recipe) => {
            return (
                <div key={recipe.title}>
                    <h1 className="text-4xl pt-4 text-center font-bold">Pick a recipe for {day}</h1>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 pt-6">
                        <div className={classNames("bg-slate-50 border-slate-200 dark:bg-slate-700 dark:border-slate-700 border w-full rounded-lg shadow flex flex-col justify-between")
                        }>
                            <div>
                                <h4 className={"font-bold text-3xl text-center pt-2"}>{recipe.title}</h4>
                                <a href="#" className="">
                                    <Image className="rounded-lg m-auto mt-4" src={recipe.imageUrl || `/utensilplate.png`} alt="" height={150} width={150} />
                                </a>
                            </div>
                            <div className="px-5 pt-4 flex flex-col">
                                <p className={"text-slate-700 dark:text-slate-50 mb-3 font-normal text-center"}>{recipe.desc}</p>
                                <div className="flex justify-center align-middle">
                                    <button onClick={() => {mutate({recipeId: recipe.id, userId: data?.user.id || "", date: thisDaysDate})}} className={"focus:ring-slate-500 rounded-lg dark:focus:ring-slate-200 mr-2 mb-2 inline-flex items-center px-5 py-2 text-sm font-medium text-center text-slate-50 bg-slate-900 hover:bg-slate-950 focus:ring-4 focus:outline-none"}>
                                        Select
                                        <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414   0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    )
}