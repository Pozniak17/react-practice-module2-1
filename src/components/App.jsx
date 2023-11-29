import { useEffect, useMemo, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Bars } from 'react-loader-spinner';
import { QuizForm } from './QuizForm/QuizForm';
import { SearchBar } from './SearchBar/SearchBar';
import { QuizList } from './QuizList/QuizList';
import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';
import { addNewQuiz, deleteQuizById, fetchQuizzes } from './utils/api';

const initialFilters = {
  topic: '',
  level: 'all',
};

const storageKey = 'quiz-filters';
// Читаємо фільтри з localStorage, якщо не дорівнює null, то повертаємо розпашині savedFilters, а якщо дорівнює null => повертаємо initialFilters
// ця функція буде викликана до монтування - синхронно. А всі useEffect - запускаються асинхронно.
const getInitialFilters = () => {
  const savedFilters = window.localStorage.getItem(storageKey);
  // if (savedFilters !== null) {
  //   return JSON.parse(savedFilters);
  // }
  // return initialFilters;
  // через тернарний оператор
  return savedFilters !== null ? JSON.parse(savedFilters) : initialFilters;
};

export const App = () => {
  const [quizItems, setQuizItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState(getInitialFilters);

  // ефект - аналог componentDidMount та в ньому HTTP-запит.
  useEffect(() => {
    async function qetQuizzes() {
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

    qetQuizzes();
  }, []);

  // ефект на запис в localStorage по зміні filters
  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(filters));
  }, [filters]);

  // додаємо, після того як дочекалися відповіді від бекенду
  const addQuiz = async newQuiz => {
    try {
      setIsLoading(true);
      error(false);
      const addedQuiz = await addNewQuiz(newQuiz);
      // this.setState(prevState => ({
      //   quizItems: [...prevState.quizItems, addedQuiz],
      // }));
      setQuizItems(prevItems => [...prevItems, addedQuiz]);

      // ❌ ЧЕКАЄМО USE EFFECT!!! ЗАЦИКЛЮВАННЯ!
      // setQuizItems([...quizItems, addedQuiz])
    } catch (error) {
      setError(true);
      toast.error('ERROR ADDING QUIZ!');
    } finally {
      setIsLoading(false);
    }
  };

  // Якщо не співпадає ід, то повернути.
  const deleteQuiz = async quizId => {
    try {
      setIsLoading(true);
      setError(error);
      const deletedQuiz = await deleteQuizById(quizId);

      setQuizItems(prevItems =>
        prevItems.filter(item => item.id !== deletedQuiz.id)
      );
      // this.setState(prevState => ({
      //   quizItems: prevState.quizItems.filter(
      //     item => item.id !== deletedQuiz.id
      //   ),
      // }));
    } catch (error) {
      toast.error('ERROR DELETING QUIZ!');
    } finally {
      setIsLoading(false);
    }
  };

  // для зміни фільтру
  const updateTopicFilter = newTopic => {
    setFilters(prevState => ({
      ...prevState,
      topic: newTopic,
    }));
  };

  //для зміни селекту
  const updateLevelFilter = newLevel => {
    setFilters(prevState => ({
      ...prevState,
      level: newLevel,
    }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  // множинна фільтрація по топіку і по селекту
  // при зміні isLoading, error - ця логіка не перерендериться, завдяки useMemo
  // const visibleQuizItems = useMemo(() => {
  //   quizItems.filter(item => {
  //     const hasTopic = item.topic
  //       .toLowerCase()
  //       .includes(filters.topic.toLowerCase());

  //     if (filters.level === 'all') {
  //       return hasTopic;
  //     }

  //     const matchesLevel = item.level === filters.level;
  //     return hasTopic && matchesLevel;
  //   });
  // }, [quizItems, filters]);

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
    <Layout>
      {/* <Basics /> */}
      <QuizForm onAdd={addQuiz} />
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
        <b>Oops! Something went wrong! Please try reloading this page!😔</b>
      )}
      {visibleQuizItems.length > 0 && (
        <QuizList items={visibleQuizItems} onDelete={deleteQuiz} />
      )}
      <GlobalStyle />
      <Toaster />
    </Layout>
  );
};
