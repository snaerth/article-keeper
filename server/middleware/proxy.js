import httpProxy from 'http-proxy';

export default function Proxy({ app, target }) {
  const proxy = httpProxy.createProxyServer({ target });

  // Proxy to api server
  app.use('/api', (req, res) => {
    proxy.web(req, res, { target });
  });

  // Added the error handling to avoid
  // https://github.com/nodejitsu/node-http-proxy/issues/527
  proxy.on('error', (error, req, res) => {
    if (error.code !== 'ECONNRESET') {
      console.error('proxy error', error);
    }

    if (!res.headersSent) {
      res.writeHead(500, { 'content-type': 'application/json' });
    }

    const json = {
      error: 'proxy_error',
      reason: error.message,
    };

    res.end(JSON.stringify(json));
  });

  return proxy;
}
