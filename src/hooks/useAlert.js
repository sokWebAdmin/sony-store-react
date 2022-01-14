import { useState } from 'react';

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
