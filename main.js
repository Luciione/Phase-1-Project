<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to My Recipe Finder</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA==" crossorigin="anonymous" />
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <div class="meal-wrapper">
      <div class="meal-search">
        <h2 class="title">Welcome to My Recipe Finder</h2>
        <blockquote>Search. Save. Cook. Enjoy<br>
          <cite>- Lucione</cite>
        </blockquote>

        <div class="meal-search-box">
          <input type="text" class="search-control" placeholder="Enter an ingredient" id="search-input">
          <button type="button" class="search-btn btn" id="search-btn">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>

      <div class="meal-result">
        <h2 class="title">Your Search Results:</h2>
        <div id="meal"></div>
      </div>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
