"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Movies = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Movies =
/*#__PURE__*/
function () {
  function Movies() {
    _classCallCheck(this, Movies);
  }

  _createClass(Movies, [{
    key: "fetchAll",
    value: function fetchAll() {
      return (0, _nodeFetch.default)('http://localhost:4545/movies', {
        timeout: 2000
      }).then(function (res) {
        return res.json();
      });
    }
  }]);

  return Movies;
}();

exports.Movies = Movies;