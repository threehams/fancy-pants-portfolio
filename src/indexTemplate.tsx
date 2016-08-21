export default function(pictureData) {
  return `
    <!doctype html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Vanessa M. Zuloaga</title>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/4.2.0/normalize.min.css" rel="stylesheet">
      <link rel="stylesheet" href="/assets/style.css">
      <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link rel="icon" href="assets/favicon.png" type="image/png" />
    </head>
    <body>
      <div id="root"></div>
      <script>
        const PICTURE_DATA = ${JSON.stringify(pictureData)};
      </script>
      <script src="/dist/bundle.js"></script>
    </body>
    </html>
  `;
}
