import { useState, useEffect, useRef } from 'react'
import "../styles/home.css"
import * as htmlToImage from 'html-to-image'
import { booksOfBible } from '../bibleBooks.js'
import bg1 from "../imgs/bg-1.jpg"
import bg2 from "../imgs/bg-2.jpg"
import bg3 from "../imgs/bg-3.jpg"
import bg4 from "../imgs/bg-4.jpg"
import bg5 from "../imgs/bg-5.jpg"
import bg6 from "../imgs/bg-6.jpg"
import download from 'downloadjs'


let userVerse = "In the beginning, God created the heavens and the earth.";
let userRef = "Genesis 1:1"

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
                setText(data.text);
                userVerse = data.text;
                userRef = data.reference;
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
                            {booksOfBible.map((book) => (<option key={book} value={book}>{book}</option>))}
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

    const imgList = [bg1, bg2, bg3, bg4, bg5, bg6]
    const colList = ["red", "blue", "green", "yellow", "white", "black"]

    const [currImg, setCurrImg] = useState(bg1)
    const [fCol, setFCol] = useState({ color: "white" })

    const imgClicked = (e, img) => {
        e.preventDefault();
        setCurrImg(img);
    }

    const colClicked = (e, col) => {
        e.preventDefault();
        setFCol({ color: col })
    }

    const downImg = (e) => {
        e.preventDefault();
        htmlToImage.toPng(document.getElementById("img-container"))
            .then(function (dataUrl) {
                download(dataUrl, userRef + '-pic.png');
            })
            .catch(function (error) {
                alert(error)
            })
    }

    return (
        <>
            <div className="editing-grid">
                <div id="img-container">
                    <img className="img-bg" src={currImg} alt="current-img-bg" />
                    <p className='img-verse' style={fCol} >{userVerse}</p>
                </div>

                <div className="img-grid">
                    {imgList.map((bg) => (<img className="img-grid-item" src={bg} alt={bg} key={bg} onClick={event => imgClicked(event, bg)} />))}
                </div>
                <div className="color-grid">
                    {colList.map((col) => (<div className="img-grid-item" style={{ background: col }} key={col} onClick={event => colClicked(event, col)}></div>))}
                </div>

            </div>
            <button onClick={downImg} className="save-button">Save IMG</button>

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