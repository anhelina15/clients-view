// Imported from https://mantine.dev/
import { useEffect } from 'react';

import { getHotkeyMatcher } from '../services/parseHotkey';

export type HotkeyItem = [
  string,
  (event: KeyboardEvent) => void,
  { preventDefault?: boolean; usePhysicalKeys?: boolean }?,
];

const shouldFireEvent = (
  event: KeyboardEvent,
  tagsToIgnore: string[],
  triggerOnContentEditable = false,
) => {
  if (event.target instanceof HTMLElement) {
    if (triggerOnContentEditable) {
      return !tagsToIgnore.includes(event.target.tagName);
    }

    return !event.target.isContentEditable && !tagsToIgnore.includes(event.target.tagName);
  }

  return true;
};

export const useHotkeys = (
  hotkeys: HotkeyItem[],
  tagsToIgnore: string[] = ['INPUT', 'TEXTAREA', 'SELECT'],
  triggerOnContentEditable = false,
) => {
  useEffect(() => {
    const keydownListener = (event: KeyboardEvent) => {
      if (event.repeat || event.defaultPrevented) {
        return;
      }

      hotkeys.forEach(
        ([hotkey, handler, options = { preventDefault: true, usePhysicalKeys: false }]) => {
          if (
            getHotkeyMatcher(hotkey, options.usePhysicalKeys)(event) &&
            shouldFireEvent(event, tagsToIgnore, triggerOnContentEditable)
          ) {
            if (options.preventDefault) {
              event.preventDefault();
            }
            handler(event);
          }
        },
      );
    };

    document.documentElement.addEventListener('keydown', keydownListener);

    return () => {
      document.documentElement.removeEventListener('keydown', keydownListener);
    };
  }, [hotkeys, tagsToIgnore, triggerOnContentEditable]);
};
