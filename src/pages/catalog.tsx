import { api } from "~/utils/api";
import { RecipeCard } from "./day/[day]";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Loading from "~/components/loading";

export default function Catalogue() {
    const { data: recipes, isLoading: recipesLoading } = api.recipes.getAll.useQuery();
    const router = useRouter();
    const { data } = useSession();

    if (recipesLoading) return <Loading />
    return (
        <>
            <div className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-2 lg:grid-cols-4">
                {recipes?.map((recipe) =>
                    (<RecipeCard key={recipe.title} recipe={recipe} router={router} userData={data} useButton={false} />)
                )}
            </div>
        </>
    )
}