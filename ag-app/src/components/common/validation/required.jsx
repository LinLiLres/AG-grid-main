import React, { Component, createRef } from 'react';

const KEY_ENTER = 'Enter';
const KEY_BACKSPACE = 'Backspace';

export default class Required extends Component {
  constructor(props) {
    super(props);
    this.state = this.createInitialState(props);

    this.onKeyDown = this.onKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <input
        ref={this.inputRef}
        value={this.state.value}
        onKeyDown={this.onKeyDown}
        onChange={this.handleChange}
        style={{ width: '100%' }}
      />
    );
  }

  getValue() {
    return this.state.value;
  }

  isCancelBeforeStart() {
    return this.cancelBeforeStart;
  }

  isEmpty(val) {
  return val === undefined || val === null || val === '';
}

  isCancelAfterEnd() {
    let value = this.getValue();
      if(this.isEmpty(value)) {
        return true;
      }
      return false;
  }

  createInitialState(props) {
    let startValue;
    let highlightAllOnFocus = true;

    if (props.charPress) {
      startValue = props.charPress;
      highlightAllOnFocus = false;
    } else {
      startValue = props.value;
    }

    return {
      value: startValue,
      highlightAllOnFocus,
    };
  }

  onKeyDown(event) {
    if (
      !this.finishedEditingPressed(event) &&
      !this.isKeyPressedString(event)
    ) {
      if (event.preventDefault) event.preventDefault();
    }
  }


  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  isCharString(charStr) {
    console.log(typeof charStr);
    if (typeof charStr === 'string') {
      return true
    }
    else if (typeof charStr !== 'string') {
       return false
     }
  }

  isKeyPressedString(event) {
    const charStr = event.key;
    console.log(this.isCharString(charStr))
    return this.isCharString(charStr);
  }

  finishedEditingPressed(event) {
    const key = event.key;
    return key === KEY_ENTER;
  }

}
