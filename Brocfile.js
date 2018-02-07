"use strict";

const broccoli = require('broccoli');
const path = require('path');
const MergeTrees = require('broccoli-merge-trees');
const concat = require('broccoli-concat');
const Funnel = require('broccoli-funnel');
const stew = require('broccoli-stew');

console.log(path.dirname(require.resolve('pdfjs-dist')));

const pdfBuildDir = path.dirname(require.resolve('pdfjs-dist'));

const unminTree = concat(
  new Funnel(pdfBuildDir, {
    include: [ 'pdf.js', 'pdf.worker.js' ]
  }),
  {
    outputFile: 'pdf.concat.2-0-334.js',
    sourceMapConfig: { enabled: false }
  }
);
const minTree = concat(
  new Funnel(pdfBuildDir, {
    include: [ 'pdf.min.js', 'pdf.worker.min.js' ]
  }),
  {
    outputFile: 'pdf.concat.min.2-0-334.js',
    sourceMapConfig: { enabled: false }
  }
);
const srcTree = new Funnel('src');

const tree = new MergeTrees([ srcTree, unminTree, minTree ]);

module.exports = tree;
