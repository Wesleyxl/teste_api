"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _App = require('./App'); var _App2 = _interopRequireDefault(_App);
var _app = require('./config/app'); var _app2 = _interopRequireDefault(_app);

_App2.default.listen(_app2.default.port, () => {
  console.log(
    `The serve ${_app2.default.app_name} is running on ${_app2.default.url}:${_app2.default.port}`
  );
});
