import React from 'react';
import styles from '../../FormLayout.scss.js';

function Item(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.Item
  }, props.children);
}

export { Item };
