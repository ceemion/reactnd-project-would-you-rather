import React, { useState } from 'react';
import { connect } from 'react-redux';
import { handleSaveQuestion } from '../actions/questions';

const NewQuestion = (props) => {
  const [formValues, setFormValues] = useState({
    optionOneText: '',
    optionTwoText: '',
  });

  const onTextChange = (e) => {
    const value = e.target.value;
    const name = e.target.name

    setFormValues(state => ({...state, [name]: value}))
  };

  const onSaveQuestion =  (event) => {
    event.preventDefault()
    props.dispatch(handleSaveQuestion(formValues))
  }

  return (
    <div>
      <h3>New Polling Question</h3>

      <form>
        <p>Complete the question:</p>

        <h4>Would you rather...</h4>

        <div>
          <input
            id="optionOne"
            type="text"
            name="optionOneText"
            value={formValues.optionOneText}
            onChange={onTextChange}
            placeholder="Option One..."
            required
          />
        </div>

        <div>
          <p>OR</p>
        </div>

        <div>
          <input
            id="optionTwo"
            type="text"
            name="optionTwoText"
            value={formValues.optionTwoText}
            onChange={onTextChange}
            placeholder="Option Two..."
            required
          />
        </div>

        <div>
          <button
            id="postPoll"
            type="submit"
            onClick={onSaveQuestion}>
              Post Poll
          </button>
        </div>
      </form>
    </div>
  )
}

export default connect()(NewQuestion);
