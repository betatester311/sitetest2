<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Mockup Site</title>
</head>
<body>

<h1>Welcome to my mockup site</h1>

<p>About me <br> gergeiburbgerignekrnger</p>

<hr>

<h3>Learn About My Projects</h3>

<p>
For this project, I created a report to analyse Airbnb's dataset, using Python language.
</p>

<p>
It talks about :
<ul>
    <li>The price difference between the type of rent</li>
    <li>The relationship between host's response time and the final review score</li>
    <li>An analysis of price trend over time</li>
</ul>
</p>

<!-- Container pour l'iframe YouSign -->
<div id="yousign-iframe-container"></div>

<!-- SDK YouSign -->
<script src="https://cdn.yousign.tech/iframe-sdk-1.6.0.min.js" integrity="sha384-/7MD1voOOzWVz7FmgeMwmmd1DO85Mo0PkkxdYd9j2wDGzGDGRG/phgnL0c9Xyy52" crossorigin="anonymous"></script>

<!-- Initialisation de l'iframe -->
<script>
  const iframe = new YouSign.IFrame({
    container: '#yousign-iframe-container',
    url: 'https://sandbox.yousign.com/template/33b0e1b2-76ec-4d93-abb4-779ecd8d523d', // <-- remplacer par ton URL
    width: '100%',
    height: '600px'
  });
  iframe.mount();
</script>

</body>
</html>











