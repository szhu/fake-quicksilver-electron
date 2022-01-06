import { useEffect, useRef } from "react";

export default function useEventListener(
  element: HTMLElement | Window,
  eventName: keyof GlobalEventHandlersEventMap,
  handler: (event: Event) => void,
) {
  const savedHandler = useRef<(event: Event) => void>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: Event) => savedHandler.current!(event);

    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [element, eventName]);
}
