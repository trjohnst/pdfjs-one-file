/**
 * Because PDF.js will search for workers via name replacement, we are loading from hosting other than the CDN's in the settings of the JS section to this pen, as they host workers that will be loaded via the name replacement.
 * This is using PDF.js v@2.0.334
 *   - pdf.min.js: https://codepen.io/trjohnst/pen/wyoJjW
 *   - pdf.js: https://codepen.io/trjohnst/pen/mXOWGy
 *
 * For debugging purposes, here are hosted workers
 *   - pdf.worker.js: https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.334/build/pdf.worker.js
 * . - pdf.worker.min.js: https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.334/build/pdf.worker.min.js
 *
 * Concats
 *   - unmin: https://trjohnst.github.io/assets/pdf.concat.2-0-334.js
 * . - min: https://trjohnst.github.io/assets/pdf.concat.min.2-0-334.js
 *
 * Because the worker is loaded as another script tag on the main thread, a fake worker is used (indicated in console)
 */

var pdfUrl = '//cdn.mozilla.net/pdfjs/helloworld.pdf';

// Uncommenting the following and removing loading the worker as a script on the main thread
// will trigger PDF.js to use a worker instead of a fake one
// PDFJS.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.334/build/pdf.worker.min.js';

window.onload = function() {
  PDFJS.getDocument(pdfUrl).then(function(pdf) {
    const pagePromise = pdf.getPage(1);

    return pagePromise.then(function(page) {
      const scale = 1;
      const viewport = page.getViewport(scale);
      const canvas = document.getElementById('canvas');
      const context = canvas.getContext('2d');

      canvas.width = page.pageInfo.view[2] * scale;
      canvas.height = page.pageInfo.view[3] * scale;

      return page.render({
        canvasContext: context,
        viewport
      });
    });
  });
}
