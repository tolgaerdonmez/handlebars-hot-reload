#!/usr/bin/env node
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _http = _interopRequireDefault(require("http"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _ws = _interopRequireDefault(require("ws"));

var _cli = require("./cli");

var _renderTemplate = require("./render-template");

var HTTP_PORT = 5000;
var WEBSOCKET_PORT = 5001; // Reading the client websocket code from ./client-websocket-reload.js

var CLIENT_WEBSOCKET_CODE = _fs["default"].readFileSync(_path["default"].join(__dirname, "client-websocket-reload.js"), "utf8");

function prepareTemplate(_x, _x2) {
  return _prepareTemplate.apply(this, arguments);
}

function _prepareTemplate() {
  _prepareTemplate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(templatePath, dataPath) {
    var templateData, html, rawHtml;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            templateData = {}; // read the template's data if exists

            dataPath = dataPath ? dataPath : templatePath.replace(/\.hbs$/, ".json");

            try {
              if (_fs["default"].statSync(dataPath).isFile()) {
                templateData = JSON.parse(_fs["default"].readFileSync(dataPath, "utf-8"));
              }
            } catch (_unused) {
              console.log("No template data found, continuing without data");
            }

            _context2.prev = 3;
            _context2.next = 6;
            return (0, _renderTemplate.renderTemplate)(templateData, templatePath);

          case 6:
            rawHtml = _context2.sent;
            html = rawHtml; // adding the hot reload script

            html += "\n\n<script>".concat(CLIENT_WEBSOCKET_CODE, "</script>");
            _context2.next = 15;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](3);
            html = "<h1>Error rendering handlebar template, please check the console for error output</h1>";
            console.error(_context2.t0);

          case 15:
            return _context2.abrupt("return", {
              rawHtml: rawHtml,
              html: html
            });

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 11]]);
  }));
  return _prepareTemplate.apply(this, arguments);
}

function main() {
  var _getCliArgs = (0, _cli.getCliArgs)(process.argv),
      port = _getCliArgs.port,
      templatePath = _getCliArgs.templatePath,
      dataPath = _getCliArgs.dataPath,
      saveOutput = _getCliArgs.saveOutput,
      _outputPath = _getCliArgs.o,
      other = (0, _objectWithoutProperties2["default"])(_getCliArgs, ["port", "templatePath", "dataPath", "saveOutput", "o"]);

  HTTP_PORT = port ? parseInt(port) : HTTP_PORT; // setting output path if saveOutput is true or _outputPath is given

  var outputPath = saveOutput ? templatePath.replace(/\.hbs$/, ".html") : _outputPath ? _outputPath : "";
  console.log(other); // creating a new websocket instance

  new _ws["default"].Server({
    port: WEBSOCKET_PORT
  });

  var requestHandler = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var method, _yield$prepareTemplat, html, rawHtml;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              method = req.method.toLowerCase();

              if (!(method === "get")) {
                _context.next = 11;
                break;
              }

              res.writeHead(200); // getting the html with the rendered hbs + hot reload code

              _context.next = 5;
              return prepareTemplate(templatePath, dataPath);

            case 5:
              _yield$prepareTemplat = _context.sent;
              html = _yield$prepareTemplat.html;
              rawHtml = _yield$prepareTemplat.rawHtml;
              // writing it to the request
              res.end(html); // saving the created output if outputPath exists

              if (outputPath) _fs["default"].writeFileSync(outputPath, rawHtml);
              return _context.abrupt("return");

            case 11:
              res.writeHead(404);
              res.end();

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function requestHandler(_x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }();

  var server = _http["default"].createServer(requestHandler);

  server.listen(HTTP_PORT, function () {
    console.log("Listening on port ".concat(HTTP_PORT));
  });
}

main(); // export default main;