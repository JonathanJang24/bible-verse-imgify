import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import "../styles/socials.css"

const Socials = () => {
    return (<div id="socials-container">
        <a href="https://github.com/JonathanJang24" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
        <a href="https://www.linkedin.com/in/jonathanjang24/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        <a href="mailto:jonathanjang24@gmail.com" rel="noopener noreferrer"><FaEnvelope /></a>
    </div>)
}

export default Socials