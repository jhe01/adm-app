import { Component, Children } from "react";
import PropTypes from "prop-types";
import deepstream from "deepstream.io-client-js";

export function createDeepstream() {
  class Deepstream extends Component {
    constructor(props, context) {
      super(props, context);
      this.client = deepstream(props.url, props.options).login();
    }

    getChildContext() {
      return { client: this.client };
    }

    render() {
      return Children.only(this.props.children);
    }
  }

  Deepstream.propTypes = {
    url: PropTypes.string.isRequired,
    options: PropTypes.object,
    children: PropTypes.element.isRequired
  };

  Deepstream.childContextTypes = {
    client: PropTypes.any.isRequired
  };

  Deepstream.displayName = "Deepstream";

  return Deepstream;
}

export default createDeepstream();
