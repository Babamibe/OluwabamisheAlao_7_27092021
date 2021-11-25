'use strict';

export class RecipeCards{

    static get recipesArray(){
        return [...recipes];
    }

    static showRecipeCards = () => {
            for(let i = 0; recipes.length > i; i++){
            this.displayRecipecards(recipes[i]);
        }
    }
    
    static showSearchedRecipes = searchList => {
     //  for(let i = 0; searchList.length > i; i++){

            this.displayRecipecards(searchList);
      //  }
        console.log("searchList", searchList)
    }

    static displayRecipecards = recipe => {
        document.querySelector(".container").innerHTML += `
        <div id="recipe-section" class="col-12 col-lg-4 mb-4">
            <div class="card rounded">
                <div class="img-holder rounded-top">
                    <img src="" alt="" class="card-img-top">
                </div>
                <div class="card-body">
                    <div class="card-layout">
                        <span class="card-title h5">${recipe.name}</span>
                        <span class="card-title h5">
                            <i class="far fa-clock"></i>
                            ${recipe.time} minutes
                        </span>
                    </div>
                    <div class="card-layout">
                        <ul class="list-unstyled">
                            ${recipe.ingredients.map(item => `
                                <li class="ingredient-list">
                                    <span class="ingredient-item">${item.ingredient}:</span>
                                    ${'quantity' in item ? item.quantity: ''} 
                                    ${'unit' in item ? item.unit : ''}
                                </li>`).join(' ')
                            }
                        </ul>
                        <p class="card-text">${recipe.description}</p>
                    </div>
                </div>
            </div>
        </div>

        `;
    }

    static nothingFound = () => {
        document.querySelector('.container').innerHTML = `
        <p>Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc...</p>
        `;
    }

    static eraseSearch = () => {
        document.querySelector('.container').innerHTML = ``;
    }
}