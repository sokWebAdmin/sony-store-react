# SonyStore Front - React

## local 개발 환경 실행

하기와 같은 커맨드를 입력합니다.

### React App

```zsh
yarn && yarn start
```

### Markup 확인

```
yarn markup
```

## build

```
yarn build
```

상기 명령어를 입력하면 root 디렉토리 하위에 dist 디렉토리가 생성됩니다.

dist 하위 자산과 함께 index.html 을 web server 를 통해 서빙하시면 됩니다. 

### Alert

```jsx
  // alert 상태관리
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const openAlert = (message) => {
    setAlertVisible(true);
    setAlertMessage(message);
  }
  const closeModal = () => {
    setAlertVisible(false);
  }

  // alert open 시점에 호출
  openAlert('인증되었습니다.');

  // 템플릿 적용하기  
  const MyComponent = () => {
      return (
          <>
            {alertVisible && <Alert onClose={closeModal}>{alertMessage}</Alert>}
            {/*   컴포넌트 내부 마크업   */}
          </>
      );
  };
```

### Confirm

```jsx
  // confirm 상태관리
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');

  const openConfirm = (message) => {
    setConfirmVisible(true);
    setConfirmMessage(message);
  }
  const closeConfirm = (status) => {
    setConfirmVisible(false);
    if (status === 'ok') {
      console.log('성공');
    } else if (status === 'cancel') {
      console.log('취소');
    }
  }

  // confirm open 시점에 호출
  openConfirm('정말 삭제하시겠습니까?');

  // 템플릿 적용하기  
  const MyComponent = () => {
      return (
          <>
            {confirmVisible && <Confirm onClose={closeConfirm}>{confirmMessage}</Confirm>}
            {/*   컴포넌트 내부 마크업   */}
          </>
      );
  };
```

### LayerPopup

```jsx
 // LayerPopup 상태관리
  const [test, setTest] = useState(true)
  const close = () => {
    setTest(false);
  }
  const nonMemberOrder = () => {
    console.log('비회원 구매');
    close();
 }
  const memberOrder = () => {
    console.log('회원 구매');
    close();
 }

  // 템플릿 적용하기  
  const MyComponent = () => {
      return (
          <>
          {test&& <LayerPopup className="login_chk_order" onClose={close}>
            <>
              <p className="pop_tit">로그인 후 주문해주세요.</p>
              <p className="pop_txt">소니스토어 회원으로 로그인 하시고 다양한 멤버십 혜택을 누리세요!
                비회원으로 제품을 구매하시면 소니스토어의 쿠폰 및 마일리지 적립 혜택을 받으실 수 없습니다. </p>
              <div className="btn_article">
                <button className="button button_negative button-m closed" type="button" onClick={nonMemberOrder}>비회원 구매</button>
                <button className="button button_positive button-m" type="button" onClick={memberOrder}>회원 구매</button>
              </div>
            </>
          </LayerPopup>}
            {/*   컴포넌트 내부 마크업   */}
          </>
      );
  };
```