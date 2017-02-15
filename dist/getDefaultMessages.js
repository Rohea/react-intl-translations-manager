'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = function (files) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$overrideMessage = _ref.overrideMessage,
      overrideMessage = _ref$overrideMessage === undefined ? 'default' : _ref$overrideMessage;

  if (!files) throw new Error('Files are required');

  return files.reduce(function (fileAcc, _ref2) {
    var descriptors = _ref2.descriptors;

    var duplicateIds = fileAcc.duplicateIds;
    return {
      messages: descriptors.reduce(function (descAcc, _ref3) {
        var id = _ref3.id,
            defaultMessage = _ref3.defaultMessage;

        if (descAcc[id] !== undefined) {
          duplicateIds.push(id);
        }

        var message = void 0;
        switch (overrideMessage) {
          case 'default':
            message = defaultMessage;
            break;
          case 'id':
            message = id;
            break;
          default:
            message = '';
        }

        return _extends({}, descAcc, _defineProperty({}, id, message));
      }, fileAcc.messages),
      duplicateIds: duplicateIds
    };
  }, {
    messages: {},
    duplicateIds: []
  });
};