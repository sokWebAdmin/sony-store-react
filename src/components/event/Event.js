import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const Event = ({ event, onClickEventDetail, openShareEventLayer }) => {
    const {
        eventNo,
        label,
        pcImageUrl,
        startYmdt,
        endYmdt,
        tag,
        displayPeriodType,
    } = event;

    return (
        <div
            className='event_item'
            key={eventNo}
            onClick={() => {
                onClickEventDetail(eventNo, tag, event);
            }}
        >
            <div className='img'>
                <img src={pcImageUrl} alt={label} />
            </div>
            <div className='event_desc'>
                <p className='tit'>{label}</p>
                <p className='event_duration'>
                    {displayPeriodType === 'PERIOD'
                        ? `${dayjs(startYmdt).format('YYYY-MM-DD')} ~ ${dayjs(
                              endYmdt,
                          ).format('YYYY-MM-DD')}`
                        : `${dayjs(startYmdt).format(
                              'YYYY-MM-DD',
                          )} ~ 재고 소진 시`}
                </p>
            </div>
            <button
                className='event_share popup_comm_btn'
                onClick={(e) => {
                    e.stopPropagation();
                    e.nativeEvent.stopPropagation();
                    openShareEventLayer(eventNo, label, tag, event);
                }}
            >
                공유하기
            </button>
        </div>
    );
};

Event.propTypes = {
    event: PropTypes.shape({
        eventNo: PropTypes.number,
        label: PropTypes.string,
        url: PropTypes.string,
        urlType: PropTypes.string,
        displayPeriodType: PropTypes.string,
        startYmdt: PropTypes.string,
        endYmdt: PropTypes.string,
        pcImageUrl: PropTypes.string,
        mobileimageUrl: PropTypes.string,
        promotionText: PropTypes.string,
        tag: PropTypes.string,
        eventYn: PropTypes.string,
    }).isRequired,
    onClickEventDetail: PropTypes.func.isRequired,
    openShareEventLayer: PropTypes.func.isRequired,
};

export default Event;
