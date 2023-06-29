import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Index from "./applets/index"
import { Pomodoro } from './applets/Pomodoro'
import Settings from "./components/settings"
import Layout from './components/Layout'
import Boogle from './applets/Boogle'
import { Tasks } from "./applets/Tasks"
import { FluentProvider, webDarkTheme } from '@fluentui/react-components'
import Sentral from './applets/Sentral'
import Setup from './components/Setup'
import Focus from './applets/Focus'

function App() {
  let bg = localStorage.getItem('app.bg')
  switch (bg) {
    case "default":
      document.documentElement.style.setProperty("--background-image", "url('src/assets/Yum.jpg')")
      break;
    case "wood":
      document.documentElement.style.setProperty("--background-image", "url('src/assets/wood.jpg')")
      break;
    case "barangaroo":
      document.documentElement.style.setProperty("--background-image", "url('src/assets/Bangaroo_Old.jpg')")
      break;
    case "custom":
      document.documentElement.style.setProperty("--background-image", "url('src/assets/custom.jpg')")
      break;
    default:
      document.documentElement.style.setProperty("--background-image", "url('src/assets/Yum.jpg')")
  }

  if (!localStorage.getItem('setup')) {
    return(
      <FluentProvider theme={webDarkTheme}><Setup /></FluentProvider>)
  }
  else{
    return (
      <HashRouter>
        <FluentProvider theme={webDarkTheme}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="pomodoro" element={<Pomodoro />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="boogle" element={<Boogle />} />
              <Route path="sentral" element={<Sentral />} />
              <Route path='focus' element={<Focus />} />
            </Route>
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </FluentProvider>
      </HashRouter>
  
    );
  }
}
export default App;