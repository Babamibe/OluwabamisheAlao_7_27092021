import { RecipeCards } from "./recipeCards.js";
import { InputTags } from "./inputTags.js";

export class SearchRecipe{

    constructor(){
        this.searchInput = document.querySelector(".search-input");
        this.recipeList = RecipeCards.recipesArray;
        this.tags = [];
        this.searchInput.addEventListener("input", e => {
            this.findRecipe(e.target.value);
        });
    }

    get currentList() {
        return this.recipeList.slice();
    }

    set currentList(recipeList) {
        this.recipeList = recipeList.slice();
    }

    findRecipe = (input) => {
        if(input.length >= 3){
            this.filterRecipes();
            let recipeList = [...this.recipeList];
            this.recipeList = [];
            RecipeCards.eraseSearch();
            for(const recipe of recipeList){
                if(recipe.name.toLowerCase().includes(input.toLowerCase()) || recipe.description.toLowerCase().includes(input.toLowerCase())){
                    this.recipeList.push(recipe);
                    RecipeCards.showSearchedRecipes(recipe);
                }else{
                    for(const ingredient of recipe.ingredients){
                        if(ingredient.ingredient.toLowerCase().replace(/ /g,'').includes(input.toLowerCase().replace(/ /g,'')) && !this.recipeList.includes(recipe)){
                            this.recipeList.push(recipe);
                            RecipeCards.showSearchedRecipes(recipe);
                        }
                    }
                }
            }
        }else{
            this.filterRecipes();
        }
        if(this.recipeList.length === 0){
            RecipeCards.nothingFound();
        }
        if(input.length == 0) {
                RecipeCards.eraseSearch();
                RecipeCards.showRecipeCards()
            
        }
    }

    filterRecipes(){
        this.recipeList = RecipeCards.recipesArray;
        if(this.tags.length != 0){
            for( const tag of this.tags){
                let recipesArray = [...this.recipeList];
                this.recipeList = [];                
                for(const recipe of recipesArray){
                    if(tag.category == "ingredient"){
                        recipe.ingredients.forEach(element => {
                            if(element.ingredient.toLowerCase() == tag.name){
                                this.recipeList.push(recipe);
                            }                            
                        });
                    }else if(tag.category == "appliance"){
                        if(recipe.appliance.toLowerCase() == tag.name){
                            this.recipeList.push(recipe);
                        }
                    }else if(tag.category == "ustentils"){
                        if(recipe.ustentils.toLowerCase() == tag.name){
                            this.recipeList.push(recipe);
                        }
                    }
                    
                }
                recipesArray = [...this.recipeList];
            }
        } 
        RecipeCards.eraseSearch();
        //RecipeCards.showSearchedRecipes(this.recipeList);
    }
    createTag(category, name){
        new InputTags(name, category);
        this.tags.push({name, category});
        console.log("searchinput", name)
        this.findRecipe(name, category);
    }
    removeTag(category, name){
        for(let i = this.tags.length - 1; i >= 0; i--){
            if(this.tags[i].name == name && this.tags[i].category.match(category)){
                this.tags.splice(i,1);
            }
        }
        this.findRecipe(this.searchInput.value);
    }
}
