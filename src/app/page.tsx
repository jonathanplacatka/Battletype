"use client"

import { useState } from "react";
import HighlightText from "./HighlightText";

export default function Home() {
  const sentence = "one two three four five six seven"

  const [input, setInput] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  } 

  return (
    <main>
      <HighlightText value={sentence} compareString={input} />
      <input autoFocus onChange={onChange}/>
    </main>
  );
}
