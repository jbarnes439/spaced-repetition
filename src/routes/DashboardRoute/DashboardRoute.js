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
        return (
          <li>
            <WordCard
              key={word.id}
              word={word} />
          </li>
        )
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
          <Link to='/learn'><button>Start practicing</button></Link>
          <h3>Words to practice</h3>
        </section>
      </div>
    );
  }
  render() {

    return (
      <div>
        {this.renderDashBoard()}
        <section >
          <ul>
            {this.renderUpcomingWords()}
          </ul>
        </section>
        <section>
          <h4>Total correct answers: {this.state.total_count}</h4>
        </section>
      </div>

    );
  }
}

export default DashboardRoute
