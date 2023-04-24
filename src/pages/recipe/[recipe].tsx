import { useRouter } from "next/router";
import Image  from "next/image";
import Loading from "~/components/loading";
import { api } from "~/utils/api";

export default function Recipe() {
    const router = useRouter();
    const recipeId = router.asPath.split("/").at(-1)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { data: recipe, isLoading: recipesLoading } = api.recipes.getById.useQuery({recipeId: recipeId!});

    if (recipesLoading)
    return <Loading />

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full mx-auto mt-3 bg-indigo-200 rounded md:w-9/12 dark:bg-slate-500">
                <h1 className="mb-1 text-4xl">{recipe?.title}</h1>
                <Image className="object-fill w-full h-48 bg-indigo-200 border-4 border-indigo-200 rounded-lg border-3 dark:border-slate-500" src={recipe?.imageUrl || ""} alt={""} height={50} width={300}></Image>
                <p>{recipe?.desc}</p>
            </div>
        </>
    )
}