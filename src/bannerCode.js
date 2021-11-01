const code = {
  development: {
    main: {
      kvPc: '000',
      kvMo: '001',
      recommend: '002',
      eventMain: '003',
      eventBgPc: '028',
      eventBgMo: '029',
      academyPc: '004',
      academyMo: '005',
    },
    event: {
      pc: '006',
      mo: '007',
      refined: '455',
      asc: '464',
      employee: '456',
      liveOn: '452',
    },
    recommend: {
      kvPc: '013',
      kvMo: '014',
      recommend: '015',
      bg: '016',
      event: '017',
    },
    myPage: {
      asc: '019',
      employee: '025',
      refined: '026',
    },
    category: {
      camera: '020',
      videoCamera: '021',
      audio: '022',
      acc: '023',
    },
    search: {
      keyword: '027',
    },
    product: {
      searchBar: '5963',
      event: '5833',
      recommend: '5742',
    },
    curation: '467',
  },
  production: {
    main: {
      kvPc: '000',
      kvMo: '001',
      recommend: '002',
      eventMain: '003',
      eventBgPc: '004',
      eventBgMo: '005',
      academyPc: '006',
      academyMo: '007',
    },
    event: {
      pc: '020',
      mo: '021',
      refined: '1180',
      asc: '1179',
      employee: '1178',
      liveOn: '1182',
    },
    recommend: {
      kvPc: '008',
      kvMo: '009',
      recommend: '010',
      bg: '011',
      event: '012',
    },
    myPage: {
      asc: '017',
      employee: '018',
      refined: '019',
    },
    category: {
      camera: '013',
      videoCamera: '014',
      audio: '015',
      acc: '016',
    },
    search: {
      keyword: '022',
    },
    product: {
      searchBar: '90113',
      event: '90112',
      recommend: '90111',
    },
    curation: '1196',
  },
};

export const bannerCode = process.env.NODE_ENV === 'production' ? code.production : code.development;
