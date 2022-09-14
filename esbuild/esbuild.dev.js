/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable sort-keys */
/* eslint-disable no-console */
const dotenv = require('dotenv');
const esbuild = require('esbuild');
const liveServer = require('live-server');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { sassPlugin, postcssModules } = require('esbuild-sass-plugin');
const postCssImport = require('postcss-import');

dotenv.config();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '8080';
const root = process.env.ROOT || './public';
const entry = process.env.ENTRY || './src/index.ts';
const spaIndex = process.env.SPA_INDEX || 'index.html';
const outFile = process.env.OUT_FILE || './public/bundle.js';
const proxyService = process.env.PROXY_SERVICE || 'localhost';
const waitForChangesMs = process.env.WAIT_FOR_CHANGES || 1000;
const logAll = process.env.LOG_ALL;

const params = {
  host,
  port,
  root,
  open: false,
  file: spaIndex,
  wait: waitForChangesMs,
  logLevel: logAll,
  middleware: [
    (req, res, next) => {
      const commonOptions = {
        changeOrigin: true,
        secure: false,
      };

      if (req.url.includes('/api/')) {
        return createProxyMiddleware({
          target: proxyService,
          ...commonOptions,
        })(req, res, next);
      }

      return next();
    },
  ],
};

liveServer.start(params);

const options = {
  entryPoints: [entry],
  outfile: outFile,
  bundle: true,
  watch: {
    onRebuild(error) {
      if (error) {
        console.error('esbuild: Watch build failed:', error.getMessage());
      } else {
        console.log('esbuild: Watch build succeeded');
      }
    },
  },
  format: 'iife',
  minify: false,
  sourcemap: 'linked',
  plugins: [
    sassPlugin({
      transform: postcssModules(
        {
          basedir: '',
          globalModulePaths: ['./src/styles'],
        },
        [postCssImport()],
      ),
    }),
  ],
  loader: {
    '.png': 'file',
    '.jpeg': 'file',
    '.jpg': 'file',
    '.js': 'jsx',
  },
};

esbuild.build(options).catch((err) => {
  console.error(err);
});
