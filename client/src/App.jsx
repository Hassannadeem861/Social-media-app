import { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'



// imports files
import Home from './Pages/Home/Home.jsx'
import About from './Pages/About/About.jsx'
import Contact from './Pages/Contact/Contact.jsx'
import Chat from './Pages/Chat/Chat.jsx'
import Signup from './Pages/Register/Signup.jsx'
import Login from './Pages/Login/Login.jsx'
import ErrorPage from './Pages/Error/ErrorPage.jsx'
import Navbar from './Components/Navbar/Navbar.jsx'
import loader from './assets/loader.gif'
import { GlobalContext } from './Context/Context.jsx';

function App() {
  let { state, dispatch } = useContext(GlobalContext);

  return (
    <div>
      <Navbar />
      {state.isLogin ? (
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/chat' element={<Chat />}></Route>
          <Route path='*' element={<Navigate to='/' replace={true} />}></Route>
        </Routes>
      ) : <Routes>
        <Route path='/register' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='*' element={<Navigate to='/login' replace={true} />} ></Route>
      </Routes>}
    </div>
  )
}

export default App


// {
//   state.isLogin === null ? (
//     <div>
//       <img src={loader} alt='splash screen' width="100%" height="100%"
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           margin: "auto",
//           zIndex: -1
//         }}></img>
//     </div>

//   ) : null
// }


