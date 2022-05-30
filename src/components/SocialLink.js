import { memo } from 'react';
import PropTypes from 'prop-types';

const SocialLink = ({ url, img, name }) => (
    <a
        href={url}
        onClick={window.openBrowser}
        target='_blank'
        rel='noopener noreferrer'
        className='footer__social__link'
    >
        <img src={img} alt={name} />
    </a>
);
SocialLink.propTypes = {
    url: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default memo(SocialLink);
