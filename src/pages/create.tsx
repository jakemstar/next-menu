import { useSession } from "next-auth/react";
import { useState } from "react";
import { List, arrayMove, arrayRemove } from 'react-movable';
import { z } from "zod";
import { api } from "~/utils/api";
import { classNames } from "~/utils/utility";

export const recipeInputSchema = z.object({
    authorId: z.string(),
    createdAt: z.date(),
    desc: z.string().nonempty({message: "please enter a description"}),
    imageUrl: z.string().nonempty({message: "please enter a description"}),
    ingredients: z.array(z.object({name: z.string(), amount: z.string()})).nonempty({message: "please enter ingredients"}),
    published: z.boolean(),
    steps: z.array(z.string()).nonempty({message: "please enter steps"}),
    title: z.string().nonempty({message: "please enter a title"}),
    updatedAt: z.date()
})

export default function Catalogue() {
    const { mutate } = api.recipes.create.useMutation()
    const { data } = useSession();
    const [step, setStep] = useState('');
    const [ingredient, setIngredient] = useState({name: '', amount: '', amountTag: 'lb'});

    // Form inputs
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl , setImageUrl] = useState('');
    const [ingredients, setIngredients] = useState([{name: 'Ingredient1', amount: 'Measurement1', amountTag: 'amt'}]);
    const [steps, setSteps] = useState(['Step 1']);

    // Form validations
    const [titleValid, setTitleValid] = useState(true);
    const [descriptionValid, setDescriptionValid] = useState(true);
    const [imageUrlValid, setImageUrlValid] = useState(true);
    const [ingredientsValid, setIngredientsValid] = useState(true);
    const [stepsValid, setStepsValid] = useState(true);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const now = new Date();

        if (data) {
            const formRecipe = {
                authorId: data.user.id,
                createdAt: now,
                desc: description,
                imageUrl: imageUrl,
                ingredients: ingredients,
                published: true,
                steps: steps,
                title: title,
                updatedAt: now
            }
            //console.log(formRecipe)

            const recipeInput = recipeInputSchema.safeParse(formRecipe)
            if (!recipeInput.success) {
                console.log(recipeInput.error.flatten())
            } else {
                console.log(recipeInput.data)
                mutate(recipeInput.data)
            }
            

            
        } else {
            console.log('user data null somehow lol');
        }
    }
   
    return (
        <>
            <div className="flex justify-center mt-4">
                <h1 className="text-4xl">Create a new recipe</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="relative z-0 w-full mb-6 group">
                    <input onChange={(e) => setTitle(e.target.value)} type="text" name="title" id="title" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-700 appearance-none dark:border-slate-400 dark:focus:border-slate-50 focus:outline-none focus:ring-0 focus:border-indigo-300 peer" placeholder=" "  />
                    <label htmlFor="title" className="peer-focus:font-medium absolute text-sm text-slate-700 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-300 peer-focus:dark:text-slate-50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input onChange={(e) => setDescription(e.target.value)} type="text" name="description" id="description" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-700 appearance-none dark:border-slate-400 dark:focus:border-slate-50 focus:outline-none focus:ring-0 focus:border-indigo-300 peer" placeholder=" "  />
                    <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-slate-700 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-300 peer-focus:dark:text-slate-50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input onChange={(e) => setImageUrl(e.target.value)} name="imageUrl" id="imageUrl" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-700 appearance-none dark:border-slate-400 dark:focus:border-slate-50 focus:outline-none focus:ring-0 focus:border-indigo-300 peer" placeholder=" "  />
                    <label htmlFor="imageUrl" className="peer-focus:font-medium absolute text-sm text-slate-700 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-300 peer-focus:dark:text-slate-50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Image URL</label>
                </div>  
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <div className="flex sm:flex-row flex-col items-center justify-between mb-3">
                            <p className="text-xl">Ingredients</p>
                            <div className="flex">
                                <div className="relative z-0 w-full group">
                                    <input onChange={(e) => setIngredient({name: e.target.value, amount: ingredient.amount, amountTag: ingredient.amountTag})} value={ingredient.name} type="text" name="ingredient" id="ingredient" className="block py-2.5 px-0 w-11/12 text-sm bg-transparent border-0 border-b-2 border-slate-700 appearance-none dark:border-slate-400 dark:focus:border-slate-50 focus:outline-none focus:ring-0 focus:border-indigo-300 peer" placeholder=" "  />
                                    <label htmlFor="ingredient" className="peer-focus:font-medium absolute text-sm text-slate-700 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-300 peer-focus:dark:text-slate-50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ingredient</label>
                                </div>
                                <div className="relative z-0 w-full group">
                                    <input onChange={(e) => setIngredient({name: ingredient.name, amount: e.target.value, amountTag: ingredient.amountTag})} value={ingredient.amount} type="text" name="ingredient" id="ingredient" className="block py-2.5 px-0 w-11/12 text-sm bg-transparent border-0 border-b-2 border-slate-700 appearance-none dark:border-slate-400 dark:focus:border-slate-50 focus:outline-none focus:ring-0 focus:border-indigo-300 peer" placeholder=" "  />
                                    <label htmlFor="ingredient" className="peer-focus:font-medium absolute text-sm text-slate-700 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-300 peer-focus:dark:text-slate-50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Amount</label>
                                </div>
                                <select onChange={(e) => setIngredient({name: ingredient.name, amount: ingredient.amount, amountTag: e.target.value})} id="amountTag" className="mr-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded focus:ring-slate-50 focus:border-slate-50 block p-2.5 dark:bg-slate-600 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-slate-50 dark:focus:border-slate-50">
                                    <option value="lb">lb</option>
                                    <option value="kg">kg</option>
                                    <option value="cup(s)">cup(s)</option>
                                    <option value="tbsp">tbsp</option>
                                    <option value="tsp">tsp</option>
                                    <option value="oz">oz</option>
                                    <option value="g">g</option>
                                    <option value="floz">floz</option>
                                </select>
                                <button type="button" onClick={() => {setIngredients([...ingredients, ingredient]);setIngredient({name: '', amount: '', amountTag: ingredient.amountTag})}} className="active:translate-y-0.5 p-1 rounded bg-slate-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 p-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <List
                            values={ingredients}
                            onChange={({ oldIndex, newIndex }) =>
                                setIngredients(arrayMove(ingredients, oldIndex, newIndex))
                            }
                            renderList={({ children, props }) => <ul className="space-y-2" {...props}>{children}</ul>}
                            renderItem={({ value, props, index, isDragged, isSelected }) => 
                            <li className={classNames(isDragged || isSelected ? "bg-slate-400" : "bg-slate-600", " decoration-transparent list-none py-3 px-3 rounded flex justify-between")} {...props}>
                            {value.name}{' '}
                            {value.amount}
                            {value.amountTag}
                                <button type="button" className="active:translate-y-0.5" onClick={() => {setIngredients(typeof index !== 'undefined' ? arrayRemove(ingredients, index) : ingredients)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </li>
                        }/>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                    <div className="flex items-center justify-between mb-3">
                            <p className="text-xl">Steps</p>
                            <div className="flex">
                                <div className="relative z-0 w-full group">
                                    <input onChange={(e) => setStep(e.target.value)} value={step} type="text" name="ingredient" id="ingredient" className="block py-2.5 px-0 w-11/12 text-sm bg-transparent border-0 border-b-2 border-slate-700 appearance-none dark:border-slate-400 dark:focus:border-slate-50 focus:outline-none focus:ring-0 focus:border-indigo-300 peer" placeholder=" "  />
                                    <label htmlFor="ingredient" className="peer-focus:font-medium absolute text-sm text-slate-700 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-300 peer-focus:dark:text-slate-50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Step</label>
                                </div>
                                <button type="button" onClick={() => {setSteps([...steps, step]);setStep('')}} className="active:translate-y-0.5 p-1 rounded bg-slate-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 p-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <List
                            values={steps}
                            onChange={({ oldIndex, newIndex }) =>
                                setSteps(arrayMove(steps, oldIndex, newIndex))
                            }
                            renderList={({ children, props }) => <ul className="space-y-2" {...props}>{children}</ul>}
                            renderItem={({ value, props, index, isDragged, isSelected }) => 
                            <li className={classNames(isDragged || isSelected ? "bg-slate-400" : "bg-slate-600", " decoration-transparent list-none py-3 px-3 rounded flex justify-between")} {...props}>
                            {value}
                                <button type="button" onClick={() => {setSteps(typeof index !== 'undefined' ? arrayRemove(steps, index) : steps)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </li>
                        }/>
                    </div>
                </div>
                <button type="submit" className="active:translate-y-0.5 text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800">Submit</button>
            </form>
        </>
    )
}
