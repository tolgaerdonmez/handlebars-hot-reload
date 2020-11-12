"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCliArgs = void 0;

var _yargs = _interopRequireDefault(require("yargs"));

var getCliArgs = function getCliArgs(processArgv) {
  return (0, _yargs["default"])(processArgv).usage("Usage: -t <template path> -d <json data path> -o <output path> -s <save output>").option({
    t: {
      alias: "templatePath",
      demandOption: true,
      describe: "Template path you want to render",
      type: "string"
    },
    j: {
      alias: "dataPath",
      demandOption: false,
      describe: "JSON data to be injected into handlebar template, if this is not given it will search for e.g example.hbs -> example.json",
      type: "string"
    },
    p: {
      alias: "port",
      demandOption: false,
      describe: "HTTP Port you want to serve the file",
      type: "number"
    },
    o: {
      alias: "outputPath",
      demandOption: false,
      describe: "Save the created html output to given path",
      type: "string"
    },
    s: {
      alias: "saveOutput",
      demandOption: false,
      describe: "Whether to save the created html output to the same directory as the template, this will override the -o / --outputPath option",
      type: "boolean",
      "default": false
    }
  }).argv;
};

exports.getCliArgs = getCliArgs;