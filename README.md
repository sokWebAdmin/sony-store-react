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

jenkins 계정, sftp 접근, TeamViewer 관련 문의 채널은 다음과 같습니다.

> 소니코리아 정지원. 010-5537-0848

현재 프론트 소스코드는 `release` 브랜치, `devstore` 브랜치로 관리되고있습니다.
jenkins 를 통해 workspace 디렉토리에 만들어진 front > build 내의 빌드 결과물을 sftp 커맨드로 교체하는 방식입니다.

### devstore 배포

* 팀뷰어에 접근하여
* jenkins front 배포 정보
    - jenkins URL : https://localhost:18080
    - front: devstore 브랜치 연결
    - front job 진입 후 `Build Now` 버튼 클릭 시 배포 실행
* jenkins 배포 완료 후 명령 프롬프트에서 다음 커맨드 입력
* `sftp sokweb1@222.231.53.22`
* `put -R C:\JENKINS_HOME\workspace\front\build /server/web`

### qastore 배포

* 팀뷰어에 접근하여
* jenkins front 배포 정보
    - jenkins URL : https://localhost:18080
    - front: devstore 브랜치 연결
    - front job 진입 후 `Build Now` 버튼 클릭 시 배포 실행
* jenkins 배포 완료 후 명령 프롬프트에서 다음 커맨드 입력
* `sftp sokweb1@222.231.53.31`
* `put -R C:\JENKINS_HOME\workspace\front-real\build /server/web`

### real 배포

* 팀뷰어에 접근하여
* jenkins front-real 배포 정보
    - jenkins URL : https://localhost:18080
    - front-real: release 브랜치 연결
    - front-real job 진입 후 `Build Now` 버튼 클릭 시 배포 실행
* jenkins 배포 완료 후 명령 프롬프트에서 다음 커맨드 입력
* `sftp sokweb1@222.231.53.32`
* `put -R C:\JENKINS_HOME\workspace\front-real\build /server/web`
* `sftp sokweb1@222.231.53.35`
* `put -R C:\JENKINS_HOME\workspace\front-real\build /server/web`
