import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistic = ({ result, text }) => (
    <tr>
        <td>{text}</td>
        <td>{result}</td>
    </tr>
)

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad
    const average = (good * 1 + neutral * 0 + bad * -1) / total

    if (total === 0) {
        return (
            <div>
                <p>Ei yhtään palautetta annettu.</p>
            </div>
        )
    }

    return (
        <div>
            <table>
            <tbody>
                <Statistic text="Hyvä" result={good} />
                <Statistic text="Neutraali" result={neutral} />
                <Statistic text="Huono" result={bad} />
                <Statistic text="Yhteensä" result={total} />
                <Statistic text="Keskiarvo" result={average} />
                <Statistic text="Positiivisia" result={`${(good / total) * 100}%`} />
                </tbody>
            </table>
        </div>
    )

}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>Anna palautetta</h1>
            <Button handleClick={() => setGood(good + 1)} text="hyvä" />
            <Button handleClick={() => setNeutral(neutral + 1)} text="neutraali" />
            <Button handleClick={() => setBad(bad + 1)} text="huono" />
            <h1>Statistiikka</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)