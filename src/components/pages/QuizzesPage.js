import toast from 'react-hot-toast';
import { deleteQuizById, fetchQuizzes } from 'components/utils/api';
import { useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';
import { QuizList } from 'components/QuizList/QuizList';
import { SearchBar } from 'components/SearchBar/SearchBar';

const initialFilters = {
  topic: '',
  level: 'all',
};

const storageKey = 'quiz-filters';

// фільтрація
const getInitialFilters = () => {
  const savedFilters = window.localStorage.getItem(storageKey);
  return savedFilters !== null ? JSON.parse(savedFilters) : initialFilters;
};

export default function QuizzesPage() {
  const [quizItems, setQuizItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState(getInitialFilters);

  useEffect(() => {
    async function getQuizzes() {
      try {
        setIsLoading(true);
        setError(false);
        const initialQuizzes = await fetchQuizzes();
        setQuizItems(initialQuizzes);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getQuizzes();
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(filters));
  }, [filters]);

  const deleteQuiz = async quizId => {
    try {
      setIsLoading(true);
      const deletedQuiz = await deleteQuizById(quizId);
      setQuizItems(prevItems =>
        prevItems.filter(item => item.id !== deletedQuiz.id)
      );
    } catch (error) {
      toast.error('ERORR DELETING QUIZ!');
    } finally {
      setIsLoading(false);
    }
  };

  const updateTopicFilter = newTopic => {
    setFilters(prevFilters => ({
      ...prevFilters,
      topic: newTopic,
    }));
  };

  const updateLevelFilter = newLevel => {
    setFilters(prevFilters => ({
      ...prevFilters,
      level: newLevel,
    }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const visibleQuizItems = quizItems.filter(item => {
    const hasTopic = item.topic
      .toLowerCase()
      .includes(filters.topic.toLowerCase());

    if (filters.level === 'all') {
      return hasTopic;
    }

    const matchesLevel = item.level === filters.level;
    return hasTopic && matchesLevel;
  });

  return (
    <div>
      <SearchBar
        filters={filters}
        onUpdateTopic={updateTopicFilter}
        onUpdateLevel={updateLevelFilter}
        onReset={resetFilters}
      />
      {isLoading && (
        <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
      {error && (
        <b>Oops! Something went wrong! Please try reloading this page! 🥹</b>
      )}
      {visibleQuizItems.length > 0 && (
        <QuizList items={visibleQuizItems} onDelete={deleteQuiz} />
      )}
    </div>
  );
}
