import {useEffect, useState} from "react";
import {Ingradient} from "@prisma/client";
import {Api} from "@/shared/services/api-client";

export const useIngredients = () => {
    const [ingredients, setIngredients] = useState<Ingradient[]>([]);
    const [loading,setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetchIngredients(){
            try {
                setLoading(true);
                const ingredients: Ingradient[] = await Api.ingredients.getAll()
                setIngredients(ingredients);
            } catch (e) {
                console.log(e);
            }
            finally {
                setLoading(false);
            }
        }
        fetchIngredients();
    }, []);
    return {ingredients,loading}
}