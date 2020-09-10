import React, { Component } from 'react'
import Levels from '../Levels/index'
import ProgressBar from '../ProgressBar/index'
import QuizOver from '../QuizOver/index'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QuizMarvel } from '../quizMarvel'
import { FaChevronRight } from 'react-icons/fa';

toast.configure()

const initialState = {
    levelNames: ["debutant", "confirme", "expert"],
    quizLevel: 0,
    maxQuestions: 10,
    storedQuestions: [],
    question: null,
    options: [],
    idQuestion: 0,
    btnDisabled: true,
    userAnwser: null,
    score: 0,
    showWelcomeMsg: false,
    quizEnd: false,
    percent: null
}

const levelNames = ["debutant", "confirme", "expert"]

class Quiz extends Component {

    constructor(props) {
        super(props)
        this.state = initialState
        this.storedDataRef = React.createRef()
    }

    loadQuestions = quizz => {
        const fetchArrayQuiz = QuizMarvel[0].quizz[quizz]
        if (fetchArrayQuiz.length >= this.state.maxQuestions) {
            this.storedDataRef.current = fetchArrayQuiz
            const newArray = fetchArrayQuiz.map(({answer, ...keepRest}) => keepRest)
            this.setState({ storedQuestions: newArray })
        }
    }

    showToastMsg = pseudo => {
        if (!this.state.showWelcomeMsg) {
            this.setState({ showWelcomeMsg: true })

            toast.warn(`Bienvenue ${pseudo}, et bonne chance !`, {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                bodyClassName: "toastify-color-welcome"
                });
        }
    }

    componentDidMount() {
        this.loadQuestions(levelNames[this.state.quizLevel])
    }
    
    componentDidUpdate(prevProps, prevState) {

        const {
            maxQuestions,
            storedQuestions,
            idQuestion,
            score,
            quizEnd, 
        } = this.state

        if((storedQuestions !== prevState.storedQuestions) && storedQuestions.length) {
            this.setState({
                question: storedQuestions[idQuestion].question,
                options: storedQuestions[idQuestion].options 
            })
        }
        if ((idQuestion !== prevState.idQuestion) && storedQuestions.length ) {
            this.setState({
                question: storedQuestions[idQuestion].question,
                options: storedQuestions[idQuestion].options,
                userAnwser: null,
                btnDisabled: true

            })
        }

        if(quizEnd !== prevState.quizEnd) {
            const gradePercent = this.getPercent(maxQuestions, score)
            this.gameOver(gradePercent)
        }

        if (this.props.userData.pseudo !== prevProps.userData.pseudo) {
            this.showToastMsg(this.props.userData.pseudo)
        }
    }
    
    handleClick = selectedAnswer => {
        this.setState({
            userAnwser: selectedAnswer,
            btnDisabled: false
        })
    }


    getPercent = (maxQuest, ourScore) => (ourScore / maxQuest) * 100

    gameOver = percent => {
        
        if (percent >= 50 ) {
            this.setState({
                quizLevel: this.state.quizLevel + 1,
                percent
            })
        } else {
            this.setState({percent})
        }
    }

    nextQuestion = () => {
        if (this.state.idQuestion === this.state.maxQuestions - 1 ) {
            this.setState({ quizEnd: true })

        } else {
            this.setState(prevState => ({ idQuestion: prevState.idQuestion + 1 }))
        }
        const goodAnwser = this.storedDataRef.current[this.state.idQuestion].answer
        if (this.state.userAnwser === goodAnwser) {
            this.setState( prevState => ({
                score: prevState.score + 1
            }))
            toast.success('Bravo + 1 !', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                bodyClassName: "toastify-color"
                });
        } else {
            toast.error('Raté 0 !', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                bodyClassName: "toastify-color"
                });
        }
    }

    loadLevelQuestions = param => {
        this.setState({...initialState, quizLevel: param})
        this.loadQuestions(levelNames[param])
    }

    render() {

    const {
        quizLevel,
        maxQuestions,  
        question,
        options,
        idQuestion,
        btnDisabled,
        userAnwser,
        score,
        quizEnd,
        percent 
    } = this.state

        const displayOptions = options.map((option, index) => {
            return (
            <p 
                key={index} 
                className={`answerOptions ${userAnwser === option ? "selected" : null}`}
                onClick={() => this.handleClick(option)}
            >
                <FaChevronRight />
                {option}
                </p>
            )
        })

        return quizEnd ? (
            <QuizOver
                ref={this.storedDataRef} 
                levelNames={levelNames}
                score={score}
                maxQuestions={maxQuestions}
                quizLevel={quizLevel}
                percent={percent}
                loadLevelQuestions={this.loadLevelQuestions}
            />
        ) : 
        (
            <>
                <Levels
                    levelNames={levelNames}
                    quizLevel={quizLevel}
                />
                <ProgressBar 
                    idQuestion={idQuestion}
                    maxQuestions={maxQuestions}
                />
                <h2>{question}</h2>
                {displayOptions}
                <button 
                    disabled={btnDisabled} 
                    className="btnSubmit"
                    onClick={this.nextQuestion}
                >
                {idQuestion < maxQuestions - 1 ? "Suivant" : "Terminer"}
                </button>
            </>
        )
    }
}

export default Quiz
