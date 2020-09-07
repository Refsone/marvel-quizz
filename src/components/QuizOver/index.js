import React, { useEffect, useState } from 'react'

const QuizOver = React.forwardRef((props, ref) => {
    
    const {
        levelNames, 
        score, 
        maxQuestions, 
        quizLevel, 
        percent
    } = props

    const [asked, setAsked] = useState([])
    console.log(asked)

    useEffect(() => {
        setAsked(ref.current)
    },[ref])

    const averageGrade = maxQuestions / 2
    const decision = score >= averageGrade ? (
        <>
            <div className="stepsBtnContainer">
            {
                quizLevel < levelNames.length ? 
                (
                    <>
                        <p className="successMsg">Bravo, passez au niveau suivant !</p>
                        <button className="btnResult success">Niveau suivant</button>
                    </>
                )
                :
                (
                    <>
                        <p className="successMsg">Bravo, vous êtes un expert</p>
                        <button className="btnResult gameOver">Niveau suivant</button>
                    </>
                )
            }
            </div>   
            <div className="percentage">
                <div className="progressPercent">Réussie : {percent}</div>
                <div className="progressPercent">Note: {score}/{maxQuestions}</div>
            </div> 
        </>
    ) 
    : 
    (
        <>
             <div className="stepsBtnContainer">
                <p className="failureMsg">Vous avez échoué !</p>
            </div>
            <div className="percentage">
                <div className="progressPercent">Réussie : {percent}</div>
                <div className="progressPercent">Note: {score}/{maxQuestions}</div>
            </div>
        </>
    )


    const questionAnswer = score >= averageGrade ? (
        asked.map(question => {
            return (
                <tr key={question.id}>
                    <td>{question.question}</td>
                    <td>{question.answer}</td>
                    <td>
                        <button className="btnInfo">Info</button>
                    </td>
                </tr>
            )
        })
    )
    :
    (
        <tr>
            <td colSpan="3">
                <p style={{textAlign: "center", color: "red"}}>Pas de réponse</p>
            </td>
        </tr>
    )
    

    return (
        <>
           {decision}
            <hr />
            <p>Les réponses aux questions posées :</p>

            <div className="answerContainer">
                <table className="answers">
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Réponse</th>
                            <th>Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questionAnswer}
                    </tbody>
                </table>
            </div>
        </>
    )
})

export default React.memo(QuizOver)