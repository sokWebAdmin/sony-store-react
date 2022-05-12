import { useState, useEffect } from 'react';

const useScript = (src) => {
    const [status, setStatus] = useState(src ? 'loading' : 'idle');

    useEffect(
        () => {
            if (!src) {
                setStatus('idle');
                return;
            }

            // Fetch existing script element by src
            // It may have been added by another instance of this hook
            let script = document.querySelector(`script[src="${src}"]`);

            if (!script) {
                // Create script
                script = document.createElement('script');
                script.src = src;
                script.async = true;
                script.setAttribute('data-status', 'loading');

                // Add script to document body
                document.body.appendChild(script);

                // Store status in attribute on script
                // This can be read by other instances of this hook
                const setAttributeFromEvent = (event) => {
                    script?.setAttribute(
                        'data-status',
                        event.type === 'load' ? 'ready' : 'error',
                    );
                };

                script.addEventListener('load', setAttributeFromEvent);
                script.addEventListener('error', setAttributeFromEvent);
            } else {
                // Grab existing script status from attribute and set to state.
                setStatus(script.getAttribute('data-status'));
            }

            // Script event handler to update status in state
            // Note: Even if the script already exists we still need to add
            // event handlers to update the state for *this* hook instance.
            const setStateFromEvent = (event) => {
                setStatus(event.type === 'load' ? 'ready' : 'error');
            };

            // Add event listeners
            window.addEventListener('load', () => {
                script.addEventListener('load', setStateFromEvent);
                script.addEventListener('error', setStateFromEvent);
            });

            // Remove event listeners on cleanup
            return () => {
                if (script) {
                    window.removeEventListener('load', () => {
                        script.removeEventListener('load', setStateFromEvent);
                        script.removeEventListener('error', setStateFromEvent);
                    });
                    script.remove();
                }
            };
        },

        [src], // Only re-run effect if script src changes
    );

    return status;
};

export default useScript;
