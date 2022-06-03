import { useState, useEffect, useRef } from 'react'
import "../styles/home.css"
import { booksOfBible } from '../bibleBooks.js'
import bg1 from "../imgs/bg-1.jpg"
import bg2 from "../imgs/bg-2.jpg"
import bg3 from "../imgs/bg-3.jpg"
import bg4 from "../imgs/bg-4.jpg"
import bg5 from "../imgs/bg-5.jpg"

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

    const [currImg, setCurrImg] = useState(bg1)
    const imgClicked = (e) => {
        e.preventDefault();
        setCurrImg(bg4)
    }

    return (
        <>
            <div className="">
                <div style={{ background: { currImg } }} className="img-container">
                    <p className="img-verse">{userVerse}</p>
                </div>
                <div className="img-grid">
                    <img className="img-grid-item" src={bg1} alt="background 1" onClick={imgClicked} />
                    <img className="img-grid-item" src={bg2} alt="background 2" />
                    <img className="img-grid-item" src={bg3} alt="background 3" />
                    <img className="img-grid-item" src={bg4} alt="background 4" />
                    <img className="img-grid-item" src={bg5} alt="background 5" />
                </div>
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