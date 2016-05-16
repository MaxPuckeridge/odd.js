goog.provide('odd');

goog.require('odd.app.App');

/* @type {odd.app.App} */
app = new odd.app.App();
app.render(document.getElementById('odd-app-container'));