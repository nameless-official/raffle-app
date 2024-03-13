const specialKeysBlacklist = [
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Tab",
  "Escape",
  "Home",
  "End",
  "PageUp",
  "PageDown",
  "Insert",
  "Delete",
  "CapsLock",
  "Control",
  "Alt",
  "Shift",
  "Meta",
  "ContextMenu",
  "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12",
  "NumLock",
  "PrintScreen",
  "ScrollLock",
  "Pause",
];

export const validateKeyForSearch = (key: string) => {
  return !specialKeysBlacklist.includes(key)
}
