import { useEffect, useState } from "react"

import { IoClose, IoSearchOutline } from "react-icons/io5"
import WordItem from "./components/WordItem"
import Footer from "./components/Footer"
import Header from "./components/Header"

const useDebounce = (value, time = 500) => {
  const [debounceValue, setDebounceValue] = useState(value)
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value)
    }, time)

    return () => clearTimeout(timeout)
  }, [value, time])

  return debounceValue
} 

const App = () => {
  const [keyword, setKeyword] = useState("")
  const [words, setWords] = useState([])
  const [loading, setLoading] = useState(null)

  const debounceKeyword = useDebounce(keyword)

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        setWords([])
        if (debounceKeyword.length > 0) {
          const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${debounceKeyword}`)
          const data = await response.json()
          console.log(data)
          Array.isArray(data) && setWords(data)
        }
      } catch (error) {
        console.error("Error fetching words:", error)
        setWords([])
      } finally {
        setLoading(false)
      }
    })()
  }, [debounceKeyword])

  return (
    <>
      <Header />
      <main className="container min-h-[80vh] flex flex-col gap-4 py-4">
        <label className="input input-bordered input-lg rounded-full bg-base-200 flex items-center gap-2 focus:bg-red-200">
          <input 
          type="text" 
          tabIndex={0}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="grow peer font-bold" 
          placeholder="Search" />
          {keyword.length > 0 ? (
            <button 
            type="button"
            onClick={() => setKeyword("")}>
              <IoClose className="text-primary" size={24} />
            </button>
          ) : (
            <IoSearchOutline className="text-primary" size={24} />
          )}
        </label>
        <section className="grow flex flex-col gap-24 py-12">
        {loading ? (
          <article className="grow flex flex-col justify-center items-center text-center">
            <span className="loading loading-dots loading-lg"></span>
          </article>
        ) : (debounceKeyword && words.length > 0) ? words.map((word, index) => (
          <WordItem key={index} word={word} />
        )) : (debounceKeyword && words.length < 1) ? (
          <article className="grow flex flex-col justify-center">
            <h1 className="text-4xl md:text-6xl text-left font-bold text-red-500">Word Not Found</h1>
            <p className="mt-4 text-lg md:text-xl text-left text-slate-500">
              Sorry, we couldn't find any results for your search. 
              Please check your spelling or try another word.
            </p>
          </article>
        ) : (
          <article className="grow flex flex-col justify-center">
            <h1 className="text-4xl md:text-6xl text-left font-bold">Wordify</h1>
            <p className="mt-4 text-lg md:text-xl text-left text-slate-500">
              Discover the meaning, pronunciation, and synonyms of words at your fingertips. 
              Enhance your vocabulary with our interactive and user-friendly app.
            </p>
            <p className="mt-2 text-base md:text-lg text-left text-slate-500">
              Type a word in the search bar above to get started!
            </p>
          </article>
        )}
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App