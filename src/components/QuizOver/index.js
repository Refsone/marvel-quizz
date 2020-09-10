import React, { useEffect, useState } from 'react'
import { GiTrophyCup } from 'react-icons/gi'
import Loader from '../Loader'

const QuizOver = React.forwardRef((props, ref) => {
    
    const {
        levelNames, 
        score, 
        maxQuestions, 
        quizLevel, 
        percent,
        loadLevelQuestions
    } = props

    const [asked, setAsked] = useState([])
    console.log(asked)

    useEffect(() => {
        setAsked(ref.current)
    },[ref])


   
    const averageGrade = maxQuestions / 2

    if (score < averageGrade) {
        setTimeout(() => {loadLevelQuestions(quizLevel)}, 3000)
    }

    const decision = score >= averageGrade ? (
        <>
            <div className="stepsBtnContainer">
            {
                quizLevel < levelNames.length ? 
                (
                    <>
                        <p className="successMsg">
                        <GiTrophyCup size='50px' /> Bravo, passez au niveau suivant !</p>
                        <button 
                            className="btnResult success"
                            onClick={() => loadLevelQuestions(quizLevel)}
                            >
                            Niveau suivant
                        </button>
                    </>
                )
                :
                (
                    <>
                        <p className="successMsg">Bravo, vous êtes un expert</p>
                        <button 
                            className="btnResult gameOver"
                            onClick={() => loadLevelQuestions(0)}
                            >
                            Accueil
                        </button>
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
              <Loader 
                loadingMsg={"Pas de réponse"}
                styling={{textAlign: "center", color: "red"}}
              />
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