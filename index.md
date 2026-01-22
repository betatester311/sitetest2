<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>My Mockup Site</title>
</head>
<body>

<h1>Welcome to my mockup site</h1>

<!-- Container pour l'iframe YouSign -->
<div id="yousign-iframe-container"></div>

<!-- 1️⃣ Script YouSign (SDK) -->
<script src="https://cdn.yousign.tech/iframe-sdk-1.6.0.min.js"
        integrity="sha384-/7MD1voOOzWVz7FmgeMwmmd1DO85Mo0PkkxdYd9j2wDGzGDGRG/phgnL0c9Xyy52"
        crossorigin="anonymous">
</script>

<!-- 2️⃣ Initialisation de l’iframe -->
<script>
  const iframe = new YouSign.IFrame({
    container: '#yousign-iframe-container',
    url: 'https://sandbox.yousign.com/template/33b0e1b2-76ec-4d93-abb4-779ecd8d523d',
    width: '100%',
    height: '700px'
  });
  iframe.mount();
</script>

</body>
</html>
