import { useEffect, useState } from 'react'
import { FaGithub, FaGithubSquare, FaLinkedin, FaQuoteLeft } from 'react-icons/fa'
import './App.css'
import './index.css'

export default function App(){
  // only thing left to do is add some styling.
  // ref: https://random-quote-machine.freecodecamp.rocks/

  const [quotes, setQuotes] = useState({
    quote: "The good news is you came a long way, the bad news is you went the wrong way.",
    character: 'Jermaine Cole'
  })
  
  // #E81AI3
  const generateRandomColor = () => {
    let letters =  'ABCDEF1234567890'
    let hexCode = '#'
    for(let i = 0; i < 6; i++){
      hexCode += letters.charAt(Math.floor(Math.random() * letters.length))
    }
    return hexCode
  }

  const [currentColor, setCurrentColor] = useState(() => generateRandomColor())



  const styling = {
    backgroundColor: currentColor,
    transition: '3s',
  }

  const styling2 = {
    color: currentColor,
    transition: '3s'
  }
  
  const [count, setCount] = useState(0)

  const getQuote = () => {
    const fetchData = async () => {
      const result = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes')
      result.json().then((data) => setQuotes({
        quote: data[0].quote,
        character: data[0].character
      }))
    }

    fetchData()

    setCurrentColor(generateRandomColor)
    setCount(true)
    setTimeout(() => {
      setCount(false)
    }, 1000)

  }

  return(
    <main style={styling}>
      <article>
        <div className="quoteContainer">
          <h1 className={count ? 'quote' : 'altQuote'} style={styling2}><FaQuoteLeft className='quoteIcon'/> {quotes.quote}</h1>
        </div>
        <h3 className={count ? 'author' : 'altAuthor'} style={styling2}>- {quotes.character}</h3>
        <div className="bottomSection" style={styling2}>
          <FaLinkedin className='icon' />
          <FaGithubSquare className='icon'/>
          <button onClick={getQuote} style={styling}>New quote</button>
        </div>
      </article>
    </main>
  )
}