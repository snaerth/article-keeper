import serialize from 'serialize-javascript';

export default ({ html, preloadedState, assets }) => {
  const htmlPage = `
        <!doctype html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta http-equiv="x-ua-compatible" content="ie=edge">
                <title>Starter kit</title>
                <meta name="description" content="just another react + webpack boilerplate">
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1">
                <link href="${assets ? assets.main.css : '/styles.css'}" rel="stylesheet" type="text/css">
            </head>
        <body>
            <main id="app">${process.env.NODE_ENV === 'production' ? html : ''}</main>
            ${preloadedState ? `<script>window.__PRELOADED_STATE__ = ${serialize(preloadedState)}</script>` : ''}
            <script defer src="${assets ? assets.vendor.js : '/vendor.js'}"></script>
            <script defer src="${assets ? assets.main.js : '/main.js'}" ></script>
        </body>
    </html>`;

  return htmlPage;
};
