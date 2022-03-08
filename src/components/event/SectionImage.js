import { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDiv = styled.div`
    position: relative;
    max-width: ${({ onlyMo }) => (onlyMo ? '760px' : '1200px')};
    margin: 0 auto;
    padding-top: 40px;

    > img {
        width: 100%;
    }
`;
const SectionImage = ({ onlyMo, imageUrl }) => {
    return (
        <StyledDiv onlyMo={onlyMo}>
            <img src={imageUrl} alt='' />
        </StyledDiv>
    );
};

SectionImage.propTypes = {
    onlyMo: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string.isRequired,
};

export default memo(SectionImage);
