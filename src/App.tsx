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

function App() {
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
          </Route>
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </FluentProvider>
    </HashRouter>

  );
}
export default App;