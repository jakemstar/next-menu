import { type NextPage } from "next";
import Week from "~/components/week";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: recipes } = api.recipes.findMany.useQuery();
 
   
  return (
    <>
      <Week />
      {recipes?.map((recipe) => (<div key={recipe.id}>{recipe.title}{recipe.desc}</div>))}
    </> 
  );
};

export default Home;
