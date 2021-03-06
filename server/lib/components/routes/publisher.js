import bodyParser from 'body-parser';

export default function(options = {}) {

  function start({ config, logger, app, contentful, store, }, cb) {

    app.use('/api/publisher', app.locals.hasRole('publisher'), bodyParser.json(), (req, res, next) => {
      res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.set('Pragma', 'no-cache');
      res.set('Expires', '0');
      next();
    });

    app.get('/api/publisher/1.0/tags', (req, res, next) => {
      store.listTags((err, tags) => {
        if (err) return next(err);
        res.json(tags);
      });
    });

    app.post('/api/publisher/1.0/tags/:tag', (req, res, next) => {
      contentful.extract((err, content) => {
        if (err) return next(err);
        store.saveContent(req.params.tag, content, err => {
          if (err) return next(err);
          res.sendStatus(204);
        });
      });
    });

    app.delete('/api/publisher/1.0/tags/:tag', (req, res, next) => {
      store.deleteContent(req.params.tag, err => {
        if (err) return next(err);
        res.sendStatus(204);
      });
    });

    app.get('/api/publisher/1.0/references', (req, res, next) => {
      store.listReferences((err, references) => {
        if (err) return next(err);
        res.json(references);
      });
    });

    app.post('/api/publisher/1.0/references/:tag', app.locals.hasRole('publisher'), (req, res, next) => {
      const reference = { tag: req.params.tag, date: new Date(), user: req.user, };
      store.saveReference(reference, err => {
        if (err) return next(err);
        res.sendStatus(204);
      });
    });

    cb();
  }

  return {
    start,
  };
}
