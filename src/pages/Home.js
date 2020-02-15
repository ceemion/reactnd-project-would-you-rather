import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionCard from '../components/QuestionCard';
import helpers from '../utils/helpers';
import NavBar from '../components/NavBar';

class Home extends Component {
  render() {
    return (
      <div>
        <NavBar />

        Welcome home.

        <div>
          <h2>Unanswered Questions ({this.props.unansweredQuestionsId.length})</h2>

          {
            this.props.unansweredQuestionsId.map(id => (
              <div key={id}>
                <QuestionCard id={id} />
              </div>
            ))
          }
        </div>

        <div>
          <h2>Answered Questions ({this.props.answeredQuestionsId.length})</h2>

          {
            this.props.answeredQuestionsId.map(id => (
              <div key={id}>
                <QuestionCard id={id} />
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ authUser, questions }) => {
  const sortedQuestions = Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp)

  return {
    unansweredQuestionsId: sortedQuestions
      .filter(key => helpers.questionNotAnswered(questions[key], authUser)),

    answeredQuestionsId: sortedQuestions
      .filter(key => helpers.questionAnswered(questions[key], authUser)),
  }
}

export default connect(mapStateToProps)(Home);
