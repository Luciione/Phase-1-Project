const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');

// event listener
searchBtn.addEventListener('click', getMealList);

// get meal list that matches with the ingredients
function getMealList() {
  const searchInput = document.getElementById('search-input').value.trim();
  if (searchInput !== '') {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
      .then(response => response.json())
      .then(data => {
        displayMealList(data.meals);
      })
      .catch(error => {
        console.log(error);
        mealList.innerHTML = 'An error occurred while fetching the data.';
      });
  } else {
    mealList.innerHTML = 'Please enter an ingredient to search.';
  }
}

// display meal list
function displayMealList(meals) {
  if (meals) {
    let html = '';
    meals.forEach(meal => {
      html += `
        <div class="meal-item" data-id="${meal.idMeal}">
          <div class="meal-img">
            <img src="${meal.strMealThumb}" alt="Meal Image">
          </div>
          <div class="meal-name">
            <h3>${meal.strMeal}</h3>
            <a href="#" class="recipe-btn">Get Recipe</a>
          </div>
        </div>
      `;
    });
    mealList.innerHTML = html;
  } else {
    mealList.innerHTML = 'No meals found.';
  }
}
