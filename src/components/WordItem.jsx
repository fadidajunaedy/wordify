import { useRef, useState } from "react"
import { FaPlay, FaPause } from "react-icons/fa"

const WordItem = ({ word }) => {
    const audioRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)
  
    const handleAudioToggle = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
            } else {
                audioRef.current.play()
            }
        }
    }
  
    const handleAudioEnd = () => {
        setIsPlaying(false)
    }

    return (
        <>
            <article className="grow flex flex-col gap-8" aria-labelledby="article-title">
                <section className="flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                        <h1 id="article-title" className="text-4xl md:text-6xl font-bold">
                            {word.word}
                        </h1>
                        <span className="text-xl md:text-2xl text-primary" aria-label="Phonetic pronunciation">
                            {word.phonetic}
                        </span>
                    </div>

                    {word?.phonetics.find((item) => item.audio !== "") && (
                    <>
                        <button
                        type="button"
                        onClick={handleAudioToggle}
                        className="rounded-full bg-primary w-16 h-16 aspect-square flex justify-center items-center text-base-100"
                        aria-label={isPlaying ? "Pause pronunciation audio" : "Play pronunciation audio"}
                        aria-pressed={isPlaying}
                        >
                        {isPlaying ? <FaPause /> : <FaPlay />}
                        </button>
                        <audio
                        ref={audioRef}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onEnded={handleAudioEnd}
                        className="hidden"
                        aria-hidden="true">
                        <source
                        src={`${word?.phonetics.find((item) => item.audio !== "")?.audio}`}
                        type="audio/mpeg"/>
                        </audio>
                    </>
                    )}
                </section>

                {word.meanings.map((meaning, i) => (
                <section key={i} className="flex flex-col gap-4" aria-labelledby={`meaning-${i}`}>
                    <div className="w-full flex items-center gap-2">
                        <h2 id={`meaning-${i}`} className="italic font-bold">
                        {meaning.partOfSpeech}
                        </h2>
                        <span className="grow divider" aria-hidden="true" />
                    </div>

                    <h3 className="text-slate-500">Meaning</h3>
                    <ul className="list-disc list-outside marker-primary ml-4 flex flex-col gap-4">
                    {meaning.definitions?.map((definition, i) => (
                        <li key={i}>
                            <div className="flex flex-col gap-2">
                                {definition.definition}
                                {definition.example && <q className="text-slate-500">{definition.example}</q>}
                            </div>
                        </li>
                    ))}
                    </ul>

                    {meaning.synonyms.length > 0 && (
                    <div className="w-full flex items-start gap-2">
                        <h3 id={`synonyms-${i}`}>Synonyms:</h3>
                        <dl aria-labelledby={`synonyms-${i}`} className="flex flex-wrap">
                            {meaning.synonyms.map((synonym, j) => (
                            <dd key={j} className="ml-2 inline text-primary font-semibold">
                                {synonym}
                                {j < meaning.synonyms.length - 1 && ","}
                            </dd>
                            ))}
                        </dl>
                    </div>
                    )}

                    {meaning.antonyms.length > 0 && (
                    <div className="w-full flex items-start gap-2">
                        <h3 id={`antonyms-${i}`}>Antonyms:</h3>
                        <dl aria-labelledby={`antonyms-${i}`} className="flex flex-wrap">
                            {meaning.antonyms.map((antonym, j) => (
                            <dd key={j} className="ml-2 inline text-primary font-semibold">
                                {antonym}
                                {j < meaning.antonyms.length - 1 && ","}
                            </dd>
                            ))}
                        </dl>
                    </div>
                    )}
                </section>
                ))}

                <section className="flex flex-col gap-4" aria-labelledby={`sources`}>
                    <span className="grow divider" aria-hidden="true" />
                    <h3 className="text-slate-500">Source</h3>
                    <ul className="list-disc list-outside marker-primary ml-4 flex flex-col gap-4">
                    {word.sourceUrls?.map((source, i) => (
                        <li key={i}>
                            <a href={source} target="_blank" className="link">{source}</a>
                        </li>
                    ))}
                    </ul>
                </section>
            </article>
        </>
    )
}

export default WordItem