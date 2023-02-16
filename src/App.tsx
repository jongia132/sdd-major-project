import './App.css'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Index from "./applets/index"
import Pomodoro from './applets/Pomodoro'
import Settings from "./applets/settings"

function App() {
  return (
    <div>
      <BrowserRouter>
      <Sidebar/>
        <Routes>
          <Route path='/' element={<Index/>}/>
          <Route path='/pomodoro' element={<Pomodoro/>}/>
          <Route path='/settings' element={<Settings/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;