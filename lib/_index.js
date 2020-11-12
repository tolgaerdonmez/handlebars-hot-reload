"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _nodemon = _interopRequireDefault(require("nodemon"));

var _ = _interopRequireDefault(require("."));

(0, _nodemon["default"])({
  // script: "./src/main.js",
  ext: "js json hbs"
});

_nodemon["default"].on("start", function () {
  (0, _["default"])();
  console.log("App has started");
}).on("quit", function () {
  console.log("App has quit");
  process.exit();
}).on("restart", function (files) {
  console.log("App restarted due to: ", files);
});