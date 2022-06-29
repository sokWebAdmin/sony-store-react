import { memo } from 'react';
import PropTypes from 'prop-types';

const EventTopContent = ({ url, type }) => (
    <>
        {type === 'FILE' ? (
            <img src={url} alt='' style={{ width: '100%' }} />
        ) : (
            <div dangerouslySetInnerHTML={{ __html: url }} />
        )}
    </>
);

EventTopContent.propTypes = {
    url: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default memo(EventTopContent);
