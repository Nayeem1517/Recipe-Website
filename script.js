const searchBox = document.querySelector('.search-box');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const RecipeDetailsContent = document.querySelector('.recipe-details-content');
const closeButton = document.querySelector('.Close-button');

//Function to get recipe
const fetchRecipe = async (query) => {
    recipeContainer.innerHTML = "Fetching Recipes..."
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src ="${meal.strMealThumb}">
        <h3> <span>${meal.strMeal}</span> Dish </h3>
        <p>Belongs To <span>${meal.strArea}</span> category</p>
        <p>${meal.strCategory} </p>
        `
        const Button = document.createElement('button');
        Button.textContent = "View Recipe";
        recipeDiv.appendChild(Button)
        // Adding Event Listener To Recipe Button 

        Button.addEventListener('click', () => {
            openRecipePopUp(meal);

        })



        recipeContainer.appendChild(recipeDiv)
    })
    // console.log(response.meals[0])
}
// Fetching Recipe Details 
const fetchIngrediants = (meal) => {
let ingrediantsList = "";
for(let i = 1; i <= 20; i++){
    const ingrediant = meal[`strIngredient${i}`];
    if(ingrediant){
        const measure = meal[`strMeasure${i}`];
        ingrediantsList += `<li>${measure} ${ingrediant}</li>`
    }
    else{
        break;
    }
}
return ingrediantsList;

}


// Recipe Details 

const openRecipePopUp = (meal) => {
    RecipeDetailsContent.innerHTML = `
    <h2 class="recipeName"> ${meal.strMeal} </h2>
    <h3>Ingrediants : </h3>
    <ul class="ingredientList">${fetchIngrediants(meal)}</ul>    
    <div>
    <h3 class="recipe-instructions">Instructions:</h3>
    <p>${meal.strInstructions}</p>
    </div>
    `
    
    RecipeDetailsContent.parentElement.style.display = "block";
}
// Close Button 
closeButton.addEventListener('click', () => {
    RecipeDetailsContent.parentElement.style.display = "none";
})

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value;
    fetchRecipe(searchInput);
    // console.log("Button Clicked");

})