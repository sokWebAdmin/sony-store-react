import { createContext } from "react";

const GlobalContext = createContext({
  onChangeGlobal: () => {},
  shopByToken : ""
});

export default GlobalContext;