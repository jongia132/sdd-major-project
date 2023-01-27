import './settings.css'
import BackButton from '../components/backButton'
const settings = () => {


    return(
        <div>
            <nav>
                <BackButton/>
                <a href="/">Home</a>
                <p className='section-header'>Category</p>
                <ul>
                    <li className='menu-options'>General</li>
                    <li className='menu-options'>Appearance</li>
                    <li className='menu-options'>Applet Settings</li>
                    <li className='menu-options'>User Account</li>
                    <li className='menu-options'>About</li>
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
            <section id="about"></section>
        </div>
    )
}

export default settings