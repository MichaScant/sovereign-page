'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var debounce = require('lodash/debounce');
var css = require('../../utilities/css.js');
var useToggle = require('../../utilities/use-toggle.js');
var types = require('../../types.js');
var closestParentMatch = require('../../utilities/closest-parent-match.js');
var scrollIntoView = require('../../utilities/scroll-into-view.js');
var Listbox$1 = require('./Listbox.scss.js');
var hooks$1 = require('../../utilities/combobox/hooks.js');
var selectors = require('./components/Section/selectors.js');
var context = require('../../utilities/listbox/context.js');
var TextOption = require('./components/TextOption/TextOption.js');
var Loading = require('./components/Loading/Loading.js');
var Section = require('./components/Section/Section.js');
var Header = require('./components/Header/Header.js');
var Action = require('./components/Action/Action.js');
var hooks = require('../../utilities/unique-id/hooks.js');
var KeypressListener = require('../KeypressListener/KeypressListener.js');
var VisuallyHidden = require('../VisuallyHidden/VisuallyHidden.js');
var Option = require('./components/Option/Option.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var debounce__default = /*#__PURE__*/_interopDefaultLegacy(debounce);

const scrollable = {
  props: {
    'data-polaris-scrollable': true
  },
  selector: '[data-polaris-scrollable]'
};
const LISTBOX_OPTION_SELECTOR = '[data-listbox-option]';
const LISTBOX_OPTION_VALUE_ATTRIBUTE = 'data-listbox-option-value';
const DATA_ATTRIBUTE = 'data-focused';
function Listbox({
  children,
  enableKeyboardControl,
  accessibilityLabel,
  onSelect
}) {
  const listboxClassName = css.classNames(Listbox$1['default'].Listbox);
  const {
    value: keyboardEventsEnabled,
    setTrue: enableKeyboardEvents,
    setFalse: disableKeyboardEvents
  } = useToggle.useToggle(Boolean(enableKeyboardControl));
  const listId = hooks.useUniqueId('Listbox');
  const scrollableRef = React.useRef(null);
  const listboxRef = React.useRef(null);
  const [loading, setLoading] = React.useState();
  const [currentActiveOption, setCurrentActiveOption] = React.useState();
  const {
    setActiveOptionId,
    setListboxId,
    listboxId,
    textFieldLabelId,
    onOptionSelected,
    onKeyToBottom,
    textFieldFocused
  } = hooks$1.useComboboxListbox();
  const inCombobox = Boolean(setActiveOptionId);
  React.useEffect(() => {
    if (setListboxId && !listboxId) {
      setListboxId(listId);
    }
  }, [setListboxId, listboxId, listId]);
  React.useEffect(() => {
    if (!currentActiveOption || !setActiveOptionId) return;
    setActiveOptionId(currentActiveOption.domId);
  }, [currentActiveOption, setActiveOptionId]); // eslint-disable-next-line react-hooks/exhaustive-deps

  const handleScrollIntoView = React.useCallback(debounce__default['default']((option, first) => {
    if (scrollableRef.current) {
      const {
        element
      } = option;
      const focusTarget = first ? closestParentMatch.closestParentMatch(element, selectors.listboxSectionDataSelector.selector) || element : element;
      scrollIntoView.scrollIntoView(focusTarget, scrollableRef.current);
    }
  }, 15), []);
  const handleChangeActiveOption = React.useCallback(nextOption => {
    setCurrentActiveOption(currentActiveOption => {
      if (currentActiveOption) {
        currentActiveOption.element.removeAttribute(DATA_ATTRIBUTE);
      }

      if (nextOption) {
        nextOption.element.setAttribute(DATA_ATTRIBUTE, 'true');

        if (scrollableRef.current) {
          const first = getNavigableOptions().findIndex(element => element.id === nextOption.element.id) === 0;
          handleScrollIntoView(nextOption, first);
        }

        return nextOption;
      } else {
        return undefined;
      }
    });
  }, [handleScrollIntoView]);
  React.useEffect(() => {
    if (listboxRef.current) {
      scrollableRef.current = listboxRef.current.closest(scrollable.selector);
    }
  }, []);
  React.useEffect(() => {
    if (enableKeyboardControl && !keyboardEventsEnabled) {
      enableKeyboardEvents();
    }
  }, [enableKeyboardControl, keyboardEventsEnabled, enableKeyboardEvents]);
  const onOptionSelect = React.useCallback(option => {
    handleChangeActiveOption(option);

    if (onOptionSelected) {
      onOptionSelected();
    }

    if (onSelect) onSelect(option.value);
  }, [handleChangeActiveOption, onSelect, onOptionSelected]);
  const listboxContext = React.useMemo(() => ({
    onOptionSelect,
    setLoading
  }), [onOptionSelect]);

  function findNextValidOption(type) {
    const isUp = type === 'up';
    const navItems = getNavigableOptions();
    let nextElement = currentActiveOption === null || currentActiveOption === void 0 ? void 0 : currentActiveOption.element;
    let count = -1;

    while (count++ < navItems.length) {
      var _nextElement2;

      let nextIndex;

      if (nextElement) {
        var _nextElement;

        const currentId = (_nextElement = nextElement) === null || _nextElement === void 0 ? void 0 : _nextElement.id;
        const currentIndex = navItems.findIndex(currentNavItem => currentNavItem.id === currentId);
        let increment = isUp ? -1 : 1;

        if (currentIndex === 0 && isUp) {
          increment = navItems.length - 1;
        } else if (currentIndex === navItems.length - 1 && !isUp) {
          increment = -(navItems.length - 1);
        }

        nextIndex = currentIndex + increment;
        nextElement = navItems[nextIndex];
      } else {
        nextIndex = isUp ? navItems.length - 1 : 0;
        nextElement = navItems[nextIndex];
      }

      if (((_nextElement2 = nextElement) === null || _nextElement2 === void 0 ? void 0 : _nextElement2.getAttribute('aria-disabled')) === 'true') continue;

      if (nextIndex === navItems.length - 1 && onKeyToBottom) {
        onKeyToBottom();
      }

      return nextElement;
    }

    return null;
  }

  function handleArrow(type, evt) {
    evt.preventDefault();
    const nextValidElement = findNextValidOption(type);
    if (!nextValidElement) return;
    const nextOption = {
      domId: nextValidElement.id,
      value: nextValidElement.getAttribute(LISTBOX_OPTION_VALUE_ATTRIBUTE) || '',
      element: nextValidElement,
      disabled: nextValidElement.getAttribute('aria-disabled') === 'true'
    };
    handleChangeActiveOption(nextOption);
  }

  function handleDownArrow(evt) {
    handleArrow('down', evt);
  }

  function handleUpArrow(evt) {
    handleArrow('up', evt);
  }

  function handleEnter(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    if (currentActiveOption) {
      onOptionSelect(currentActiveOption);
    }
  }

  function handleFocus() {
    if (enableKeyboardControl) return;
    enableKeyboardEvents();
  }

  function handleBlur(event) {
    event.stopPropagation();

    if (keyboardEventsEnabled) {
      handleChangeActiveOption();
    }

    if (enableKeyboardControl) return;
    disableKeyboardEvents();
  }

  const listeners = keyboardEventsEnabled || textFieldFocused ? /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement(KeypressListener.KeypressListener, {
    keyEvent: "keydown",
    keyCode: types.Key.DownArrow,
    handler: handleDownArrow
  }), /*#__PURE__*/React__default['default'].createElement(KeypressListener.KeypressListener, {
    keyEvent: "keydown",
    keyCode: types.Key.UpArrow,
    handler: handleUpArrow
  }), /*#__PURE__*/React__default['default'].createElement(KeypressListener.KeypressListener, {
    keyEvent: "keydown",
    keyCode: types.Key.Enter,
    handler: handleEnter
  })) : null;
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, listeners, /*#__PURE__*/React__default['default'].createElement(VisuallyHidden.VisuallyHidden, null, /*#__PURE__*/React__default['default'].createElement("div", {
    "aria-live": "polite"
  }, loading ? loading : null)), /*#__PURE__*/React__default['default'].createElement(context.ListboxContext.Provider, {
    value: listboxContext
  }, /*#__PURE__*/React__default['default'].createElement(context.WithinListboxContext.Provider, {
    value: true
  }, children ? /*#__PURE__*/React__default['default'].createElement("ul", {
    tabIndex: 0,
    role: "listbox",
    className: listboxClassName,
    "aria-label": inCombobox ? undefined : accessibilityLabel,
    "aria-labelledby": textFieldLabelId,
    "aria-busy": Boolean(loading),
    "aria-activedescendant": currentActiveOption && currentActiveOption.domId,
    id: listId,
    onFocus: inCombobox ? undefined : handleFocus,
    onBlur: inCombobox ? undefined : handleBlur,
    ref: listboxRef
  }, children) : null)));

  function getNavigableOptions() {
    var _listboxRef$current;

    return [...new Set((_listboxRef$current = listboxRef.current) === null || _listboxRef$current === void 0 ? void 0 : _listboxRef$current.querySelectorAll(LISTBOX_OPTION_SELECTOR))];
  }
}
Listbox.Option = Option.Option;
Listbox.TextOption = TextOption.TextOption;
Listbox.Loading = Loading.Loading;
Listbox.Section = Section.Section;
Listbox.Header = Header.Header;
Listbox.Action = Action.Action;

exports.Listbox = Listbox;
exports.scrollable = scrollable;
