import request from "./request";
import Cookies from "js-cookie";

const accessToken = Cookies.get("accessToken");
// 사용법
// export const testApi = async () => {
//   return request(
//     "addresses/search", // url
//     "get", // post | get | put | delete
//     { accessToken: "accessToken" }, // 토큰이나 헤더쪽 더 넣을정보 있는경우,
//     { keyword: "인천광역시 용현동", pageSize: 20 }, // 파라미터로 넘길 값들, 없으면 null
//     { hi: "con" } // 데이터쪽 이거는 JSON.stringify를 해야하나 테스트를 못해서 일단 이렇게
//   );
// };

export const testModule = async () => {
  return request(
    "addresses/search",
    "get",
    { accessToken: accessToken },
    { keyword: "인천광역시 용현동", pageSize: 20 },
    { hi: "con" }
  );
};
// D8vhQpkQR0BJ3K/9UfC5xw==
// email: "abc1233@abc.com",
// mobileNo: "01012344321",
// memberId: "test013",
// password: "qwer1234!@#$",
// memberName: "김엔터",

export const getTokenApi = async () => {
  return request("oauth/token", "post", { accessToken: accessToken }, null, {
    memberId: "test013",
    password: "qwer1234!@#$",
  });
};
// export const getTokenApi = async () => {
//   return request("oauth/token", "post", { accessToken: accessToken }, null, {
//     memberId: "test12341",
//     password: "qwer1234!@#$",
//   });
// };
