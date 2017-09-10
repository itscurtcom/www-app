import path from 'path';
import express from 'systemic-express/express';

const ALL_NON_API_REQUESTS = /^(?!\/api\/).*/;

module.exports = function() {

  function start({ app, config, logger, prepper,}, cb) {

    // We use StatusCake for monitoring site availability. No need to log
    app.use((req, res, next) => {
      if (!req.headers['user-agent']) return next();
      if (!req.headers['user-agent'].includes('StatusCake')) return next();
      prepper.disable(req, res, next);
    });

    // Serve react app (index.html) explicitly, instead of via express.static
    // so we can log requests and set cache control headers
    app.get([/^\/$/, '/index.html',], app.locals.hasRole('guest'), sendIndex);

    // Make runtime client config available to index.html via script tag (yuck!)
    app.get('/config.js', app.locals.hasRole('guest'), (req, res) => {
      res.set('content-type' ,'application/javascript; charset=utf-8');
      res.set('cache-control', 'public, max-age=3600, must-revalidate');
      res.send(`this.window.config = ${JSON.stringify(config.public)}`);
    });

    app.use(prepper.disable, app.locals.hasRole('guest'), express.static('./client/build', { cachecontrol: true, maxage: '1d', }));

    // Ensures 404's are handled by the app
    app.get(ALL_NON_API_REQUESTS, prepper.enable, app.locals.hasRole('guest'), sendIndex);

    function sendIndex(req, res, next) {
      res.sendFile(path.join(process.cwd(), 'client', 'build', 'index.html'));
    }

    cb();
  }

  return {
    start,
  };
};