import { search } from "./main.js";
import { AdvanceInput } from "./advancedInput.js";

export class Ingredients extends AdvanceInput{

    constructor(){
        super("Ingrédient", "ingredient", "bg-primary");
        this.list = search.currentList;
    }

    refreshList = () =>{
        this.list = search.currentList;
        let actualizedList = [];
        for(let i=0; i< this.list.length ;i++){
            this.list[i].ingredients.forEach(ingredient => {
                if(!actualizedList.includes(ingredient.ingredient.toLowerCase())) actualizedList.push(ingredient.ingredient.toLowerCase());
            });
        }
        return actualizedList;
    }
}