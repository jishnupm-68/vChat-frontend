import Body from "./Components/Body"
import Footer from "./Components/Footer"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./Components/Login"
import Profile from "./Components/Profile"
import {Provider} from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./Components/Feed"
import Connections from "./Components/Connections"
import Request from "./Components/Request"
import ProtectRoute from "./Components/ProtectRoute"
const App = () => {
  return (
    <div>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />}></Route>
              <Route element={<ProtectRoute />}>
               <Route path="/" element={<Feed />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/connections" element={<Connections />} ></Route>
              <Route path="requests" element = {<Request />} ></Route>

              
              </Route>
             
            </Route>
          </Routes>
        </BrowserRouter>
        <Footer />
      </Provider>
    </div>
  );
};

export default App

