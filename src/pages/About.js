import "../styles/about.css"
import { useRef, useEffect } from 'react'
import useIsInViewport from "../useIsInViewport.js"

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
            </div>

            <div ref={whyRef} className={`abt-section why-block ${whyVis ? "rs bod" : "diss"}`}>
                <h2>Why was this made?</h2>
            </div>

            <div ref={whoRef} className={`abt-section who-block ${whoVis ? "ls" : "diss"}`}>
                <h2>Who made it?</h2>
            </div>
        </div >
    );
}

const About = () => {

    return (
        <>
            <h1 id="about-header">{`> About <`}</h1>

            <SectionContainer />
        </>
    )
}

export default About;