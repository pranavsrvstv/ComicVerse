import AddMovie from "./component/AddMovie";
import Cards from "./component/Cards";
import Detail from "./component/Detail";
import Header from "./component/Header";
import { Route, Routes } from "react-router-dom";
import Review from "./component/Review";
import { createContext } from "react";
import { useState } from "react";

import Signup from "./component/Signup";
import Login from "./component/Login";

const Appstate = createContext();

function App() {
  
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");
  return (

    <Appstate.Provider value={{login, userName, setLogin, setUserName}} >
      <div className="App">

        <Header />
        <Routes>
          {/* <Route path="/" element={<Review/>}></Route>  */}
          <Route path="/" element={<Cards />}></Route>

          <Route path="/addmovie" element={<AddMovie />}></Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup />}></Route>

        </Routes>

      </div>
    </Appstate.Provider>
  );
}

export default App;
export {Appstate};