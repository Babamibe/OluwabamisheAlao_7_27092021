import { search } from "./main.js"; 
import { AdvanceInput } from "./advancedInput.js";

export class Appliances extends AdvanceInput{

    constructor(){
        super("Appareil", "appliance", "bg-success");
        this.list = search.currentList;
    }

    refreshList = () =>{
        this.list = search.currentList;
        let actualizedList = [];
        for(let i=0; i< this.list.length ;i++){
            if(!actualizedList.includes(this.list[i].appliance.toLowerCase())) actualizedList.push(this.list[i].appliance.toLowerCase());
        }
        return actualizedList;
    }
}