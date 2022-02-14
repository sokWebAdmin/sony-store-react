import { getEventByEventNo } from '../api/display';
import { bannerCode } from '../bannerCode';

const tagColorMap = {
    NEW: '#FF4E00',
    BEST: '#5865F5',
    HOT: '#E70000',
    EVENT: '#222222',
    A급: '#C55AFF',
    B급: '#39BFC9',
    C급: '#E70000',
};

const CATEGORY = {
    development: {
        esp: 81643,
        camera: 60859,
        lens: 60860,
        lenscamera: 60863,
        lenslens: 60864,
        compact: 60862,
        videocamera: 60865,
        cinema: 60866,
        camcoder: 60867,
        handicam: 60869,
        hdhandicam: 60870,
        actioncam: 60868,
        audio: 60871,
        headphone: 60872,
        wireless: 60876,
        wire: 60877,
        amp: 60878,
        headphonehardware: 81641,
        speaker: 60873,
        wirelessspeaker: 60879,
        caraudio: 60880,
        homeaudio: 60874,
        workman: 60875,
        mp3: 60881,
        recorder: 60882,
        accessory: 60883,
        cameraaccessory: 60884,
        memorycard: 60886,
        battery: 60887,
        grip: 60888,
        flash: 60889,
        mic: 60890,
        finder: 60891,
        tripod: 60892,
        case: 60894,
        etc: 60895,
        kit: 60899,
        audioaccessory: 60885,
        playstation: 60896,
        playstationgame: 60898,
        playstationhardware: 60897,
    },
    production: {
        esp: 232809,
        camera: 232762,
        lens: 232763,
        lenscamera: 232766,
        lenslens: 232767,
        compact: 232769,
        videocamera: 232770,
        cinema: 232771,
        camcoder: 232772,
        handicam: 232773,
        hdhandicam: 232775,
        actioncam: 232776,
        audio: 232778,
        headphone: 232779,
        wireless: 232780,
        wire: 232781,
        amp: 232782,
        headphonehardware: 232909,
        speaker: 232784,
        wirelessspeaker: 232788,
        caraudio: 232789,
        homeaudio: 232783,
        workman: 232785,
        mp3: 232786,
        recorder: 232787,
        accessory: 232790,
        cameraaccessory: 232791,
        memorycard: 232792,
        battery: 232793,
        grip: 232794,
        flash: 232795,
        mic: 232796,
        finder: 232797,
        tripod: 232798,
        case: 232799,
        etc: 232800,
        kit: 232801,
        audioaccessory: 232802,
        playstation: 232804,
        playstationgame: 232806,
        playstationhardware: 232805,
    },
    get no() {
        return this[process.env.NODE_ENV];
    },
};

const categoriesExtraDataMap = [];
let espCategoryNo = CATEGORY.no.esp;

// TODO real 인 경우에 대한 하드코딩 데이터 필요
// TODO bannerSectionCodes 데이터 확인해야함 (최상위 부모 (카메라 같은) 카테고리만 bannerSectionCodes 를 가짐)
// NOTE 검색(카테고리)에서 categoriesExtraDataMap 의 url 을 사용하고 있음
const { camera, videoCamera, audio, acc } = bannerCode.category;

if (['development', 'production'].includes(process.env.NODE_ENV)) {
    // 카메라
    categoriesExtraDataMap.push({
        // categoryNo: 60859,
        categoryNo: CATEGORY.no.camera,
        url: '/products/camera',
        bannerSectionCodes: camera,
        isAvailableMoveESP: true,
        isAvailableMoveProductCompare: true,
    });
    // 카메라 > 렌즈교환식카메라
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.lens,
        url: '/products/camera/lens',
    });
    // 카메라 > 렌즈교환식카메라 > 카메라
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.lenscamera,
        url: '/products/camera/lens',
        tab: 'camera',
    });
    // 카메라 > 렌즈교환식카메라 > 렌즈
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.lenslens,
        url: '/products/camera/lens',
        tab: 'lens',
    });
    // 카메라 > 컴팩트카메라
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.compact,
        url: '/products/camera/compact',
    });

    // 비디오 카메라
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.videocamera,
        url: '/products/videocamera',
        bannerSectionCodes: videoCamera,
        isAvailableMoveESP: true,
        isAvailableMoveProductCompare: true,
    });
    // 비디오 카메라 > 시네마라인카메라
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.cinema,
        url: '/products/videocamera/cinema',
    });
    // 비디오 카메라 > 캠코더
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.camcoder,
        url: '/products/videocamera/camcoder',
    });
    // 비디오 카메라 > 캠코더 > 4K 핸디캠
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.handicam,
        url: '/products/videocamera/camcoder',
        tab: '4k-handy',
    });
    // 비디오 카메라 > 캠코더 > HD 핸디캠
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.hdhandicam,
        url: '/products/videocamera/camcoder',
        tab: 'hd-handy',
    });
    // 비디오 카메라 > 액션캠
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.actioncam,
        url: '/products/videocamera/action',
    });

    // 오디오
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.audio,
        url: '/products/audio',
        bannerSectionCodes: audio,
        isAvailableMoveProductCompare: true,
    });
    // 오디오 > 헤드폰/이어폰
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.headphone,
        url: '/products/audio/headphone',
    });
    // 오디오 > 헤드폰/이어폰 > 헤드폰
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.headphonehardware,
        url: '/products/audio/headphone',
        tab: 'headphone',
    });
    // 오디오 > 헤드폰/이어폰 > 무선 이어폰
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.wireless,
        url: '/products/audio/headphone',
        tab: 'wireless',
    });
    // 오디오 > 헤드폰/이어폰 > 유선 이어폰
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.wire,
        url: '/products/audio/headphone',
        tab: 'wired',
    });
    // 오디오 > 헤드폰/이어폰 > 헤드폰 엠프
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.amp,
        url: '/products/audio/headphone',
        tab: 'amp',
    });
    // 오디오 > 스피커
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.speaker,
        url: '/products/audio/speaker',
    });
    // 오디오 > 스피커 > 무선 스피커
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.wirelessspeaker,
        url: '/products/audio/speaker',
        tab: 'wireless',
    });
    // 오디오 > 스피커 > 카오디오
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.caraudio,
        url: '/products/audio/speaker',
        tab: 'car',
    });
    // 오디오 > 홈오디오
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.homeaudio,
        url: '/products/audio/homeaudio',
    });
    // 오디오 > 워크맨/녹음기
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.workman,
        url: '/products/audio/recorder',
    });
    // 오디오 > 워크맨/녹음기 > MP3플레이어
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.mp3,
        url: '/products/audio/recorder',
        tab: 'mp3',
    });
    // 오디오 > 워크맨/녹음기 > 녹음기
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.recorder,
        url: '/products/audio/recorder',
        tab: 'recorder',
    });

    // 액세서리
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.accessory,
        url: '/products/accessory',
        bannerSectionCodes: acc,
        isAvailableMoveAccessoryCompatibility: true,
    });
    // 액세서리 > 카메라 액세서리
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.cameraaccessory,
        url: '/products/accessory/camera',
    });
    // 액세서리 > 카메라 액세서리 > 메모리카드/SSD
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.memorycard,
        url: '/products/accessory/camera',
        tab: 'memory',
    });
    // 액세서리 > 카메라 액세서리 > 배터리,충전기/어댑터
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.battery,
        url: '/products/accessory/camera',
        tab: 'battery',
    });
    // 액세서리 > 카메라 액세서리 > 세로 그립
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.grip,
        url: '/products/accessory/camera',
        tab: 'vertical-grip',
    });
    // 액세서리 > 카메라 액세서리 > 플래시/조명
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.flash,
        url: '/products/accessory/camera',
        tab: 'flash',
    });
    // 액세서리 > 카메라 액세서리 > 마이크
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.mic,
        url: '/products/accessory/camera',
        tab: 'mic',
    });
    // 액세서리 > 카메라 액세서리 > 뷰파인더/모니터
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.finder,
        url: '/products/accessory/camera',
        tab: 'view-finder',
    });
    // 액세서리 > 카메라 액세서리 > 삼각대/리모콘
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.tripod,
        url: '/products/accessory/camera',
        tab: 'tripod',
    });
    // 액세서리 > 카메라 액세서리 > 케이스/커버/스트랩
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.case,
        url: '/products/accessory/camera',
        tab: 'case',
    });
    // 액세서리 > 카메라 액세서리 > 기타
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.etc,
        url: '/products/accessory/camera',
        tab: 'etc',
    });
    // 액세서리 > 카메라 액세서리 > 액세서리 키트
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.kit,
        url: '/products/accessory/camera',
        tab: 'kit',
    });
    // 액세서리 > 오디오 액세서리
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.audioaccessory,
        url: '/products/accessory/audio',
    });

    // PlayStation
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.playstation,
        url: '/products/playstation',
    });
    // PlayStation > PlayStation
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.playstationhardware,
        url: '/products/playstation/playstation',
    });
    // PlayStation > 게임 타이틀 및 주변기기
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.playstationgame,
        url: '/products/playstation/title',
    });

    espCategoryNo = CATEGORY.no.esp;
} else {
    categoriesExtraDataMap.push({
        categoryNo: CATEGORY.no.camera,
        url: '/products/camera',
        bannerSectionCodes: '000',
    });

    espCategoryNo = CATEGORY.no.esp;
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
            },
        ],
    },
    {
        label: '제품',
        children: [],
    },
    {
        label: '기획전',
        route: '/event/list?tab=all',
        children: [
            {
                label: '소니스토어 단독',
                route: '/event/list?tab=only',
            },
            {
                label: '혜택존',
                route: '/event/list?tab=benefit-zone',
            },
            {
                label: '예약판매',
                route: '/event/list?tab=pre-order',
            },
            {
                label: '정품등록 이벤트',
                route: '/event/list?tab=refined',
            },
            {
                label: 'LIVE ON',
                route: '/event/list?tab=live-on',
            },
        ],
    },
    {
        label: '멤버십',
        children: [
            {
                label: '등급&혜택 안내',
                route: '/membership/benefit',
            },
        ],
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
                href: 'https://www.sony.co.kr/scs/handler/Index-Start?asa=Sa',
            },
            {
                label: '제품 지원',
                href: 'https://www.sony.co.kr/electronics/support',
            },
            {
                label: '구매 상담',
                route: '/agreement',
            },
            {
                label: '직영점 안내',
                route: '/store-info',
            },
            {
                label: '동영상 강좌',
                route: '/video-course',
            },
        ],
    },
];

(async () => {
    const { curation } = bannerCode;

    const res = await getEventByEventNo(curation);
    if (res?.data?.tag !== '비노출' && res.status !== 400) {
        gnbCategories[0].children.push({
            label: '선물 제안',
            route: '/curation',
        });
    }
})();

const categoriesLinkMap = {
    compact:
        'https://www.sony.co.kr/electronics/compact-cameras/t/cyber-shot-digital-cameras',
    cinema: 'https://www.sony.co.kr/electronics/cinema-line',
    camcoder:
        'https://www.sony.co.kr/electronics/camcorders/t/handycam-camcorders',
    action: 'https://www.sony.co.kr/electronics/action-cam/t/action-cam',
    headphone:
        'https://www.sony.co.kr/electronics/headphones/t/headband-headphones',
    speaker:
        'https://www.sony.co.kr/electronics/wireless-speakers-docks/t/wireless-speakers',
    homeaudio:
        'https://www.sony.co.kr/electronics/audio-systems/t/audio-components',
    recorder:
        'https://www.sony.co.kr/electronics/walkman-digital-music-players/t/walkman',
    lens: 'https://www.sony.co.kr/electronics/interchangeable-lens-camera-products/t/interchangeable-lens-cameras',
};

// TODO: 운영서버 확인필요
const displayCategoryMap = {
    81716: { displayName: 'LIVE ON', tab: 'live-on' },
    81715: { displayName: '정품등록 이벤트', tab: 'refined' },
    81714: { displayName: '예약판매', tab: 'pre-order' },
    81713: { displayName: '혜택존', tab: 'benefit-zone' },
    81610: { displayName: '소니스토어 단독', tab: 'only' },
};

export {
    tagColorMap,
    categoriesExtraDataMap,
    espCategoryNo,
    gnbCategories,
    categoriesLinkMap,
    displayCategoryMap,
};
