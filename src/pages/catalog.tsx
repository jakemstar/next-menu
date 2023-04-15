import { RecipeCard } from "~/components/week";
import { api } from "~/utils/api";

export default function Catalogue() {
    const { data: recipes, isLoading: recipesLoading } = api.recipes.getAll.useQuery();

    if (recipesLoading) return <>recipes loading</>
    if (recipes)
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 pt-6">
            {recipes.map((recipe, idx) =>
                (<RecipeCard key={recipe.title} href={""} title={recipe.title} description={recipe.desc} picture={recipe.imageUrl || ''} buttonText="Edit?" />)
            )}
        </div>
    )
}