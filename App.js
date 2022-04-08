import React, { useContext } from "react";
import AuthContext from "./store/Auth-Context";
import Login from "./components/Login";
import Home from "./components/Home";
import MainHeader from "./components/MainHeader";

function App() {
  const ctx = useContext(AuthContext);

  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!ctx.islogged && <Login />}
        {ctx.islogged && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
