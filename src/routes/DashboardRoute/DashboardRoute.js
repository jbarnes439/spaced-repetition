import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
import LanguageApiService from '../../services/language-api-service';
import WordCard from '../../components/WordCard/WordCard';

class DashboardRoute extends Component {
  state = {
    error: null,
    language: {},
    words: [],
    total_count: null,
  }

  static contextType = UserContext

  async componentDidMount() {
    await LanguageApiService.getLanguage()
      .then(data => { 
        this.setState({ 
          language: data.language,
          words: data.words,
          total_count: data.language.total_score,
        })
        this.context.setLanguage(data.language)
        this.context.setWords(data.words)        
      })
      .catch(this.context.setError)

  }

  renderUpcomingWords = () => {    
    if (this.context.words && this.context.words.length > 0) {
      return this.context.words.map((word) => {      
      return <WordCard
          key={word.id}
          word={word}
        />
      })
    }
  }

  renderDashBoard = () => {
    const { error } = this.state;
    return (
      <div>
        <div role='alert' className='red'>
          {error && <p>{error}</p>}
        </div>
        <section>
          <h2>Welcome back, ready to learn {this.context.language.name}?</h2>
          <h4>Bienvenido de nuevo, listo para aprender español?</h4>
        </section>

      </div>
    );
  }
  render() {

    return (
      <div>
        {this.renderDashBoard()}
        <Link to='/learn'><button>Start Learning</button></Link>
        <h4>Upcoming words: </h4>
        {this.renderUpcomingWords()}
        <section>
        <h4>Total correct answers: {this.state.total_count}</h4>
        </section>        
      </div>
      
    );
  }
}

export default DashboardRoute
