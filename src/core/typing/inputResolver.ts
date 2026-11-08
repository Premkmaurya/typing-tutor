import { ModifierState } from '../../types/keyboard.types';
import { TypingInput } from '../../types/typing.types';

/**
 * Normalizes a physical browser KeyboardEvent into a unified TypingInput event.
 */
export function normalizePhysicalEvent(
  e: KeyboardEvent | React.KeyboardEvent
): TypingInput {
  const shift = e.shiftKey;
  const ctrl = e.ctrlKey;
  const alt = e.altKey;
  const meta = e.metaKey;
  const capsLock = e.getModifierState ? e.getModifierState('CapsLock') : false;
  const altGraph = e.getModifierState ? e.getModifierState('AltGraph') : false;

  return {
    code: e.code,
    key: e.key,
    modifiers: {
      shift,
      ctrl,
      alt,
      meta,
      altGraph,
      capsLock,
    },
    source: 'physical',
  };
}

/**
 * Normalizes a virtual keyboard on-screen button click into a unified TypingInput event.
 */
export function normalizeVirtualEvent(
  code: string,
  activeModifiers: ModifierState
): TypingInput {
  return {
    code,
    key: '',
    modifiers: {
      shift: Boolean(activeModifiers.shift),
      ctrl: false,
      alt: false,
      meta: false,
      altGraph: Boolean(activeModifiers.altGr),
      capsLock: Boolean(activeModifiers.capsLock),
    },
    source: 'virtual',
  };
}
