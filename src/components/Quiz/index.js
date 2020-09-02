import React, { Component } from 'react'
import Levels from '../Levels/index'
import ProgressBar from '../ProgressBar/index'
import { QuizMarvel } from '../quizMarvel'

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
        score: 0
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
    }
    
    handleClick = selectedAnswer => {
        this.setState({
            userAnwser: selectedAnswer,
            btnDisabled: false
        })
    }

    nextQuestion = () => {
        if (this.state.idQuestion === this.state.maxQuestions - 1 ) {

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

        return (
            <div>
                <Levels />
                <ProgressBar />
                <h2>{this.state.question}</h2>
                {displayOptions}
                <button 
                    disabled={this.state.btnDisabled} 
                    className="btnSubmit"
                    onClick={this.nextQuestion}
                >
                Suivant
                </button>
            </div>
        )
    }
}

export default Quiz
