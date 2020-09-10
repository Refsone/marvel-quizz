import React, { useEffect, useState } from 'react'
import { GiTrophyCup } from 'react-icons/gi'
import Loader from '../Loader'
import Modal from '../Modal'
import axios from 'axios'

const QuizOver = React.forwardRef((props, ref) => {
    
    const {
        levelNames, 
        score, 
        maxQuestions, 
        quizLevel, 
        percent,
        loadLevelQuestions
    } = props

    const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY
    const hash = '169130f941c7f2964e8cd1f700d6a872'
    
    const [asked, setAsked] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [characterInfo, setCharacterInfo] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setAsked(ref.current)

        if(localStorage.getItem('marvelStorageDate')) {
            const date = localStorage.getItem('marvelStorageDate')
            checkDataAge(date)
        }
    },[ref])

    const checkDataAge = date => {
        const today = Date.now()
        const timeDifference = today - date

        const daysDifference = timeDifference / (1000 * 3600 * 24) 

        if (daysDifference >= 15 ) {
            localStorage.clear();
            localStorage.setItem('marvelStorageDate', Date.now())
        }
    }

    const showModal = id => {
        setOpenModal(true)

        if(localStorage.getItem(id)) {

            setCharacterInfo(JSON.parse(localStorage.getItem(id)))
            setLoading(false)

        } else {

            axios
            .get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
            .then(res => {
                setCharacterInfo(res.data)
                setLoading(false)
                localStorage.setItem(id, JSON.stringify(res.data))
                if(!localStorage.getItem('marvelStorageDate')) {
                    localStorage.setItem('marvelStorageDate', Date.now())
                }
            })    
            .catch(error => console.log(error)) 
        }

     
    }

    const hideModal = () => {
        setOpenModal(false)
        setLoading(true)
    }
   
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
                        <button 
                            className="btnInfo"
                            onClick={() => showModal(question.heroId)}
                        >
                        Info
                        </button>
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
    
    const resultInModal = !loading ? (
        <>
        <div className="modalHeader">
            <h2>{characterInfo.data.results[0].name}</h2>
        </div>
        <div className="modalBody">
            <h3>Titre 2</h3>
        </div>
        <div className="modalFooter">
            <button className="modalBtn">Fermer</button>
        </div>
    </>
    )
    :
    (
        <>
        <div className="modalHeader">
            <h2>Réponse de Marvel...</h2>
        </div>
        <div className="modalBody">
            <Loader />
        </div>
    </>
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
            <Modal 
                showModal={openModal}
                hideModal={hideModal}
                >
                { resultInModal }
            </Modal>
        </>
    )
})

export default React.memo(QuizOver)