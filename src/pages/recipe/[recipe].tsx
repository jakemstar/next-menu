import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function Recipe() {
    const router = useRouter();
    const recipeId = router.asPath.split("/").at(-1)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { data: recipe, isLoading: recipesLoading } = api.recipes.getById.useQuery({recipeId: recipeId!});

    return (
        <>
            <div>
                <p>{recipe?.desc}</p>
            </div>
        </>
    )
}