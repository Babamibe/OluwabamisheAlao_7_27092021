import { search } from "./main.js"; 
import { AdvanceInput } from "./advancedInput.js";

export class Ustensils extends AdvanceInput{

    constructor(){
        super("Ustensile", "ustensil", "bg-danger");
        this.list = search.currentList;
    }

    refreshList = () =>{
        this.list = search.currentList;
        let actualizedList = [];
        for(let i=0; i< this.list.length ;i++){
            this.list[i].ustensils.forEach(ustensil => {
                if(!actualizedList.includes(ustensil.toLowerCase())) actualizedList.push(ustensil.toLowerCase());
            });
        }
        return actualizedList;
    }
}