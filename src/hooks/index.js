import { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useToggle = (initial) => {
  const [toggleValue, setToggleValue] = useState(initial);

  const toggle = useCallback(() => {
    setToggleValue((prevState) => !prevState);
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
