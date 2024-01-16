import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import PrivateRoute from './components/PrivateRoute'

function App() {

  return (
      <Router>
        <Routes>
        
          <Route path="/signin" element={<SignIn/>}/>
          
          <Route element={<PrivateRoute/>}>
            <Route path="/" element={<Home/>}/>
          </Route>

        </Routes>
      </Router>
  )
}

export default App
