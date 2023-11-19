import { useState } from 'react';
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

export const App = () => {
  const [quizItems, setQuizItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState(initialFilters);

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
        prevItems.filter(item => item.id !== deleteQuiz.id)
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

  // множинна фільтрація по топіку і по селекту
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
        onUpdateTopic={this.updateTopicFilter}
        onUpdateLevel={this.updateLevelFilter}
        onReset={this.resetFilter}
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
