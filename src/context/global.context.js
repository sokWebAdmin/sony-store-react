import { createContext } from "react";

const GlobalContext = createContext({
  onChangeGlobal: () => {},
});

export default GlobalContext;