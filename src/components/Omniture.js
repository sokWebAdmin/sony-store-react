import useScript from 'hooks/useScript';

const Omniture = () => {
    useScript(
        // process.env.NODE_ENV === 'production'
        //    ? '//image.sony.co.kr/omniture/real/sonystore_code_2013.js'
        //    : '//image.sony.co.kr/omniture/omni_dev/sonystore_code_2013.js',
        
        // 운영에는 위에 조건문으로 반영 - 지금은 임시로 개발 링크 연동
        '//image.sony.co.kr/omniture/omni_dev/sonystore_code_2013.js'
    );

    return <></>;
};

export default Omniture;
