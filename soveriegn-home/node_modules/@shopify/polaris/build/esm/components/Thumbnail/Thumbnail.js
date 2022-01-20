import React from 'react';
import { classNames, variationName } from '../../utilities/css.js';
import styles from './Thumbnail.scss.js';
import { Image } from '../Image/Image.js';
import { Icon } from '../Icon/Icon.js';

function Thumbnail({
  source,
  alt,
  size = 'medium'
}) {
  const className = classNames(styles.Thumbnail, size && styles[variationName('size', size)]);
  const content = typeof source === 'string' ? /*#__PURE__*/React.createElement(Image, {
    alt: alt,
    source: source
  }) : /*#__PURE__*/React.createElement(Icon, {
    accessibilityLabel: alt,
    source: source
  });
  return /*#__PURE__*/React.createElement("span", {
    className: className
  }, content);
}

export { Thumbnail };
