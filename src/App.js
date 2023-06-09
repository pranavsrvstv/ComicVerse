import AddMovie from "./component/AddMovie";
import Cards from "./component/Cards";
import Detail from "./component/Detail";
import Header from "./component/Header";
import { Route,Routes } from "react-router-dom";
import Review from "./component/Review";

function App() {
  return (
    <div className="App">
     
      <Header/>
      <Routes>
       {/* <Route path="/" element={<Review/>}></Route>  */}
       <Route path="/" element={<Cards/>}></Route>
       
       <Route path="/addmovie" element={<AddMovie/>}></Route> 
       <Route path="/detail/:id" element={<Detail/>}></Route> 
       
      </Routes>
    
    </div>
  );
}

export default App;
