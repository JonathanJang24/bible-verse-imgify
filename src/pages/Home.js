import { useState, useRef, useEffect } from 'react'
import "../styles/home.css"
import { booksOfBible } from '../utils/bibleBooks.js'
import bg1 from "../imgs/bg-1.jpg"
import bg2 from "../imgs/bg-2.jpg"
import bg3 from "../imgs/bg-3.jpg"
import bg4 from "../imgs/bg-4.jpg"
import bg5 from "../imgs/bg-5.jpg"
import bg6 from "../imgs/bg-6.jpg"
import Socials from "../utils/Socials.js"
import { exportComponentAsPNG } from 'react-component-export-image'
import { FaBan } from 'react-icons/fa'

let userRef = "Genesis 1:1"

// basic lifecycle for user rendering
if (localStorage.getItem("verse") === null) {
    localStorage.setItem("book", "Genesis")
    localStorage.setItem("chapter", "1")
    localStorage.setItem("verse", "1")
    localStorage.setItem("text", "In the beginning, God created the heavens and the earth.")
}

const IntroScreen = () => {

    const [inputs, setInputs] = useState({
        book: localStorage.getItem("book"),
        chapter: localStorage.getItem("chapter"),
        verse: localStorage.getItem("verse")
    });
    const [text, setText] = useState(localStorage.getItem("text"));

    const elementRef = useRef(null);

    useEffect(() => {

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch("https://bible-api.com/" + inputs.book + "%20" + inputs.chapter + ":" + inputs.verse)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then(data => {
                setText(data.text);
                userRef = data.reference;
                let tempInfo = userRef.split(/\s|:/)
                localStorage.setItem("book", tempInfo[0])
                localStorage.setItem("chapter", tempInfo[1])
                localStorage.setItem("verse", tempInfo[2])
                localStorage.setItem("text", data.text)
            }
            )
            .catch((error) => {
                alert("that Bible address doesn't seem to exist...\ntry checking the dead sea scrolls again")
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

    let charCount = (localStorage.getItem("text")).length
    let fontNum = 400 / Math.sqrt(charCount) + 1

    const imgRef = useRef();

    const imgList = [bg1, bg2, bg3, bg4, bg5, bg6]

    const [currImg, setCurrImg] = useState(bg1)

    const [fontSelect, setFontSelect] = useState(fontNum)
    const [fontSizeStyle, setFontSizeStyle] = useState({ fontSize: fontNum })

    const [fCol, setFCol] = useState("#ffffff")
    const [textCol, setTextCol] = useState({ color: "white" })
    const [textBg, setTextBg] = useState("#000000")
    const [textBgCol, setTextBgCol] = useState({ background: "transparent" })

    const imgClicked = (e, img) => {
        e.preventDefault();
        setCurrImg(img);
    }

    const colClicked = (e, col) => {
        setFCol(e.target.value)
        setTextCol({ color: fCol })
    }

    const fontSlided = (e) => {
        setFontSelect(e.target.value);
        setFontSizeStyle({ fontSize: parseFloat(e.target.value) })
    }

    const textBgSelected = (e) => {
        setTextBg(e.target.value)
        setTextBgCol({ background: textBg })
    }

    const setTextBgTrans = () => {
        setTextBgCol({ background: "transparent" })
    }

    const randomCustom = () => {

        const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')

        console.log(Math.random() * (fontNum * 1.25))

        let randImg = imgList[Math.floor(Math.random() * imgList.length)]
        let randFontSize = Math.random() * ((fontNum * 1.25) - 1) + 1
        let randFontColor = "#" + genRanHex(6)
        let randFontBgColor = "#" + genRanHex(6)

        setCurrImg(randImg)

        setFCol(randFontColor)
        setTextCol({ color: randFontColor })

        setTextBg(randFontBgColor)
        setTextBgCol({ background: randFontBgColor })

        setFontSelect(randFontSize)
        setFontSizeStyle({ fontSize: randFontSize })

    }

    return (
        <>
            <div className="editing-grid">
                <div ref={imgRef} id="img-container">
                    <img className="img-bg" src={currImg} alt="current-img-bg" />
                    <p className='img-verse' style={{ ...textCol, ...fontSizeStyle }} ><span style={textBgCol} id="text-highlight">{localStorage.getItem("text")}</span></p>
                </div>

                <div className="options-grid">
                    <div className="img-grid">
                        {imgList.map((bg) => (<img className="img-grid-item" src={bg} alt={bg} key={bg} onClick={event => imgClicked(event, bg)} />))}
                    </div>
                    <div className="color-grid">
                        <h3>Font Color</h3>
                        <input type="color" id="text-col-selector" value={fCol} name="text-color" onChange={e => colClicked(e)} />
                    </div>
                    <div className="font-size-grid">
                        <h3>Font-size</h3>
                        <input id="font-slider" type="range" min="1" max={fontNum * 1.25} step={fontNum / 25} value={fontSelect} name="font-slider" onChange={e => fontSlided(e)} />
                    </div>
                    <div className="background-text-grid">
                        <h3>Font Background Color</h3>
                        <input type="color" id="background-text-selector" value={textBg} name="text-bg-color" onChange={e => textBgSelected(e)} />
                        <button id="text-bg-transparent-btn" onClick={setTextBgTrans}><FaBan /></button>
                    </div>
                    <div className="random-grid">
                        <button id="random-btn" onClick={randomCustom}>Random</button>
                    </div>
                </div>
            </div>
            <button onClick={() => exportComponentAsPNG(imgRef, { fileName: userRef + "-img" })} className="save-button">Save IMG</button>

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
                <Socials />
            </>
        )
    }
    else {
        return (
            <>
                <button onClick={changeBol} className="back-button">Back</button>
                <ImgScreen />
                <Socials />
            </>
        )
    }


}

export default Home;