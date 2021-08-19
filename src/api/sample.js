import request from "./request";
import Cookies from "js-cookie";

export const getToken = async () => {
  return await Cookies.get("shopByToken");
};

export const sampleApi = async (email, password) => {
  let form = new FormData();
  form.append("id", email);
  form.append("password", password);
  return request("Account/login", "post", {}, form);
};
