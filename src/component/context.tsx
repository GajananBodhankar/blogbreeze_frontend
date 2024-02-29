import { SetStateAction, createContext, useContext, useState } from "react";
interface Icontext {
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  showSideBar: boolean;
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ModeContext = createContext<Icontext>({
  mode: "light",
  setMode: (_arg0: any) => {},
  showSideBar: true || false,
  setShowSideBar: function (_value: SetStateAction<boolean>): void {},
});

export function ContextProvider({ children }: any) {
  const [mode, setMode] = useState("light");
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <ModeContext.Provider
      value={{ mode, setMode, showSideBar, setShowSideBar }}
    >
      {children}
    </ModeContext.Provider>
  );
}

export function MainContext() {
  let Context = useContext(ModeContext);
  return Context;
}
