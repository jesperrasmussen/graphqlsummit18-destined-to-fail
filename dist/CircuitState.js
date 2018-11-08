"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CircuitState = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CircuitState =
/*#__PURE__*/
function () {
  function CircuitState() {
    _classCallCheck(this, CircuitState);
  }

  _createClass(CircuitState, null, [{
    key: "logCircuitstate",
    value: function logCircuitstate(error) {
      switch (error.message) {
        case "CommandTimeOut":
          console.log('⚠️ Service timed out');
          break;

        case "OpenCircuitError":
          console.log('⛔️ Circuit Breaker in OPEN state - halting requests to service to back off.');
          break;

        default:
          console.log('I dont know - ' + error.message);
      }
    }
  }]);

  return CircuitState;
}();

exports.CircuitState = CircuitState;