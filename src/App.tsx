// We import BrowserRouter, Routes and Route from react-router-dom
// BrowserRouter → wraps our whole app and enables routing
// Routes → container that holds all our routes
// Route → defines each individual page and its URL path
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// We import each page we created
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Opportunities from './pages/Opportunities'
import Recommend from './pages/Recommend'

// App is our MAIN component — the root of everything
function App() {
  return (
    // BrowserRouter wraps everything to enable navigation
    <BrowserRouter>
      <Routes>
        {/* Each Route has a path (URL) and an element (which page to show) */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/recommend" element={<Recommend />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App