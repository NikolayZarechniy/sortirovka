import Counter from "./page/counter.tsx"
import "./App.css"
import { useState } from "react"

export default function App() {
  const [clicks, updateClicks] = useState<number>(0)

  const handleClick = () => updateClicks(state => state + 1)

  return (
    <>
      <p>Кликов: {clicks}</p>
      <section id="center">
        <Counter min={null} max={10} updateClicks={handleClick} />
        <Counter min={3} max={null} updateClicks={handleClick} />
      </section>
    </>
  )
}