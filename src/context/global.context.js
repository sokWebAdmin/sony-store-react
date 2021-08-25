import { createContext } from "react";

const GlobalContext = createContext({
  onChangeGlobal: () => {},
  shopByToken : "123123"
});

export default GlobalContext;