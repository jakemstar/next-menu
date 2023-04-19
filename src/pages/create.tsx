import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { List, arrayMove, arrayRemove } from 'react-movable';
import { useState } from "react";
import { classNames } from "~/utils/utility";


export default function Catalogue() {
    const { mutate } = api.recipes.create.useMutation()
    const router = useRouter();
    const { data } = useSession();
    const [ingredients, setIngredients] = useState([{name: 'Ingredient1', amount: 'Measurement1'}]);
    const [steps, setSteps] = useState(['Step 1']);
    const [step, setStep] = useState('');
    const [ingredient, setIngredient] = useState({name: '', amount: ''});

    return (
        <>
            <div className="flex justify-center mt-4">
                <h1 className="text-4xl">Create a new recipe</h1>
            </div>
            <form>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="floating_title" id="floating_title" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-700 appearance-none dark:border-slate-400 dark:focus:border-slate-50 focus:outline-none focus:ring-0 focus:border-indigo-300 peer" placeholder=" " required />
                    <label htmlFor="floating_title" className="peer-focus:font-medium absolute text-sm text-slate-700 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-300 peer-focus:dark:text-slate-50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="floating_description" id="floating_description" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-700 appearance-none dark:border-slate-400 dark:focus:border-slate-50 focus:outline-none focus:ring-0 focus:border-indigo-300 peer" placeholder=" " required />
                    <label htmlFor="floating_description" className="peer-focus:font-medium absolute text-sm text-slate-700 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-300 peer-focus:dark:text-slate-50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input name="imageUrl" id="floating_imageUrl" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-slate-700 appearance-none dark:border-slate-400 dark:focus:border-slate-50 focus:outline-none focus:ring-0 focus:border-indigo-300 peer" placeholder=" " required />
                    <label htmlFor="floating_imageUrl" className="peer-focus:font-medium absolute text-sm text-slate-700 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-300 peer-focus:dark:text-slate-50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Image URL</label>
                </div>  
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-xl">Ingredients</p>
                            <div className="flex">
                                <div className="relative z-0 w-full group">
                                    <input onChange={(e) => setIngredient({name: e.target.value, amount: ingredient.amount})} value={ingredient.name} type="text" name="floating_ingredient" id="floating_ingredient" className="block py-2.5 px-0 w-11/12 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label htmlFor="floating_ingredient" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ingredient</label>
                                </div>
                                <div className="relative z-0 w-full group">
                                    <input onChange={(e) => setIngredient({name: ingredient.name, amount: e.target.value})} value={ingredient.amount} type="text" name="floating_ingredient" id="floating_ingredient" className="block py-2.5 px-0 w-11/12 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label htmlFor="floating_ingredient" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Amount</label>
                                </div>
                                <button type="button" onClick={() => {setIngredients([...ingredients, ingredient]);setIngredient({name: '', amount: ''})}} className="active:translate-y-0.5 p-1 rounded bg-slate-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8 p-1">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
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
                                    <input onChange={(e) => setStep(e.target.value)} value={step} type="text" name="floating_ingredient" id="floating_ingredient" className="block py-2.5 px-0 w-11/12 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label htmlFor="floating_ingredient" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Step</label>
                                </div>
                                <button type="button" onClick={() => {setSteps([...steps, step]);setStep('')}} className="active:translate-y-0.5 p-1 rounded bg-slate-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8 p-1">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
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
                <button type="submit" className="active:translate-y-0.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
            <button onClick={() => {mutate}}></button>
        </>
    )
}