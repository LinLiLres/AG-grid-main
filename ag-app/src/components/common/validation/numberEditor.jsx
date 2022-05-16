import React, { Component, createRef } from 'react';


const KEY_ENTER = 'Enter';
const KEY_BACKSPACE = 'Backspace';

export default class NumericEditor extends Component {
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

  /* Component Editor Lifecycle methods */

  // the final value to send to the grid, on completion of editing
  getValue() {
    return this.state.value;
  }

  // Gets called once before editing starts, to give editor a chance to
  // cancel the editing before it even starts.
  isCancelBeforeStart() {
    return this.cancelBeforeStart;
  }

  // Gets called once when editing is finished (eg if Enter is pressed).
  // If you return true, then the result of the edit will be ignored.
  isCancelAfterEnd() {
    return this.state.value === undefined || this.state.value === null || this.state.value === '';
  }

  isEmpty(val) {
  return val === undefined || val === null || val === '';
}

  /* Utility methods */
  createInitialState(props) {
    let startValue;
    let highlightAllOnFocus = true;

    if (props.charPress) {
      // if a letter was pressed, we start with the letter
      startValue = props.charPress;
      highlightAllOnFocus = false;
    } else {
      // otherwise we start with the current value
      startValue = props.value;
    }

    return {
      value: startValue,
      highlightAllOnFocus,
    };
  }

  onKeyDown(event) {
    if ( this.deleteOrBackspace(event)) {
      event.stopPropagation();
      return;
    }

    if (
      !this.finishedEditingPressed(event) &&
      !this.isKeyPressedNumeric(event)
    ) {
      if (event.preventDefault) event.preventDefault();
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  isCharNumeric(charStr) {
    return !!/\d/.test(charStr);
  }

  isKeyPressedNumeric(event) {
    const charStr = event.key;
    return this.isCharNumeric(charStr);
  }

  deleteOrBackspace(event) {
    return [KEY_BACKSPACE].indexOf(event.key) > -1;
  }


  finishedEditingPressed(event) {
    const key = event.key;
    return key === KEY_ENTER;
  }


}
