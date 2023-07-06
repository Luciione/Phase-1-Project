const express = require('express');
const app = express();
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

const appId = '8cf7fb00';
const appKey = 'e2558cd13d861421e5aa229f6f47551b';

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
  mealDetailsContent.parentElement.classList.remove('showRecipe');
});

function getMealList() {
    fetch('data.json') 
    .then(response => response.json())
    .then(data => {
      let html = "";
      if (data.meals) {
        data.meals.forEach(meal => {
          html += `
            <div class="meal-item">
              <div class="meal-img">
                <img src="${meal.strMealThumb}" alt="food" onclick="showRecipe(this)" data-instructions="${meal.strInstructions}" data-video="${meal.strYoutube}">
              </div>
              <div class="meal-name">
                <h3>${meal.strMeal}</h3>
                <a href="#" class="recipe-btn" onclick="showRecipe(this)">Get Recipe</a>
              </div>
            </div>
          `;
        });
        mealList.classList.remove('notFound');
      } else {
        html = "Sorry, we didn't find any meal!";
        mealList.classList.add('notFound');
      }

      mealList.innerHTML = html;
    });
}

function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains('recipe-btn')) {
    let mealItem = e.target.parentElement.parentElement;
    const mealId = mealItem.dataset.id;
    fetch(`https://api.edamam.com/api/recipes/v2/${mealId}?type=public&app_id=${appId}&app_key=${appKey}`)
      .then(response => response.json())
      .then(data => mealRecipeModal(data.recipe));
  }
}

function showRecipe(element) {
  const recipeDetails = document.getElementById('meal-details');
  const recipeImg = document.getElementById('recipe-img');
  const recipeTitle = document.querySelector('.recipe-title');
  const recipeCategory = document.querySelector('.recipe-category');
  const recipeInstructions = document.querySelector('.recipe-instruct');
  const recipeVideoLink = document.querySelector('.recipe-link a');
  const mealName = element.parentNode.querySelector('h3').innerText;
  const mealImgSrc = element.parentNode.querySelector('img').src;

  recipeDetails.style.display = 'block';
  recipeImg.src = mealImgSrc;
  recipeTitle.innerText = mealName;
  recipeInstructions.innerHTML = element.dataset.instructions;
  recipeVideoLink.href = element.dataset.video;
  recipeCategory.innerText = "Category: Seafood";

  const instructions = "Remove the dirt from the Fish";
  recipeInstructions.innerHTML = "<h3>Instructions:</h3><p>" + instructions + "</p>";
}

function hideRecipe() {
  const recipeDetails = document.getElementById('meal-details');
  recipeDetails.style.display = 'none';
}

function mealRecipeModal(recipe) {
    
    const recipeTitle = recipe.label;
    const recipeImage = recipe.image;
    const recipeInstructions = recipe.instructions;
    const recipeVideo = recipe.video;
  
    
    const recipeTitleElement = document.querySelector('.recipe-title');
    recipeTitleElement.innerText = recipeTitle;
  
    
    const recipeImg = document.getElementById('recipe-img');
    recipeImg.src = recipeImage;
  
    
    const recipeInstructionsElement = document.querySelector('.recipe-instruct');
    recipeInstructionsElement.innerHTML = `<h3>Instructions:</h3><p>${recipeInstructions}</p>`;
  
    
    const recipeVideoLink = document.querySelector('.recipe-link a');
    recipeVideoLink.href = recipeVideo;
  
    
    const recipeDetails = document.getElementById('meal-details');
    recipeDetails.style.display = 'block';
  
    
  }
  