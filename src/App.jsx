import { useState } from "react";

import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [synonyms, setSynonyms] = useState([]);
  const URL='https://api.datamuse.com/words?rel_syn=';

const handleFetchSynonyms = (e) => {
  e.preventDefault();
  getSynonyms(word);
  setWord("");
  }

const  getSynonyms=async (word)=> {
  const response = await fetch(`${URL}${word}`);
  const data = await response.json();
  setSynonyms(data);
  setWord(word);
}

  return (
    <>
      <form onSubmit={handleFetchSynonyms}>
        <label htmlFor="word-input">Enter a word:</label>
        <input
          type="text"
          name="word"
          onChange={(e) => setWord(e.target.value)}
          id="word-input"
          value={word}
        />
        <button >
          Submit
        </button>
      </form>
      {synonyms.length>0?(<ul>
        {synonyms.map((synonym) => (
          <button key={synonym.word} onClick={()=>getSynonyms(synonym.word)}>
          <li>{synonym.word}</li>
          </button>
        ))}
      </ul>):(<>No synonyms found</>)}
      
    </>
  );
}

export default App;
