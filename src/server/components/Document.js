import PropTypes from 'prop-types';
import React from 'react';

/* eslint-disable react/no-danger */
export default function Document({ content, state, title, appLocation }) {
  let jsFiles = <script src="/build/bundle.js" />;
  let cssFiles = null;

  if (process.env.NODE_ENV.indexOf('prod') > -1) {
    // requiring the manfiest happens on the server side and only in prod
    // this means a dynamic require is fine
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const manifestJSON = require(`${appLocation}/build/manifest.json`);

    cssFiles = Object.keys(manifestJSON.cssChunks).map((cssFile) => (
      <link key={cssFile} rel="stylesheet" type="text/css" href={`/build/${cssFile}`} />
    ));
    jsFiles = Object.keys(manifestJSON.jsChunks).map((jsFile) => (
      <link key={jsFile} rel="stylesheet" type="text/css" href={`/build/${jsFile}`} />
    ));
  }

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        { cssFiles }
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.APOLLO_STATE=${JSON.stringify(state).replace(/</g, '\\u003c')};`,
          }}
        />
        { jsFiles }
      </body>
    </html>
  );
}

Document.defaultProps = {
  title: '',
};

Document.propTypes = {
  appLocation: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired,
  title: PropTypes.string,
};
