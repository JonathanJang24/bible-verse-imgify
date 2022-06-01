import { useState, useEffect, useRef } from 'react'
import "../styles/home.css"

const IntroScreen = (props) => {

    const [inputs, setInputs] = useState({
        book: "Genesis",
        chapter: "1",
        verse: "1"
    });
    const [text, setText] = useState("In the beginning, God created the heavens and the earth.");



    const elementRef = useRef(null);
    /*
fix dynamical font sizing -- maybe just skip for now
let fontHeight;
useEffect(() => {
    fontHeight = 0.1 * (elementRef.current.clientHeight);
}, []);
*/

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("https://bible-api.com/" + inputs.book + "%20" + inputs.chapter + ":" + inputs.verse)
            .then(response => response.json())
            .then(data => setText(data.text))
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    if (props.show) {
        return (
            <>
                <form onSubmit={handleSubmit}>
                    <div className="selector-box">
                        <label>Book
                            <select
                                value={inputs.book}
                                name="book"
                                onChange={handleChange}>
                                <option value="Genesis">Genesis</option>
                                <option value="Exodus">Exodus</option>
                                <option value="Leviticus">Leviticus</option>
                                <option value="Numbers">Numbers</option>
                                <option value="Deuteronomy">Deuteronomy</option>
                                <option value="Joshua">Joshua</option>
                                <option value="Joshua">Judges</option>
                            </select>
                        </label>
                        <label>Chapter
                            <input
                                type="text"
                                name="chapter"
                                value={inputs.chapter || ""}
                                onChange={handleChange}
                            />
                        </label>
                        <label>Verse
                            <input
                                type="text"
                                name="verse"
                                value={inputs.verse || ""}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <input className="submit-btn" type="submit" value="Enter" />
                </form>
                <div className="verse-container" ref={elementRef}>
                    <p className="user-verse">{text}</p>
                </div>
            </>
        )
    }
}

const ImgScreen = (props) => {

    // Conditional rendering for imgification
    // When false, should render img screen
    if (!props.show) {
        return (
            <>
                <h1>True</h1>
            </>
        )
    }


}


const Home = () => {

    const [vis, setVis] = useState(true)

    const changeBol = () => {
        setVis(prev => (prev ^ true))
    }

    return (
        <>
            <IntroScreen show={vis} />
            <button onClick={changeBol} className="img-button">Imgify!</button>
            <ImgScreen show={vis} />
        </>
    )
}

export default Home;