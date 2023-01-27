import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Index from "./applets/index"
import Pomodoro from './applets/Pomodoro'
import Settings from "./applets/settings"

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Index/>}/>
          <Route path='/pomodoro' element={<Pomodoro/>}/>
          <Route path='/settings' element={<Settings/>}/>
        </Routes>
      </Router>
    </div>
  );
}
export default App;