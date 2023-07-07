# Phase-1-Project

## Recipe Finder
This is a web application called "My Recipe Finder" that allows users to search for recipes based on ingredients. Users can enter an ingredient in the search box, and the application will fetch and display a list of meals that contain the specified ingredient. Users can then click on a meal to view its recipe details, including instructions and a video link.

### Getting Started
To use this application, follow these steps:

Clone the repository or download the HTML, CSS, and JavaScript files.
Open the HTML file (index.html) in a web browser.
#### Usage

Enter an ingredient in the search box and click the search button.
The application will fetch and display a list of meals that contain the specified ingredient.
Click on a meal to view its recipe details.
The recipe details will include the meal's name, category, instructions, an image, and a video link.
To close the recipe details, click the close button.
Dependencies
The application uses the following external dependencies:

Font Awesome - A library of icons used for styling.

##### File Structure

The repository contains the following files:

index.html - The main HTML file that defines the structure and layout of the web page.
style.css - The CSS file that contains the styles for the web page.
script.js - The JavaScript file that handles the functionality of the application.
Fish.jpeg, Chicken Curry.jpeg, and EggStirFry.jpeg - Image files used in the application.
API
The application uses the TheMealDB API to fetch meal data. It makes two API requests:

To search for meals based on the specified ingredient: https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient}
To retrieve the recipe details for a specific meal: https://www.themealdb.com/api/json/v1/1/lookup.php?i={mealId}

##### Credits
The application was created by Lucione.

###### License

This project is licensed under the MIT License.






