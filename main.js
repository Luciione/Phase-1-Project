const express = require('express');
const app = express();

const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

const appId = '8cf7fb00';
const appKey = 'e2558cd13d861421e5aa229f6f47551b';

searchBtn.addEventListener('click', searchMeals);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
  mealDetailsContent.parentElement.classList.remove('showRecipe');
});

function searchMeals() {
  const searchInput = document.getElementById('search-input').value.trim();
  if (searchInput !== '') {
    fetch(`https://api.example.com/recipes?search=${searchInput}&app_id=${appId}&app_key=${appKey}`)
      .then(response => response.json())
      .then(data => {
        if (data.count > 0) {
          const meals = data.hits.map(hit => hit.recipe);
          displayMealList(meals);
        } else {
          mealList.innerHTML = 'No meals found.';
        }
      })
      .catch(error => {
        console.log(error);
        mealList.innerHTML = 'An error occurred while fetching the data.';
      });
  } else {
    mealList.innerHTML = 'Please enter an ingredient to search.';
  }
}

function displayMealList(meals) {
  let html = '';
  meals.forEach(meal => {
    html += `
      <div class="meal-item">
        <div class="meal-img">
          <img src="${meal.image}" alt="food" onclick="showRecipe(this)" data-instructions="${meal.instructions}" data-video="${meal.video}">
        </div>
        <div class="meal-name">
          <h3>${meal.label}</h3>
          <a href="#" class="recipe-btn" onclick="showRecipe(this)">Get Recipe</a>
        </div>
      </div>
    `;
  });
  mealList.innerHTML = html;
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
  recipeCategory.innerText = 'Category: Seafood';

  const mealInstructions = element.parentNode.querySelector('.meal-instructions');
  if (mealInstructions.innerHTML.trim() === '') {
    const instructions = element.dataset.instructions;
    mealInstructions.innerHTML = `<h3>Instructions:</h3><p>${instructions}</p>`;
  }

  const recipeCloseBtn = document.getElementById('recipe-close-btn');
  recipeCloseBtn.addEventListener('click', () => {
    hideRecipe();
  });
}

function hideRecipe() {
  const recipeDetails = document.getElementById('meal-details');
  recipeDetails.style.display = 'none';
}

function getMealInstructions(element) {
  const mealId = element.dataset.mealId;
  fetch(`https://api.example.com/meals/${mealId}/instructions`)
    .then(response => response.json())
    .then(data => {
      const instructions = data.instructions;
      const mealInstructions = element.parentNode.querySelector('.meal-instructions');
      if (mealInstructions.innerHTML.trim() === '') {
        mealInstructions.innerHTML = `<h3>Instructions:</h3><p>${instructions}</p>`;
      }
    })
    .catch(error => {
      console.log(error);
    });
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
