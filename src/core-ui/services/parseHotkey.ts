// Imported from https://mantine.dev/

const keyNameMap: Record<string, string> = {
  ' ': 'space',
  ArrowLeft: 'arrowleft',
  ArrowRight: 'arrowright',
  ArrowUp: 'arrowup',
  ArrowDown: 'arrowdown',
  Escape: 'escape',
  Enter: 'enter',
  Tab: 'tab',
  Backspace: 'backspace',
  Delete: 'delete',
  Insert: 'insert',
  Home: 'home',
  End: 'end',
  PageUp: 'pageup',
  PageDown: 'pagedown',
  '+': 'plus',
  '-': 'minus',
  '*': 'asterisk',
  '/': 'slash',
};

const normalizeKey = (key: string) => {
  const lowerKey = key.replace('Key', '').toLowerCase();

  return keyNameMap[key] || lowerKey;
};

interface Hotkey {
  alt: boolean;
  ctrl: boolean;
  meta: boolean;
  mod: boolean;
  shift: boolean;
  key: string | undefined;
}

const parseHotkey = (hotkey: string): Hotkey => {
  const keys = hotkey
    .toLowerCase()
    .split('+')
    .map((part) => part.trim());

  const modifiers = {
    alt: keys.includes('alt'),
    ctrl: keys.includes('ctrl'),
    meta: keys.includes('meta'),
    mod: keys.includes('mod'),
    shift: keys.includes('shift'),
  };

  const reservedKeys = ['alt', 'ctrl', 'meta', 'shift', 'mod'];
  const freeKey = keys.find((key) => !reservedKeys.includes(key));

  return {
    ...modifiers,
    key: freeKey === '[plus]' ? '+' : freeKey,
  };
};

const isExactHotkey = (hotkey: Hotkey, event: KeyboardEvent, usePhysicalKeys?: boolean) => {
  const { alt, ctrl, meta, mod, shift, key } = hotkey;
  const { altKey, ctrlKey, metaKey, shiftKey, key: pressedKey, code: pressedCode } = event;

  if (alt !== altKey) {
    return false;
  }

  if (mod) {
    if (!ctrlKey && !metaKey) {
      return false;
    }
  } else {
    if (ctrl !== ctrlKey) {
      return false;
    }
    if (meta !== metaKey) {
      return false;
    }
  }

  if (shift !== shiftKey) {
    return false;
  }

  if (key) {
    if (
      usePhysicalKeys
        ? normalizeKey(pressedCode) === normalizeKey(key)
        : normalizeKey(pressedKey || pressedCode) === normalizeKey(key)
    ) {
      return true;
    }

    return false;
  }

  return true;
};

export const getHotkeyMatcher = (hotkey: string, usePhysicalKeys?: boolean) => {
  return (event: KeyboardEvent) => isExactHotkey(parseHotkey(hotkey), event, usePhysicalKeys);
};

export interface HotkeyItemOptions {
  preventDefault?: boolean;
  usePhysicalKeys?: boolean;
}

export type HotkeyItem = [string, (event: KeyboardEvent) => void, HotkeyItemOptions?];

export const getHotkeyHandler = (hotkeys: HotkeyItem[]) => {
  return (event: React.KeyboardEvent | KeyboardEvent) => {
    const nativeEvent = (event as React.KeyboardEvent).nativeEvent || event;
    hotkeys.forEach(
      ([hotkey, handler, options = { preventDefault: true, usePhysicalKeys: false }]) => {
        if (getHotkeyMatcher(hotkey, options.usePhysicalKeys)(nativeEvent as KeyboardEvent)) {
          if (options.preventDefault) {
            event.preventDefault();
          }
          handler(nativeEvent as KeyboardEvent);
        }
      },
    );
  };
};
