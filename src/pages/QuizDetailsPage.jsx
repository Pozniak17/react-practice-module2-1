import { fetchQuizById } from 'components/utils/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function QuizDetailsPage() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getQuiz() {
      try {
        setIsLoading(true);
        const fetchedQuiz = await fetchQuizById(quizId);
        setQuiz(fetchedQuiz);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }

    getQuiz();
  }, [quizId]);

  return (
    <div>
      {isLoading && <b>LOADING QUIZ...</b>}
      {quiz && <h1>{quiz.topic}</h1>}
    </div>
  );
}
