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


//appstate stores the context of the app - login and userName info
const Appstate = createContext();

function App() {
  //console.log(process.env.REACT_APP_API_KEY);
  
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");
  return (
  //wrapping the app in Appstate provider so that context can be accessed from anywhere in the app
  //an alternate of this is using redux state
    <Appstate.Provider value={{login, userName, setLogin, setUserName}} >
      <div className="App">
        <Header />

        <Routes>
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
//exporting appstate
export {Appstate};