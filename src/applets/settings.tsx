import styles from './settings.module.css'
import BackButton from '../components/backButton'

const settings = () => {
    return(
        <div className={styles.html}>
            <nav className={styles.settingsMenu}>
                <BackButton/>
                <p className='section-header'>Settings</p>
                <ul>
                    <li>General</li>
                    <li>Appearance</li>
                    <li>Applet Settings</li>
                    <li>User Account</li>
                    <li>About</li>
                </ul>
            </nav>
            <section id="general">
                <p className='section-header'>Preferences</p>
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
            <section id="applet-settings"></section>
            <section id="user-account"></section>
            <section id="about">
                <p>Debug</p>
                <p>{navigator.userAgent}</p>
            </section>
        </div>
    )
}

export default settings