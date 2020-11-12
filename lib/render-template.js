"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var readFile = require("fs").promises.readFile;

var hbs = require("handlebars");

function renderTemplate(_x, _x2) {
  return _renderTemplate.apply(this, arguments);
}

function _renderTemplate() {
  _renderTemplate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data, templateName) {
    var html, template, rendered;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return readFile(templateName, "utf-8");

          case 2:
            html = _context.sent;
            // creates the Handlebars template object
            template = hbs.compile(html, {
              strict: true
            }); // renders the html template with the given data

            rendered = template(data);
            return _context.abrupt("return", rendered);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _renderTemplate.apply(this, arguments);
}

module.exports = {
  renderTemplate: renderTemplate
};