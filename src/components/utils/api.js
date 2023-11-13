import axios from 'axios';

axios.defaults.baseURL = 'https://6551e3a25c69a7790329363e.mockapi.io/api';

// в mockapi в нас назва бекенду quizzes
export const fetchQuizzes = async () => {
  const response = await axios.get('/quizzes');
  return response.data;
};

export const addNewQuiz = async newQuiz => {
  const response = await axios.post('/quizzes', newQuiz);
  return response.data;
};

export const deleteQuizById = async quizId => {
  const response = await axios.delete(`/quizzes/${quizId}`);
  return response.data;
};

export const updateQuiz = async (quizId, update) => {
  const response = await axios.put(`/quizzes/${quizId}`, update);
  return response.data;
};
