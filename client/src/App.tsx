import { FC, ReactNode } from "react";
import { NavBar } from "./components/NavBar/NavBar.tsx";
import "./App.css";

type Props = {
  children: ReactNode;
};

const App: FC<Props> = ({ children }) => {
  return (
    <>
      <NavBar />
      <div style={{ margin: "1rem", textAlign: "center" }}>{children}</div>
    </>
  );
};

export default App;
