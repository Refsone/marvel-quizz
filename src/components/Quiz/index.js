import React, { Component } from 'react'
import Levels from '../Levels/index'
import ProgressBar from '../ProgressBar/index'
import QuizOver from '../QuizOver/index'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QuizMarvel } from '../quizMarvel'

toast.configure()

class Quiz extends Component {

    state = {
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
        quizEnd: false
    }

    storedDataRef = React.createRef()

    loadQuestions = quizz => {
        const fetchArrayQuiz = QuizMarvel[0].quizz[quizz]
        if (fetchArrayQuiz.length >= this.state.maxQuestions) {
            this.storedDataRef.current = fetchArrayQuiz
            const newArray = fetchArrayQuiz.map(({answer, ...keepRest}) => keepRest)
            this.setState({
                storedQuestions: newArray
            })
        } else {
            console.log('Pas assez de questions')
        }
    }

    showWelcomeMessage = pseudo => {
        if (!this.state.showWelcomeMsg) {
            this.setState({
                showWelcomeMsg: true
            })
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
        this.loadQuestions(this.state.levelNames[this.state.quizLevel])
    }
    
    componentDidUpdate(prevProps, prevState) {
        if(this.state.storedQuestions !== prevState.storedQuestions) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options 
            })
        }
        if (this.state.idQuestion !== prevState.idQuestion) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options,
                userAnwser: null,
                btnDisabled: true

            })
        }
        if (this.props.userData.pseudo) {
            this.showWelcomeMessage(this.props.userData.pseudo)
        }
    }
    
    handleClick = selectedAnswer => {
        this.setState({
            userAnwser: selectedAnswer,
            btnDisabled: false
        })
    }

    gameOver = () => {
        this.setState({
            quizEnd: true
        })
    }

    nextQuestion = () => {
        if (this.state.idQuestion === this.state.maxQuestions - 1 ) {
            this.gameOver()
        } else {
            this.setState(prevState => ({
                idQuestion: prevState.idQuestion + 1
            }))
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

    render() {

        const displayOptions = this.state.options.map((option, index) => {
            return (
            <p 
                key={index} 
                className={`answerOptions ${this.state.userAnwser === option ? "selected" : null}`}
                onClick={() => this.handleClick(option)}
            >
                {option}
                </p>
            )
        })

        return this.state.quizEnd ? (
            <QuizOver />
        ) : 
        (
            <>
                <Levels />
                <ProgressBar 
                    idQuestion={this.state.idQuestion}
                    maxQuestions={this.state.maxQuestions}
                />
                <h2>{this.state.question}</h2>
                {displayOptions}
                <button 
                    disabled={this.state.btnDisabled} 
                    className="btnSubmit"
                    onClick={this.nextQuestion}
                >
                {this.state.idQuestion < this.state.maxQuestions - 1 ? "Suivant" : "Terminer"}
                </button>
            </>
        )
    }
}

export default Quiz
