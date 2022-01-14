import { useState } from 'react';

// TODO: derived state를 사용하고 있으므로 source of truth가 아님!
export const useAlert = ({ visible = false, message = '' }) => {
    const [alertVisible, setAlertVisible] = useState(visible);
    const [alertMessage, setAlertMessage] = useState(message);
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
