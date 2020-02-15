import {
  RECEIVE_USERS,
  UPDATE_USER_QUESTIONS,
  UPDATE_USER_ANSWERS
} from "../utils/constants";

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function updateUserQuestions (user, questionId) {
  return {
    type: UPDATE_USER_QUESTIONS,
    user,
    questionId,
  }
}

export function updateUserAnswers (user, questionId, vote) {
  return {
    type: UPDATE_USER_ANSWERS,
    user,
    questionId,
    vote,
  }
}
