import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import LanguageApiService from '../../services/language-api-service';
import Feedback from '../../components/Feedback/FeedBack';

class LearningRoute extends Component {
  state = {
    word: '',
    error: null,
    userAnswer: '',
    loading: false,
    prevAnswer: '',
    answeredCorrect: null,
    answerSubmitted: false,
    // set to render question if feedback isn't required yet
    firstVisit: true,
  }

  static contextType = UserContext;


  async componentDidMount() {
    // get and set the first word to translate
    await LanguageApiService.getWordAtHead()
      .then(data =>
        this.setState({
          word: data.nextWord,
          timesCorrect: data.wordCorrectCount,
          timesIncorrect: data.wordIncorrectCount,
          totalScore: data.totalScore,
        })
      )
      .catch(this.context.setError)    
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({
      loading: true,
      prevWord: this.state.word,
      prevAnswer: this.state.userAnswer,
    })
    LanguageApiService.postAnswer(this.state.userAnswer)
      .then(res => {
        // ready response for user and ready state for next question
        this.setState({
          userAnswer: '',
          answer: res.answer,
          // prepare state to display next question
          nextWord: res.nextWord,
          nextTimesCorrect: res.wordCorrectCount,
          nextTimesIncorrect: res.wordIncorrectCount,
          totalScore: res.totalScore,
          answeredCorrect: res.isCorrect,
          // set for conditional render of feedback
          answerSubmitted: true,
          loading: false,
          firstVisit: false,
        })
      })
      .catch(this.context.setError)
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleNextQuestionClick = (e) => {    
    LanguageApiService.getWordAtHead()
      .then(data =>
        this.setState({
          word: data.nextWord,
          timesCorrect: data.wordCorrectCount,
          timesIncorrect: data.wordIncorrectCount,
          totalScore: data.totalScore,
          answerSubmitted: false,
        })
      )
      .catch(this.context.setError) 
  }

  render() {
      let {answerSubmitted, answeredCorrect} = this.state;    

      if (!answerSubmitted || this.state.firstVisit) { return (
        <div>
          <div className='wordCard'>
            {/* 'this.state.word &&' makes sure a word is loaded in state before attempting to render */}
            <h2>Translate the word:</h2>
            <span>{this.state.word && this.state.word}</span>
            <p>Your total score is: {this.state.totalScore && this.state.totalScore}</p>
            <p>You have answered this word correctly {this.state.timesCorrect && this.state.timesCorrect} times.</p>
            <p>You have answered this word incorrectly {this.state.timesIncorrect && this.state.timesIncorrect} times.</p>
            <form onSubmit={(event) => this.handleSubmit(event)} type='text'>
              <label htmlFor='learn-guess-input'>What's the translation for this word?</label>
              <input
                name='userAnswer'
                type='text'
                id='learn-guess-input'
                htmlFor='learn-guess-input'
                onChange={this.handleChange}
                value={this.state.userAnswer}
                required></input>
              <br />
              <button type='submit'>Submit Answer</button>
            </form>
          </div>
          <h2>Your total score is: {this.state.totalScore && this.state.totalScore}</h2>
        </div>
      );
      }  
      if (answeredCorrect) {
        // correct user answer feedback
       return <Feedback
          correctAnswer={this.state.answeredCorrect}
          prevWord={this.state.prevWord}
          prevAnswer={this.state.answer}
          nextQuestion={this.handleNextQuestionClick}
           />
           // incorrect user answer feedback
      } return <Feedback 
          correctAnswer={this.state.answeredCorrect}
          prevWord={this.state.prevWord}
          userAnswer={this.state.prevAnswer}
          actualAnswer={this.state.answer}
          nextQuestion={this.handleNextQuestionClick}/>
  }
}

export default LearningRoute
