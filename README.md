# SonyStore Front(React)
Final 공유용 버전

## 임시 코멘트 (0825)
```zsh
현재 2가지 이슈 있는 상태입니다.
- scss
페이지별로 scss 분리되어 처리되지 않아, 곳곳이 깨지는 이슈를 해결중에 있습니다.
각 페이지 내에 최상위 div 추가 및 class 삽입, sub 개념의 scss 파일 내부에 important 추가 등 작업으로 해결 가능하며,
해당 부분 해결하여 금일 내에 다시한번 올릴 예정입니다.

- recommend
scrollMagic 라이브러리 충돌 이슈로 해당 페이지만 별도로 일부 재작업중이며,
merge 후 scss 이슈 해결과 함께 금일 같이 올릴 예정입니다.

참고 부탁드립니다.

```

## local start

```zsh
yarn install && yarn start
```

## published directory start
npx 커맨드로 다음과 같이 실행가능. 

``` zsh
cd published && npx lite-server index.html
```


