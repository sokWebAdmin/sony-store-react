import useScript from 'hooks/useScript';

const Omniture = () => {
    useScript(
        process.env.NODE_ENV === 'production'
            ? '//image.sony.co.kr/omniture/real/sonystore_code_2013.js'
            : '//image.sony.co.kr/omniture/omni_dev/sonystore_code_2013.js',
    );

    return <></>;
};

export default Omniture;
