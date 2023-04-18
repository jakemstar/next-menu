import { api } from "~/utils/api";
import { RecipeCard } from "./day/[day]";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Catalogue() {
    const { data: recipes, isLoading: recipesLoading } = api.recipes.getAll.useQuery();
    const router = useRouter();
    const { data, status } = useSession();

    if (recipesLoading) return <>recipes loading</>
    if (recipes)
    return (
        <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 pt-6">
                {recipes.map((recipe, idx) =>
                    (<RecipeCard key={recipe.title} recipe={recipe} router={router} userData={data} useButton={false} />)
                )}
            </div>
        </>
    )
}