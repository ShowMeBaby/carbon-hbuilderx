'use strict';
const main = require('./src/main.js');
const hx = require("hbuilderx");

function activate(context) {
  let disposable = hx.commands.registerCommand('carbon.openurl', main.carbon);
  context.subscriptions.push(disposable);
}

module.exports = {
  activate
}
