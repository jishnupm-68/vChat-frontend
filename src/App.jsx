import Header from "./Components/Header"
import Body from "./Components/Body"
import Footer from "./Components/Footer"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./Components/Login"
import Profile from "./Components/Profile"
const App = () => {
  return (
    <div>
      <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
        <Route path="/login" element= {<Login />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        </Route>
       
      </Routes>
      </BrowserRouter>
     <Footer />
    </div>
  )
}

export default App

