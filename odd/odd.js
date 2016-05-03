goog.provide('odd');

goog.require('odd.examples.oscillator');

/* @type {odd.app.App} */
app = odd.examples.oscillator.toApp();
app.render(document.getElementById('odd-app-container'));
app.draw();