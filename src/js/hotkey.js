import codeToString from "keycode";

class Hotkey {
  constructor(keys) {
    this.keys = keys;
  }

  static default() {
    return new Hotkey({ keyCode: 32 });
  }

  static keysFromEvent({ keyCode, ctrlKey, altKey, shiftKey, metaKey }) {
    const keys = { ctrlKey, altKey, shiftKey, metaKey };
    if (![16, 17, 18, 91].includes(keyCode)) {
      keys.keyCode = keyCode;
    }
    return keys;
  }

  static fromEvent(event) {
    return new Hotkey(Hotkey.keysFromEvent(event));
  }

  keyStrings() {
    return [
      this.keys.ctrlKey && "Control",
      this.keys.altKey && "Alt",
      this.keys.shiftKey && "Shift",
      this.keys.metaKey && "Command",
      this.keys.keyCode && codeToString(this.keys.keyCode),
    ].filter((v) => v);
  }

  display() {
    return this.keyStrings()
      .map((key) => `<kbd>${key}</kbd>`)
      .join(" + ");
  }

  matchKeydown(event) {
    return (
      this.keys.ctrlKey == event.ctrlKey &&
      this.keys.altKey == event.altKey &&
      this.keys.shiftKey == event.shiftKey &&
      this.keys.metaKey == event.metaKey &&
      (this.keys.keyCode == event.keyCode ||
        ([16, 17, 18, 91].includes(event.keyCode) &&
          this.keys.keyCode === undefined))
    );
  }

  matchKeyup(event) {
    if (this.keys.keyCode && this.keys.keyCode == event.keyCode) {
      return true;
    }

    return (
      (this.keys.ctrlKey && !event.ctrlKey) ||
      (this.keys.altKey && !event.altKey) ||
      (this.keys.shiftKey && !event.shiftKey) ||
      (this.keys.metaKey && !event.metaKey)
    );
  }
}

export default Hotkey;
