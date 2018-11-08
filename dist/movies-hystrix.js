"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoviesAPI = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('./CommandsBuilder'),
    CommandsBuilder = _require.CommandsBuilder;

var _require2 = require('./CircuitState'),
    CircuitState = _require2.CircuitState;

var MoviesAPI =
/*#__PURE__*/
function () {
  function MoviesAPI() {
    _classCallCheck(this, MoviesAPI);
  }

  _createClass(MoviesAPI, [{
    key: "fetchMovies",
    value: function fetchMovies() {
      console.log('Trying to grab some sweet movie metadata!');
      return (0, _nodeFetch.default)('http://localhost:4545/movies', {
        timeout: 2000
      });
    }
  }, {
    key: "fetchAll",
    value: function fetchAll() {
      var _this = this;

      return CommandsBuilder.createMyCommand({
        runFn: function runFn() {
          return _this.fetchMovies().then(function (res) {
            console.log('✅ Everything went very well. Circuit Breaker is in CLOSED state.');
            return res.json();
          });
        },
        fallbackFn: function fallbackFn(error) {
          CircuitState.logCircuitstate(error);
          throw new Error('❌ Movie API not responding');
          Promise.reject();
        }
      }).execute();
    }
  }]);

  return MoviesAPI;
}();

exports.MoviesAPI = MoviesAPI;