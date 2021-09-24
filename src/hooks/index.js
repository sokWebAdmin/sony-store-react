import { useCallback, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const useToggle = (initial) => {
  const [toggleValue, setToggleValue] = useState(initial);

  const toggle = useCallback(newValue => {
    setToggleValue((prevState) => newValue !== undefined ? newValue : !prevState);
  }, []);

  return [toggleValue, toggle];
};

export const useAlert = (initial) => {
  initial = initial ?? {
    visible: false,
    message: '',
  };

  const [alertVisible, setAlertVisible] = useState(initial.visible);
  const [alertMessage, setAlertMessage] = useState(initial.message);
  const [alertCloseFn, setAlertCloseFn] = useState(null);

  const openAlert = (message, onClose) => {
    setAlertVisible(true);
    setAlertMessage(message);
    onClose && setAlertCloseFn(onClose);
  };

  const closeModal = () => {
    setAlertVisible(false);
    alertCloseFn?.();
  };

  return {
    openAlert,
    closeModal,
    alertVisible,
    alertMessage,
  };
};

export const useQuery = () => new URLSearchParams(useLocation().search);

export default function useDebounce (value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Set debouncedValue to value (passed in) after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Return a cleanup function that will be called every time ...
      // ... useEffect is re-called. useEffect will only be re-called ...
      // ... if value changes (see the inputs array below).
      // This is how we prevent debouncedValue from changing if value is ...
      // ... changed within the delay period. Timeout gets cleared and
      // restarted. To put it in context, if the user is typing within our
      // app's ... ... search box, we don't want the debouncedValue to update
      // until ... ... they've stopped typing for more than 500ms.
      return () => {
        clearTimeout(handler);
      };
    },
    // Only re-call effect if value changes
    // You could also add the "delay" var to inputs array if you ...
    // ... need to be able to change that dynamically.
    [value],
  );

  return debouncedValue;
}
export const useMediaQuery = (query) => {
  const mediaMatch = window.matchMedia(query);
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = e => setMatches(e.matches);
    mediaMatch.addEventListener('change', handler);
    return () => mediaMatch.addEventListener('change', handler);
  });
  return matches;
};

export function usePrevious (value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const useScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  const handleScroll = () => setScrollY(window.pageYOffset);
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    const watch = () => window.addEventListener('scroll', handleScroll);
    requestAnimationFrame(watch);
    watch();
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  });

  return {
    scrollY,
    handleTop
  }
}