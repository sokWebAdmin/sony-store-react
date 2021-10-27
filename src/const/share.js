export const getShareList = (link, label) => [
  {
    name: 'kakaotalk',
    label: '카카오톡',
    link,
  },
  {
    name: 'kakaostory',
    label: '카카오스토리',
    link,
  },
  {
    name: 'facebook',
    label: '페이스북',
    link: `https://www.facebook.com/sharer/sharer.php?u=${link}`,
  },
  {
    name: 'twitter',
    label: '트위터',
    link: `https://twitter.com/intent/tweet?url=${link}`,
  },
  {
    name: 'line',
    label: '라인',
    link: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(link)}`,
  },
  {
    name: 'band',
    label: '밴드',
    link: `https://band.us/plugin/share?body=${label}&route=${link}`,
  },
];