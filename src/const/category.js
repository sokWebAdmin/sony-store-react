const tagColorMap = {
  NEW: '#FF4E00',
  BEST: '#5865F5',
  HOT: '#E70000',
  EVENT: '#222222',
  'A급': '#C55AFF',
  'B급': '#39BFC9',
  'C급': '#E70000',
};

const categoriesExtraDataMap = [];
let espCategoryNo = 60918;

// TODO real 인 경우에 대한 하드코딩 데이터 필요
// TODO bannerSectionCodes 데이터 확인해야함 (최상위 부모 (카메라 같은) 카테고리만 bannerSectionCodes 를 가짐)
if (process.env.NODE_ENV === 'development') {
  // 카메라
  categoriesExtraDataMap.push({
    categoryNo: 60859,
    url: '/products/camera',
    bannerSectionCodes: '008',
    isAvailableMoveESP: true,
    isAvailableMoveProductCompare: true
  });
  // 카메라 > 렌즈교환식카메라
  categoriesExtraDataMap.push({
    categoryNo: 60860,
    url: '/products/camera/lens',
  });
  // 카메라 > 렌즈교환식카메라 > 카메라
  categoriesExtraDataMap.push({
    categoryNo: 60863,
    url: '/products/camera/lens/camera',
  });
  // 카메라 > 렌즈교환식카메라 > 렌즈
  categoriesExtraDataMap.push({
    categoryNo: 60864,
    url: '/products/camera/lens/lens',
  });
  // 카메라 > 컴팩트카메라
  categoriesExtraDataMap.push({
    categoryNo: 60862,
    url: '/products/camera/compact',
  });

  // 비디오 카메라
  categoriesExtraDataMap.push({
    categoryNo: 60865,
    url: '/products/videocamera',
    bannerSectionCodes: '000',
    isAvailableMoveESP: true,
    isAvailableMoveProductCompare: true
  });
  // 비디오 카메라 > 시네마라인카메라
  categoriesExtraDataMap.push({
    categoryNo: 60866,
    url: '/products/videocamera/cinema',
  });
  // 비디오 카메라 > 캠코더
  categoriesExtraDataMap.push({
    categoryNo: 60867,
    url: '/products/videocamera/camcoder',
  });
  // 비디오 카메라 > 캠코더 > 4K 핸디캠
  categoriesExtraDataMap.push({
    categoryNo: 60869,
    url: '/products/videocamera/camcoder/4k-handy',
  });
  // 비디오 카메라 > 캠코더 > HD 핸디캠
  categoriesExtraDataMap.push({
    categoryNo: 60870,
    url: '/products/videocamera/camcoder/hd-handy',
  });
  // 비디오 카메라 > 액션캠
  categoriesExtraDataMap.push({
    categoryNo: 60868,
    url: '/products/videocamera/action',
  });

  // 오디오
  categoriesExtraDataMap.push({
    categoryNo: 60871,
    url: '/products/audio',
    bannerSectionCodes: '000',
    isAvailableMoveProductCompare: true
  });
  // 오디오 > 헤드폰/이어폰
  categoriesExtraDataMap.push({
    categoryNo: 60872,
    url: '/products/audio/headphone',
  });
  // 오디오 > 헤드폰/이어폰 > 무선 이어폰
  categoriesExtraDataMap.push({
    categoryNo: 60876,
    url: '/products/audio/headphone/wireless',
  });
  // 오디오 > 헤드폰/이어폰 > 유선 이어폰
  categoriesExtraDataMap.push({
    categoryNo: 60877,
    url: '/products/audio/headphone/wired',
  });
  // 오디오 > 헤드폰/이어폰 > 헤드폰 엠프
  categoriesExtraDataMap.push({
    categoryNo: 60878,
    url: '/products/audio/headphone/amp',
  });
  // 오디오 > 스피커
  categoriesExtraDataMap.push({
    categoryNo: 60873,
    url: '/products/audio/speaker',
  });
  // 오디오 > 스피커 > 무선 스피커
  categoriesExtraDataMap.push({
    categoryNo: 60879,
    url: '/products/audio/speaker/wireless',
  });
  // 오디오 > 스피커 > 카오디오
  categoriesExtraDataMap.push({
    categoryNo: 60880,
    url: '/products/audio/speaker/car',
  });
  // 오디오 > 홈오디오
  categoriesExtraDataMap.push({
    categoryNo: 60874,
    url: '/products/audio/homeaudio',
  });
  // 오디오 > 워크맨/녹음기
  categoriesExtraDataMap.push({
    categoryNo: 60875,
    url: '/products/audio/recorder',
  });
  // 오디오 > 워크맨/녹음기 > MP3플레이어
  categoriesExtraDataMap.push({
    categoryNo: 60881,
    url: '/products/audio/recorder/mp3',
  });
  // 오디오 > 워크맨/녹음기 > 녹음기
  categoriesExtraDataMap.push({
    categoryNo: 60882,
    url: '/products/audio/recorder/recorder',
  });

  // 액세서리
  categoriesExtraDataMap.push({
    categoryNo: 60883,
    url: '/products/accessory',
    bannerSectionCodes: '000',
    isAvailableMoveAccessoryCompatibility: true
  });
  // 액세서리 > 카메라 액세서리
  categoriesExtraDataMap.push({
    categoryNo: 60884,
    url: '/products/accessory/camera',
  });
  // 액세서리 > 카메라 액세서리 > 메모리카드/SSD
  categoriesExtraDataMap.push({
    categoryNo: 60886,
    url: '/products/accessory/camera/memory',
  });
  // 액세서리 > 카메라 액세서리 > 배터리,충전기/어댑터
  categoriesExtraDataMap.push({
    categoryNo: 60887,
    url: '/products/accessory/camera/battery',
  });
  // 액세서리 > 카메라 액세서리 > 세로 그립
  categoriesExtraDataMap.push({
    categoryNo: 60888,
    url: '/products/accessory/camera/vertical-grip',
  });
  // 액세서리 > 카메라 액세서리 > 플래시/조명
  categoriesExtraDataMap.push({
    categoryNo: 60889,
    url: '/products/accessory/camera/flash',
  });
  // 액세서리 > 카메라 액세서리 > 마이크
  categoriesExtraDataMap.push({
    categoryNo: 60890,
    url: '/products/accessory/camera/mic',
  });
  // 액세서리 > 카메라 액세서리 > 뷰파인더/모니터
  categoriesExtraDataMap.push({
    categoryNo: 60891,
    url: '/products/accessory/camera/view-finder',
  });
  // 액세서리 > 카메라 액세서리 > 삼각대/리모콘
  categoriesExtraDataMap.push({
    categoryNo: 60892,
    url: '/products/accessory/camera/tripod',
  });
  // 액세서리 > 카메라 액세서리 > 케이스/커버/스트랩
  categoriesExtraDataMap.push({
    categoryNo: 60894,
    url: '/products/accessory/camera/case',
  });
  // 액세서리 > 카메라 액세서리 > 기타
  categoriesExtraDataMap.push({
    categoryNo: 60895,
    url: '/products/accessory/camera/etc',
  });
  // 액세서리 > 카메라 액세서리 > 액세서리 키트
  categoriesExtraDataMap.push({
    categoryNo: 60899,
    url: '/products/accessory/camera/kit',
  });
  // 액세서리 > 오디오 액세서리
  categoriesExtraDataMap.push({
    categoryNo: 60885,
    url: '/products/accessory/audio',
  });

  // PlayStation
  categoriesExtraDataMap.push({
    categoryNo: 60896,
    url: '/products/playstation',
    bannerSectionCodes: '000',
  });
  // PlayStation > PlayStation
  categoriesExtraDataMap.push({
    categoryNo: 60897,
    url: '/products/playstation/playstation',
  });
  // PlayStation > 게임 타이틀 및 주변기기
  categoriesExtraDataMap.push({
    categoryNo: 60898,
    url: '/products/playstation/title',
  });

  espCategoryNo = 60918;
} else {
  categoriesExtraDataMap.push({
    categoryNo: 60859,
    url: '/products/camera',
    bannerSectionCodes: '000',
  });

  espCategoryNo = 60918;
}

// GNB 카테고리
// [제품] 하위 카테고리는 서버에서 가져오는 카테고리 정보로 구성하고, 나머지는 하드코딩
// 2-depth 까지만 노출하고, 2-depth 에는 target route 정보 포함
const gnbCategories = [
  {
    label: '스토어 추천 제품',
    children: [
      {
        label: '추천 제품',
        route: '/recommend',
      }
    ]
  },
  {
    label: '제품',
    children: [],
  },
  {
    label: '기획전',
    children: [
      {
        label: '소니스토어 단독',
        route: '/event/list',
      },
      {
        label: '혜택존',
        route: '/event/refurbish',
      },
      {
        label: '예약판매',
        route: '/event/list',
      },
      {
        label: '정품 등록 이벤트',
        route: '/event/refined',
      },
      {
        label: 'LIVE ON',
        route: '/event/live-on',
      },
    ]
  },
  {
    label: '멤버십',
    children: [
      {
        label: '등급&혜택 안내',
        route: '/membership/benefit',
      },
    ]
  },
  {
    label: '고객 서비스',
    children: [
      {
        label: 'FAQ&공지사항',
        route: '/faq',
      },
      {
        label: '정품등록 안내',
        href: 'https://www.sony.co.kr/scs/handler/Index-Start?asa&#x3D;Sa',
      },
      {
        label: '제품 지원',
        href: 'https://www.sony.co.kr/electronics/support',
      },
      {
        label: '구매 상담',
        route: '/purchase-consulting',
      },
      {
        label: '직영점 안내',
        route: '/store-info',
      },
      {
        label: '동영상 강좌',
        route: '/video-course',
      },
    ]
  },
];

export { tagColorMap, categoriesExtraDataMap, espCategoryNo, gnbCategories };