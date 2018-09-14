(<any>global).fetch = require('node-fetch/lib/index');
// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';
import { CustomModelClient } from './CustomModelClient';
import { ModelManager, ModelClient, ModelStore } from '@adobe/cq-spa-page-model-manager';
import { environment } from './src/environments/environment';
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');
const APP_ROOT_PATH = "/content/we-retail-journal/angular";

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// TODO: implement data requests securely
app.get('/api/*', (req, res) => {
  res.status(404).send('data requests are not supported');
});

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All regular routes use the Universal engine
app.get(`${APP_ROOT_PATH}*.html`, (req, res, next) => {
  let pagePath = req.path.replace(/\.html$/, '');

  let modelClient = new CustomModelClient(environment.API_HOST);
  ModelManager.destroy();
  ModelManager.initialize({ path: APP_ROOT_PATH, modelClient }).then((model) => {
    return ModelManager.getData({ path: pagePath }).then(() => {
      res.render('index', { req, document: '<app-root></app-root>' });
    });
  }).catch((error) => {
    next(error);
  });
});

app.post(`${APP_ROOT_PATH}*.html`, (req, res, next) => {
  let modelStore = new ModelStore(APP_ROOT_PATH, req.body);
  ModelManager.destroy();
  ModelManager.initialize({ path: APP_ROOT_PATH, modelStore }).then((model) => {
    res.render('index', { req }, (err: Error, html: string) => {
      let headMatches = html.match(/<head>(.|[\s\S]*?)<\/head>/g);
      let bodyMatches = html.match(/<body>(.|[\s\S]*?)<\/body>/g);
      let head = headMatches ? headMatches[0].replace(/<\/?head>/g,'') : '';
      let body = bodyMatches ? bodyMatches[0].replace(/<\/?body>/g,'') : '';

      res.status(html ? 200 : 500).send( head + body || err.message);
    });
  }).catch((error) => {
    next(error);
  });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
