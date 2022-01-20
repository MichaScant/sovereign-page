'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

// see https://github.com/oliviertassinari/react-event-listener/
class EventListener extends React.PureComponent {
  componentDidMount() {
    this.attachListener();
  }

  componentDidUpdate({
    passive,
    ...detachProps
  }) {
    this.detachListener(detachProps);
    this.attachListener();
  }

  componentWillUnmount() {
    this.detachListener();
  }

  render() {
    return null;
  }

  attachListener() {
    const {
      event,
      handler,
      capture,
      passive
    } = this.props;
    window.addEventListener(event, handler, {
      capture,
      passive
    });
  }

  detachListener(prevProps) {
    const {
      event,
      handler,
      capture
    } = prevProps || this.props;
    window.removeEventListener(event, handler, capture);
  }

}

exports.EventListener = EventListener;
