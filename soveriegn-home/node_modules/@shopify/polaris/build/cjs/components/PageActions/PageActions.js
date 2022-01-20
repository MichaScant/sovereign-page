'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PageActions$1 = require('./PageActions.scss.js');
var utils = require('../Button/utils.js');
var ButtonGroup = require('../ButtonGroup/ButtonGroup.js');
var Stack = require('../Stack/Stack.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function PageActions({
  primaryAction,
  secondaryActions
}) {
  const primaryActionMarkup = primaryAction ? utils.buttonsFrom(primaryAction, {
    primary: true
  }) : null;
  const secondaryActionsMarkup = secondaryActions ? /*#__PURE__*/React__default['default'].createElement(ButtonGroup.ButtonGroup, null, utils.buttonsFrom(secondaryActions)) : null;
  const distribution = secondaryActionsMarkup ? 'equalSpacing' : 'trailing';
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: PageActions$1['default'].PageActions
  }, /*#__PURE__*/React__default['default'].createElement(Stack.Stack, {
    distribution: distribution,
    spacing: "tight"
  }, secondaryActionsMarkup, primaryActionMarkup));
}

exports.PageActions = PageActions;
