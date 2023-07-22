import { FC, ReactNode } from "react";
import { NavBar } from "./components/NavBar/NavBar.tsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

type Props = {
  children: ReactNode;
};

const App: FC<Props> = ({ children }) => {
  return (
    <>
      <NavBar />
      <div style={{ margin: "1rem", textAlign: "center" }}>{children}</div>
      <ToastContainer />
    </>
  );
};

export default App;
