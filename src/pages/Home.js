import { useState, useEffect, useRef } from 'react'
import "../styles/home.css"
import { booksOfBible } from '../bibleBooks.js'

let userVerse = "In the beginning, God created the heavens and the earth.";

const IntroScreen = () => {

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
            .then(data => {
                setText(data.text)
                userVerse = data.text
            })
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="selector-box">
                    <label>Book
                        <select
                            value={inputs.book}
                            name="book"
                            onChange={handleChange}>
                            {booksOfBible.map((book) => (<option value={book}>{book}</option>))}
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

const ImgScreen = () => {
    return (
        <>
            <div className="img-container">
                <p className="img-verse">{userVerse}</p>
            </div>
        </>
    )
}


const Home = () => {
    const [vis, setVis] = useState(true)

    const changeBol = () => {
        setVis(prev => (prev ^ true))
    }

    if (vis) {
        return (
            <>
                <IntroScreen />
                <button onClick={changeBol} className="img-button">Imgify!</button>
            </>
        )
    }
    else {
        return (
            <>
                <button onClick={changeBol} className="back-button">Back</button>
                <ImgScreen />
            </>
        )
    }
}

export default Home;