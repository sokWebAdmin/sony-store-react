import request from 'api/request';

// profile > authentication
export const loginApi = (memberId, password, keepLogin = null) => {
    return request('oauth/token', 'post', null, {
        memberId,
        password,
        keepLogin,
        provider: 'shopbystore',
    });
};

export const joinApi = (memberId, password, name, phone, email) => {
    return request('profile', 'post', null, {
        memberId: memberId,
        password: password,
        memberName: name,
        telephoneNo: phone,
        email: email,
    });
};

export const sendSMS = (number, type, memberName = null) => {
    return request('authentications/sms', 'post', null, {
        mobileNo: number,
        usage: type,
        memberName,
    });
};

export const verifySMS = (mobileNo, key, usage, memberName) => {
    const query = { mobileNo, key, usage };

    return request(
        'authentications/sms',
        'get',
        memberName ? { ...query, memberName } : query,
        null,
    );
};

export const getOauthOpenId = (query) => {
    return request('oauth/openid', 'get', query);
};
