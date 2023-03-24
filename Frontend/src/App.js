import { BrowserRouter as Routers , Routes , Route } from "react-router-dom"
import Home from './Pages/Home';
import Auth from './Pages/Auth';
import Posts from './Pages/Posts';
import Write from './Pages/Write';
import Navbar from './conponent/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import RegisterPage from "./Pages/Register";


function App() {
  return (
    <div className="App">
      {/* <HomePage /> */}
      <Routers>
        <Routes>
          <Route path='/' element={<Navbar />} >
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/auth/register' element={<RegisterPage />} />
          <Route path='/savePosts' element={<Posts />} />
          <Route path='/write' element={<Write />} />
          </Route>
        </Routes>
      </Routers>
    </div>
  );
}

export default App;
