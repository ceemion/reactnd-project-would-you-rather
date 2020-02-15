import React, { useState } from 'react';
import { connect } from 'react-redux';
import helpers from '../utils/helpers';
import { withRouter } from 'react-router-dom';
import { handleSaveQuestionVote } from '../actions/questions';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import PercentBar from '../components/PercentBar';

const QuestionDetails = (props) => {
  const {
    authUser,
    question,
    answered,
    dispatch,
    totalUsers,
    loadingBar,
  } = props;

  const [vote, setVote] = useState('');

  const handleSubmitVote = (e) => {
    e.preventDefault()
    dispatch(handleSaveQuestionVote(question.id, vote))
    setVote('')
  }

  const setActiveClass = (option) => {
    return vote === option ? 'option active' : 'option'
  }

  const isBtnDisabled = () => {
    return !vote || loadingBar.default === 1
  }

  if (question === null) {
    return (
      <>
      <NavBar />
      <div className="wrapper">
        <h2>Not Found</h2>

        <div className="wrapper-status">
          Poll does not exist
        </div>
      </div>
      </>
    )
  }

  return (
    <>
    <NavBar />

    <div className="wrapper question-details">
      <h5>{question.name} { answered ? 'asked:' : 'asks...' }</h5>

      <div className="body">
        <div className="user">
          <img src={question.avatar} alt={`${question.avatar} avatar`} width={100} />
        </div>

        <div className="questions">
          { answered ? (
            <>
              <h3>Poll Results</h3>

              <div className={`answer ${question.optionOneVotes.includes(authUser) ? 'selected' : ''}`}>
                <p>{question.optionOneText}</p>

                <PercentBar
                  progress={helpers.calcPercentage(question.optionOneVotes.length, totalUsers)}
                />
                <p>{question.optionOneVotes.length} out of {totalUsers} votes</p>
              </div>

              <div className={`answer ${question.optionTwoVotes.includes(authUser) ? 'selected' : ''}`}>
                <p>{question.optionTwoText}</p>

                <PercentBar
                  progress={helpers.calcPercentage(question.optionTwoVotes.length, totalUsers)}
                />
                <p>{question.optionTwoVotes.length} out of {totalUsers} votes</p>
              </div>
            </>
          ) : (
            <>
              <h3>Would you rather?</h3>

              <div className="options">
                <div className={setActiveClass('optionOne')} onClick={() => setVote('optionOne')}>
                  {question.optionOneText}
                </div>

                <div className={setActiveClass('optionTwo')} onClick={() => setVote('optionTwo')}>
                  {question.optionTwoText}
                </div>
              </div>
            </>
          ) }

          { answered || (
            <div className="cta">
              <Button
                id="vote-btn"
                text="Vote Now"
                type="primary"
                onClick={handleSubmitVote}
                isDisabled={isBtnDisabled()}
              />
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

const mapStateToProps = ({ authUser, questions, users, loadingBar }, { match }) => {
  const { question_id } = match.params;
  const question = questions[question_id]

  return {
    authUser,
    loadingBar,
    question: question ? helpers.formatQuestion(question, users) : null,
    answered: question ? helpers.questionAnswered(question, authUser) : false,
    totalUsers: Object.keys(users).length,
  }
}

export default withRouter(connect(mapStateToProps)(QuestionDetails));
