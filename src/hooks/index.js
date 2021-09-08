import { useCallback, useState } from "react"

export const useToggle = initial => {
  const [toggleValue, setToggleValue] = useState(initial);

  const toggle = useCallback(() => {
    setToggleValue(prevState => !prevState);
  }, [ ])
  
  return [toggleValue, toggle];
}

export const useAlert = initial => {
  initial = initial ?? {
    visible: false,
    message: '',
  };

  const [alertVisible, setAlertVisible] = useState(initial.visible);
  const [alertMessage, setAlertMessage] = useState(initial.message);

  const openAlert = (message) => {
    setAlertVisible(true);
    setAlertMessage(message);
  };

  const closeModal = () => {
    setAlertVisible(false);
  };

  return {
    openAlert, closeModal, alertVisible, alertMessage
  };
}

