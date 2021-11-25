import {SearchRecipe} from "./recipeSearch.js";
import { RecipeCards } from "./recipeCards.js";
import {Ustensils} from "./ustentils.js";
import { Ingredients} from "./ingredients.js";
import {Appliances} from "./appliances.js";

RecipeCards.showRecipeCards();

export let search = new SearchRecipe();
new Ingredients();
new Appliances();
new Ustensils();


