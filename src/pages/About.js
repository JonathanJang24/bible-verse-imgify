import "../styles/about.css"
import { useRef } from 'react'
import useIsInViewport from "../utils/useIsInViewport.js"
import Socials from "../utils/Socials.js"

const SectionContainer = () => {

    const whatRef = useRef(null)
    const whyRef = useRef(null)
    const whoRef = useRef(null)

    const whatVis = useIsInViewport(whatRef);
    const whyVis = useIsInViewport(whyRef);
    const whoVis = useIsInViewport(whoRef);

    return (
        <div id="section-container">
            <div ref={whatRef} className={`abt-section what-block ${whatVis ? "ls" : "diss"}`}>
                <h2 >What is this?</h2>
                <p>Verse Imgifier is a front-end web application written in React JS. Users can choose specific verse(s) from scripture which they like, fetched using bible-api.com's JSON api, and customize images from the given presets to download the image they like.</p>
            </div>

            <div ref={whyRef} className={`abt-section why-block ${whyVis ? "rs bod" : "diss"}`}>
                <h2>Why was this made?</h2>
                <p>Verse Imgifier was inspired by the Image function from The Bible App by Life Church. Personally, I love to customize and download images to remind me of certain verses that I love. As I (the developer) continue to grow in technical skills, I hope to add further functionality for more options and convenience.</p>
            </div>

            <div ref={whoRef} className={`abt-section who-block ${whoVis ? "ls" : "diss"}`}>
                <h2>Who made it?</h2>
                <p>My name is Jonathan Jang and I am both the designer and developer of Verse Imgifier. I'm currently an undergraduate at Rice University who loves both the Lord and Computer Science. This project was made for me to both practice development skills and glorify God. </p>
            </div>
        </div >
    );
}

const About = () => {

    return (
        <>

            <div id="header-container">
                <h1 id="about-header">{`> About the Project <`}</h1>
            </div>
            <SectionContainer />

            <Socials />
            <br></br>
        </>
    )
}

export default About;