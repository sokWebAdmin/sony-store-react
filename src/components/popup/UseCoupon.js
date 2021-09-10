import LayerPopup from '../common/LayerPopup';

const UseCoupon = ({ setVisible }) => {
  const close = () => setVisible(false);

  return (
    <LayerPopup className="find_address" onClose={close}>
      <h1>
        TODO: 쿠폰 팝업
      </h1>
    </LayerPopup>
  );
};

export default UseCoupon;