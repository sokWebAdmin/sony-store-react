import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { parse } from 'qs';

import Alert from 'components/common/Alert';
import { getOpenIdProfile } from 'api/sony/member';
import { getItem, KEY, setItem } from 'utils/token';
import { getAgent } from 'utils/detectAgent';

const Callback = () => {
    console.log('callback');
    // alert
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertCloseFunc, setAlertCloseFun] = useState(null);
    const history = useHistory();
    const query = parse(history.location.search, { ignoreQueryPrefix: true });
    console.log('🚀 ~ file: Callback.js ~ line 19 ~ Callback ~ query', query);

    const openAlert = (message, onClose) => {
        setAlertVisible(true);
        setAlertMessage(message);
        setAlertCloseFun(onClose);
    };

    const closeModal = () => {
        setAlertVisible(false);
        alertCloseFunc?.();
    };

    useEffect(() => {
        // processAuthCallback();
        (async () => {
            const shopOauthCallback = window?.opener?.shopOauthCallback;
            const agent = getAgent();
            const code = query.code;
            const state = getItem(KEY.OPENID_TOKEN);
            const redirectedProvider = getItem(KEY.OPENID_PROVIDER);

            if (!code || !state || !redirectedProvider) {
                openAlert('인증 정보가 만료되었습니다.', () => () => {
                    window.openWindow(
                        `javascript:void(0)`,
                        '',
                        '',
                        'verification_close',
                    );
                });
                return;
            }

            const { data: openIdProfile } = await getOpenIdProfile({
                code,
                state,
                servicesite: {
                    snsinfo: redirectedProvider.substring(0, 1).toUpperCase(),
                },
            });
            console.log(
                '🚀 ~ file: Callback.js ~ line 54 ~ processAuthCallback ~ openIdProfile',
                openIdProfile,
            );
            const accessCode = ['0000', '3000', '3001', '3002', '3012'];
            if (accessCode.includes(openIdProfile.errorCode)) {
                if (!agent.isApp) {
                    shopOauthCallback?.(openIdProfile.errorCode, {
                        ...openIdProfile.body,
                        code,
                        state,
                        redirectedProvider,
                    });
                    window.close();
                } else {
                    setItem('openIdProfile', openIdProfile);
                    window.openWindow(
                        `javascript:window.location.replace('${
                            getItem('currentPath') + '?callback=true'
                        }')`,
                        '',
                        '',
                        'verification_close',
                    );
                }
                window.close();
            } else {
                openAlert(openIdProfile.errorMessage, () => () => {
                    if (!agent.isApp) {
                        window.close();
                    } else {
                        window.openWindow(
                            `javascript:void(0)`,
                            '',
                            '',
                            'verification_close',
                        );
                    }
                });
            }
        })();
    }, [query]);

    return (
        <>
            {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
        </>
    );
};

export default Callback;
