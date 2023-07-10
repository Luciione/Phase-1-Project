document.addEventListener('DOMContentLoaded', function() {
    var searchBtn = document.getElementById('search-btn');
    var searchInput = document.getElementById('search-input');
  
    searchBtn.addEventListener('click', function() {
      var query = searchInput.value;
  
      fetch('https://api.spoonacular.com/recipes/complexSearch?query=' + query + '&3549cef5e96f469e84b7505d82a9b6b0=3549cef5e96f469e84b7505d82a9b6b0')
        .then(function(response) {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error: ' + response.status);
          }
        })
        .then(function(data) {
          displayRecipes(data.results);
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  
    function displayRecipes(data) {
      var mealDiv = document.getElementById('meal');
      mealDiv.innerHTML = '';
  
      data.forEach(function(recipe) {
        var mealItem = document.createElement('div');
        mealItem.className = 'meal-item';
  
        var mealImg = document.createElement('div');
        mealImg.className = 'meal-img';
        var img = document.createElement('img');
        img.src = recipe.image;
        img.alt = recipe.title;
        mealImg.appendChild(img);
  
        var mealName = document.createElement('div');
        mealName.className = 'meal-name';
        var h3 = document.createElement('h3');
        h3.textContent = recipe.title;
        var recipeLink = document.createElement('a');
        recipeLink.href = recipe.sourceUrl;
        recipeLink.className = 'recipe-btn';
        recipeLink.textContent = 'Get Recipe';
        mealName.appendChild(h3);
        mealName.appendChild(recipeLink);
  
        mealItem.appendChild(mealImg);
        mealItem.appendChild(mealName);
  
        mealDiv.appendChild(mealItem);
      });
    }
  });
  
