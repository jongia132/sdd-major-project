import styles from './settings.module.css'
import { BackButton } from '../modules'
import { BrowserRouter, Route, Router } from 'react-router-dom'

// Pages
import { General } from './pages'

const settings = () => {
    return(
        <div className={`${styles.html} prevent-select`}>
            <nav className={styles.settingsMenu}>
                <BackButton/>
                <p className={styles.section_header}>Settings</p>
                <ul>
                    <li>General</li>
                    <li>Appearance</li>
                    <li>Applet Settings</li>
                    <li>User Account</li>
                    <li>About</li>
                </ul>
            </nav>
            <div className={styles.prefPane}>
                <p className={styles.section_header}>Preferences</p>
                    {/* <Route index element={<General />}/> */}
                <section id="general">
                    <table>
                        <tbody>
                            <tr>
                                <td>Some setting</td>
                                <td></td>
                                <td>The option</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <section id="appearance"></section>
                    <table>
                        <tbody>
                            <tr>
                                <td>Background</td>
                                <td className={styles.break}></td>
                                <td>File Picker</td>
                            </tr>
                        </tbody>
                    </table>
                <section id="applet-settings"></section>
                <section id="user-account"></section>
                <section id="about">
                    <p>Debug</p>
                    <p>{navigator.userAgent}</p>
                </section>
            </div>
        </div>
    )
}

export default settings