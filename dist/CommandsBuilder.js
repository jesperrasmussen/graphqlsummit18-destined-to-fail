"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommandsBuilder = void 0;

var _hystrixjs = require("hystrixjs");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CommandsBuilder =
/*#__PURE__*/
function () {
  function CommandsBuilder() {
    _classCallCheck(this, CommandsBuilder);
  }

  _createClass(CommandsBuilder, null, [{
    key: "createMyCommand",
    value: function createMyCommand(_ref) {
      var runFn = _ref.runFn,
          fallbackFn = _ref.fallbackFn;
      var fallback = fallbackFn; //commandFactory.resetCache()

      return _hystrixjs.commandFactory.getOrCreate("moviesservice").run(runFn).timeout(2000) //Amount of failures, before the health is actually calculated
      .circuitBreakerRequestVolumeThreshold(5).statisticalWindowLength(20000).statisticalWindowNumberOfBuckets(5) // Waiting period before letting a single request through in half open
      .circuitBreakerSleepWindowInMilliseconds(10000) // function called if the service is down or slow
      .fallbackTo(fallback).build();
    }
  }]);

  return CommandsBuilder;
}();

exports.CommandsBuilder = CommandsBuilder;