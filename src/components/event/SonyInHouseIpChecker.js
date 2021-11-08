import { getProfile } from '../../api/member';
import axios from 'axios';
import { ipCheck } from '../../api/sony/support';

export default class SonyInHouseIpChecker {
  run () {
    return Promise.all([
      this.fetchMemberGroupNos(),
      this.getIp(),
    ]).then(([groupNos, ip]) =>
      this.checkIp(groupNos, ip)
    ).then(console.log).catch(() => new Error('잘못된 접근입니다.'));
  }

  fetchMemberGroupNos = () =>
    getProfile().
      then(
        res => res.data?.memberGroups.map(({ memberGroupNo }) => memberGroupNo));

  // 대응 shop API 없음
  getIp = () => axios.get('https://api.ipify.org').then(res => res.data);

  checkIp = (groupNos, ip) => {
    const reqs = groupNos.map(lgyGroupNo => ({
      lgyGroupNo,
      ip,
    })).map(req => ipCheck(req).then(res => res.data.errorCode));

    return Promise.all(reqs).then(codes => codes.some(code => code === '0000'));
  };
}