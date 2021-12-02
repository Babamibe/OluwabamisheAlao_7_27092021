
import { RecipeCards } from "./recipeCards.js";
import { search } from "./main.js";

export class InputTags{

    constructor(tag, category){
        this.tag = tag;
        this.category = category;
        this.tagContainer = document.getElementById('tags');
        this.createTag();
    }

    get tagInput(){
        return this.tag;
    }

    createTag = () => {
        const tagButton = document.createElement('span');
        tagButton.classList.add("tag", "rounded", "text-white");
        if(this.category === "ingredient"){
            tagButton.classList.add("bg-primary")
        }else if(this.category === "appliance"){
            tagButton.classList.add("bg-success")
        }else if(this.category === "ustensil"){
            tagButton.classList.add("bg-danger")
        };
        tagButton.innerHTML = `
        <span>${this.tag}</span><i class="far fa-times-circle"></i>
        `;
        this.tagContainer.appendChild(tagButton);
        tagButton.addEventListener("click", e => {
            this.removeTag(tagButton);
        });
    }

    removeTag(tag){
        this.tagContainer.removeChild(tag);
        search.removeTag(this.category, this.tag)
    }

    filterTag(){
        let currentRecipes = search.currentList;
        const tags = this.tagContainer.querySelectorAll(".tag");
        if(tags.length == 0){
            RecipeCards.eraseSearch();
            RecipeCards.displayRecipecards();
        }else{
            for(item of tags){
                let filteredRecipeArray = [];
                if(item.classList.contains("bg-success")){
                    for(recipe of currentRecipes){
                        if(recipe.appliance.toLowerCase().match(item.innerText)){
                            filteredRecipeArray.push(recipe);
                        }
                    }
                }
                if (item.classList.contains("bg-danger")) {
                    for(recipe of currentRecipes){
                        for(ustensil in recipe.ustensils){
                            if(ustensil.toLowerCase().match(item.innerText)){
                                filteredRecipeArray.push(recipe);
                            }
                        }
                    }
                }
                if(item.classList.contains("bg-primary")) {
                    for(recipe of currentRecipes){
                        for(element in recipe.ingredients){
                            if(element.ingredient.toLowerCase().match(item.innerText)){
                                filteredRecipeArray.push(recipe)
                            }
                        }
                    }
                }
            }
            currentRecipes = filteredRecipeArray;
            RecipeCards.eraseSearch();
            search.currentList = currentRecipes;
            for(recipe of currentRecipes){
                RecipeCards.showSearchedRecipes(recipe);
            }            
        }
    }
}