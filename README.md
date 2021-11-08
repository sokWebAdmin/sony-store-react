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

## 배포 가이드

현재시점에 가동중인 소니스토어 서버는 다음과 같습니다.

* 개발서버 : 222.231.53.22 [https://devstore.sony.co.kr/](https://devstore.sony.co.kr/)
* QA서버 : 222.231.53.31 [https://qastore.sony.co.kr/](https://qastore.sony.co.kr/)
* 리얼서버(이중화) : 222.231.53.32 [https://store.sony.co.kr/](https://store.sony.co.kr/)
* 리얼서버(이중화) : 222.331.53.35 [https://store.sony.co.kr/](https://store.sony.co.kr/)

총 4대 이며 배포는 sftp command 로 진행됩니다.
sftp 접근은 소니 사내에서만 가능하며 현재까지는 TeamViewer 라는 원격 솔루션으로 접근하고있습니다.

sftp 접근, TeamViewer 관련 문의 채널은 다음과 같습니다.

> 소니코리아 정지원. 010-5537-0848

현재 프론트 소스코드는 `release` 브랜치, `devstore` 브랜치로 관리되고있습니다.
jenkins 를 통해 workspace 디렉토리에 만들어진 front > build 내의 빌드 결과물을 sftp 커맨드로 교체하는 방식입니다.

### devstore 배포

* 팀뷰어에 접근하여
* jenkins front 배포 후
* 명령 프롬프트에서 다음 커맨드 입력
* `sftp sokweb1@222.231.53.22`
* `put -R C:\JENKINS_HOME\workspace\front\build /server/web`

### qastore 배포

* 팀뷰어에 접근하여
* jenkins front-real 배포 후
* 명령 프롬프트에서 다음 커맨드 입력
* `sftp sokweb1@222.231.53.31`
* `put -R C:\JENKINS_HOME\workspace\front-real\build /server/web`

### real 배포

* 팀뷰어에 접근하여
* jenkins front-real 배포 후
* 명령 프롬프트에서 다음 커맨드 입력
* `sftp sokweb1@222.231.53.32`
* `put -R C:\JENKINS_HOME\workspace\front-real\build /server/web`
* `sftp sokweb1@222.231.53.35`
* `put -R C:\JENKINS_HOME\workspace\front-real\build /server/web`

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