/* eslint-disable @typescript-eslint/no-misused-promises */
import { useSession } from "next-auth/react";
import { useState } from "react";
import { List, arrayMove, arrayRemove } from 'react-movable';
import { z } from "zod";
import { api } from "~/utils/api";
import { classNames } from "~/utils/utility";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

const recipeFormSchema = z.object({
    title: z.string().nonempty("Enter a title"),
    desc: z.string().nonempty("Enter a description"),
    imageUrl: z.string().nonempty("Enter an image URL")
});

const ingredientFormSchema = z.object({
    ingredient: z.string().nonempty("Enter an ingredient"),
    amount: z.string().nonempty("Enter an amount").regex(new RegExp('^[0-9]+$'), 'Amount must be a number')
});

const stepFormSchema = z.object({
    step: z.string().nonempty("Enter a step")
});

const recipeNonFormSchema = z.object({
    authorId: z.string(),
    createdAt: z.date(),
    published: z.boolean(),
    updatedAt: z.date(),
    steps: z.array(z.string()),
    ingredients: z.array(z.object({name: z.string(), amount: z.string()})),
});

export const recipeSchema = recipeNonFormSchema.merge(recipeFormSchema)

type RecipeFormType = z.infer<typeof recipeFormSchema>
type IngredientFormType = z.infer<typeof ingredientFormSchema>
type StepFormType = z.infer<typeof stepFormSchema>

export default function Create() {
    const { mutate } = api.recipes.create.useMutation({
        onSuccess: () => {
            toast.success("Recipe created", {duration: 4000, iconTheme: {primary: '#1e293b', secondary: '#f8fafc'}})
            setTitle('');
            setDescription('');
            setImageUrl('');
            setIngredient({name: '', amount: '', amountTag: ''})
            setStep('');
            setIngredients([{name: '', amount: '', amountTag: ''}])
            setSteps([''])
        }
    })
    const { data } = useSession();
    const [step, setStep] = useState('');
    const [ingredient, setIngredient] = useState({name: '', amount: '', amountTag: ''});

    // Form values
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl , setImageUrl] = useState('');
    const [ingredients, setIngredients] = useState([{name: '', amount: '', amountTag: ''}]);
    const [steps, setSteps] = useState(['']);

    //Form state
    const {
        register: recipeRegister,
        handleSubmit: handleRecipeSubmit,
        formState: { errors: recipeErrors },
      } = useForm<RecipeFormType>({
        resolver: zodResolver(recipeFormSchema),
    });

    const {
        register: ingredientRegister,
        handleSubmit: handleIngredientSubmit,
        formState: { errors: ingredientErrors },
      } = useForm<IngredientFormType>({
        resolver: zodResolver(ingredientFormSchema),
    });

    const {
        register: stepRegister,
        handleSubmit: handleStepsSubmit,
        formState: { errors: stepErrors },
      } = useForm<StepFormType>({
        resolver: zodResolver(stepFormSchema),
    });

    // Handlers
    const recipeOnSubmit: SubmitHandler<RecipeFormType> = () => {
        if (!data) {console.log("User data missing somehow"); return}
        if (!ingredients[0]?.name && !steps[0]) {
            toast.error('Add some ingredients', {iconTheme: {primary: '#1e293b', secondary: '#f8fafc'}});
            toast.error('Add some steps', {iconTheme: {primary: '#1e293b', secondary: '#f8fafc'}});
            return
        }
        if (!ingredients[0]?.name){toast.error('Add some ingredients', {iconTheme: {primary: '#1e293b', secondary: '#f8fafc'}}); return}
        if (!steps[0]) {toast.error('Add some steps', {iconTheme: {primary: '#1e293b', secondary: '#f8fafc'}}); return}
        
        const now = new Date();
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

        mutate(formRecipe)
    };

    const ingredientOnSubmit: SubmitHandler<IngredientFormType> = () => {
        if (!ingredients[0]?.name) {setIngredients([ingredient]); setIngredient({name: '', amount: '', amountTag: ''}); return;}
        setIngredients([...ingredients, ingredient]);
        setIngredient({name: '', amount: '', amountTag: ''})
    };
    
    const stepOnSubmit: SubmitHandler<StepFormType> = () => {
        if (!steps[0]) {setSteps([step]); setStep(''); return}
        setSteps([...steps, step]);
        setStep('');
    };
    
    return (
        <>
            <div className="flex justify-center mt-4">
                <h1 className="text-4xl">Create a new recipe</h1>
            </div>
            <form onSubmit={handleRecipeSubmit(recipeOnSubmit)}>
                <div className="relative z-0 w-full mb-6 group">
                    <input {...recipeRegister('title')} value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" id="title" className={classNames(recipeErrors.title?.message ? "border-red-600 focus:border-red-800 dark:border-red-400 dark:focus:border-red-300" : "border-slate-700 dark:border-slate-400 focus:border-indigo-800 dark:focus:border-slate-50", "block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer")} placeholder=" "  />
                    <label htmlFor="title" className={classNames(recipeErrors.title?.message ? "text-red-600 peer-focus:text-red-800 dark:text-red-400 dark:peer-focus:text-red-300" : "text-slate-700 dark:text-slate-400 peer-focus:text-indigo-800 peer-focus:dark:text-slate-50", "peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6")}>{recipeErrors.title?.message ? `${recipeErrors.title?.message}` : "Title"}</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input {...recipeRegister('desc')} value={description} onChange={(e) => setDescription(e.target.value)} type="text" name="desc" id="desc" className={classNames(recipeErrors.desc?.message ? "border-red-600 focus:border-red-800 dark:border-red-400 dark:focus:border-red-300" : "border-slate-700 dark:border-slate-400 focus:border-indigo-800 dark:focus:border-slate-50", "block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer")} placeholder=" "  />
                    <label htmlFor="description" className={classNames(recipeErrors.desc?.message ? "text-red-600 peer-focus:text-red-800 dark:text-red-400 dark:peer-focus:text-red-300" : "text-slate-700 dark:text-slate-400 peer-focus:text-indigo-800 peer-focus:dark:text-slate-50", "peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6")}>{recipeErrors.desc?.message ? `${recipeErrors.desc?.message}` : "Description"}</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input {...recipeRegister('imageUrl')} value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} name="imageUrl" id="imageUrl" className={classNames(recipeErrors.imageUrl?.message ? "border-red-600 focus:border-red-800 dark:border-red-400 dark:focus:border-red-300" : "border-slate-700 dark:border-slate-400 focus:border-indigo-800 dark:focus:border-slate-50", "block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer")} placeholder=" "  />
                    <label htmlFor="imageUrl" className={classNames(recipeErrors.imageUrl?.message ? "text-red-600 peer-focus:text-red-800 dark:text-red-400 dark:peer-focus:text-red-300" : "text-slate-700 dark:text-slate-400 peer-focus:text-indigo-800 peer-focus:dark:text-slate-50", "peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6")}>{recipeErrors.imageUrl?.message ? `${recipeErrors.imageUrl?.message}` : "Image URL"}</label>
                </div>  
                <div className="grid lg:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <div className="flex flex-col items-center justify-between mb-3 sm:flex-row">
                            <p className="text-xl">Ingredients</p>
                            <div className="flex">
                                <div className="relative z-0 w-full group">
                                    <input {...ingredientRegister('ingredient')} onChange={(e) => setIngredient({name: e.target.value, amount: ingredient.amount, amountTag: ingredient.amountTag})} value={ingredient.name} type="text" name="ingredient" id="ingredient" className={classNames(ingredientErrors.ingredient?.message ? "border-red-600 focus:border-red-800 dark:border-red-400 dark:focus:border-red-300" : "border-slate-700 dark:border-slate-400 focus:border-indigo-800 dark:focus:border-slate-50", "peer block py-2.5 px-0 w-11/12 text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0")} placeholder=" "  />
                                    <label htmlFor="ingredient" className={classNames(ingredientErrors.ingredient?.message ? "text-red-600 peer-focus:text-red-800 dark:text-red-400 dark:peer-focus:text-red-300" : "text-slate-700 dark:text-slate-400 peer-focus:text-indigo-800 peer-focus:dark:text-slate-50","peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6")}>{ingredientErrors.ingredient?.message ? `${ingredientErrors.ingredient?.message}` : "Ingredient"}</label>
                                </div>
                                <div className="relative z-0 w-full group">
                                    <input {...ingredientRegister('amount')} onChange={(e) => setIngredient({name: ingredient.name, amount: e.target.value, amountTag: ingredient.amountTag})} value={ingredient.amount} type="text" name="amount" id="amount" className={classNames(ingredientErrors.ingredient?.message ? "border-red-600 focus:border-red-800 dark:border-red-400 dark:focus:border-red-300" : "border-slate-700 dark:border-slate-400 focus:border-indigo-800 dark:focus:border-slate-50", "peer block py-2.5 px-0 w-11/12 text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0")} placeholder=" "  />
                                    <label htmlFor="amount" className={classNames(ingredientErrors.ingredient?.message ? "text-red-600 peer-focus:text-red-800 dark:text-red-400 dark:peer-focus:text-red-300" : "text-slate-700 dark:text-slate-400 peer-focus:text-indigo-800 peer-focus:dark:text-slate-50","peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6")}>{ingredientErrors.amount?.message ? `${ingredientErrors.amount?.message}` : "Amount"}</label>
                                </div>
                                <select value={ingredient.amountTag} onChange={(e) => setIngredient({name: ingredient.name, amount: ingredient.amount, amountTag: e.target.value})} id="amountTag" className="mr-2.5 bg-indigo-200   border border-slate-300 text-slate-900 text-sm rounded focus:ring-slate-50 focus:border-slate-50 block p-2.5 dark:bg-slate-600 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-slate-50 dark:focus:border-slate-50">
                                    <option value="">blank</option>
                                    <option value="lb">lb</option>S
                                    <option value="cup(s)">cup(s)</option>
                                    <option value="tbsp">tbsp</option>
                                    <option value="tsp">tsp</option>
                                </select>
                                <button type="button" onClick={handleIngredientSubmit(ingredientOnSubmit)} className="active:translate-y-0.5 p-1 rounded bg-indigo-200 dark:bg-slate-600">
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
                            <li className={classNames(isDragged || isSelected ? "bg-indigo-300 dark:bg-slate-400" : "bg-indigo-200 dark:bg-slate-600", " decoration-transparent list-none py-3 px-3 rounded flex justify-between")} {...props}>
                            {typeof index !== 'undefined' ? `${index+1}. ` : ''}
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
                                    <input {...stepRegister('step')} onChange={(e) => setStep(e.target.value)} value={step} type="text" name="step" id="step" className={classNames(stepErrors.step?.message ? "border-red-600 focus:border-red-800 dark:border-red-400 dark:focus:border-red-300" : "border-slate-700 dark:border-slate-400 focus:border-indigo-800 dark:focus:border-slate-50", "block py-2.5 px-0 w-11/12 text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer")} placeholder=" "  />
                                    <label htmlFor="step" className={classNames(stepErrors.step?.message ? "text-red-600 peer-focus:text-red-800 dark:text-red-400 dark:peer-focus:text-red-300" : "text-slate-700 dark:text-slate-400 peer-focus:text-indigo-800 peer-focus:dark:text-slate-50", "peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6")}>{stepErrors.step?.message ? `${stepErrors.step?.message}` : "Step"}</label>
                                </div>
                                <button type="button" onClick={handleStepsSubmit(stepOnSubmit)} className="active:translate-y-0.5 p-1 rounded bg-indigo-200 dark:bg-slate-600">
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
                            <li className={classNames(isDragged || isSelected ? "bg-indigo-300 dark:bg-slate-400" : "bg-indigo-200 dark:bg-slate-600", " decoration-transparent list-none py-3 px-3 rounded flex justify-between")} {...props}>
                            {typeof index !== 'undefined' ? `${index+1}. ` : ''}
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
                <button type="submit" className="active:translate-y-0.5 text-white bg-slate-900 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800">Submit</button>
            </form>
        </>
    )
}
