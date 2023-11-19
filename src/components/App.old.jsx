import { Component } from 'react';
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

export class App extends Component {
  state = {
    quizItems: [],
    isLoading: false,
    error: false,
    filters: initialFilters,
  };

  // якщо в localStorage не null, приводимо до об'єкта і записуємо в state.
  async componentDidMount() {
    const savedFilters = window.localStorage.getItem(storageKey);
    if (savedFilters !== null) {
      this.setState({ filters: JSON.parse(savedFilters) });
    }
    try {
      this.setState({ isLoading: true, error: false });
      const initialQuizzes = await fetchQuizzes();
      this.setState({ quizItems: initialQuizzes });
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ isLoading: false });
    }
  }
  // якщо змінюється level або topic - записати в LS
  // якщо об'єкт фільтра з попереднього рендеру на поточний - змінився,
  // записати в LS. було ось так
  // prevState.filters.level !== this.state.filters ||
  // prevState.filters.topic !== this.state.filters.topic
  // те саме, різні посилання
  componentDidUpdate(prevProps, prevState) {
    if (prevState.filters !== this.state.filters) {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify(this.state.filters)
      );
    }
  }

  // для зміни фільтру
  updateTopicFilter = newTopic => {
    this.setState(prevState => {
      return {
        filters: {
          ...prevState.filters,
          topic: newTopic,
        },
      };
    });
  };

  //для зміни селекту
  updateLevelFilter = newLevel => {
    this.setState(prevState => {
      return {
        filters: {
          ...prevState.filters,
          level: newLevel,
        },
      };
    });
  };

  resetFilter = () => {
    this.setState({
      filters: initialFilters,
    });
  };

  // Якщо не співпадає ід, то повернути.
  deleteQuiz = async quizId => {
    try {
      this.setState({ isLoading: true, error: false });
      const deletedQuiz = await deleteQuizById(quizId);
      this.setState(prevState => ({
        quizItems: prevState.quizItems.filter(
          item => item.id !== deletedQuiz.id
        ),
      }));
    } catch (error) {
      toast.error('ERROR DELETING QUIZ!');
    } finally {
      this.setState({ isLoading: false });
    }
    // this.setState(prevState => {
    //   return {
    //     quizItems: prevState.quizItems.filter(item => item.id !== quizId),
    //   };
    // });
  };

  // додаємо, після того як дочекалися відповіді від бекенду
  addQUiz = async newQuiz => {
    try {
      this.setState({ isLoading: true, error: false });
      const addedQuiz = await addNewQuiz(newQuiz);
      this.setState(prevState => ({
        quizItems: [...prevState.quizItems, addedQuiz],
      }));
    } catch (error) {
      this.setState({ error: true });
      toast.error('ERROR ADDING QUIZ!');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  //   const quiz = { ...newQuiz, id: nanoid() };

  //   this.setState(prevState => {
  //     return {
  //       quizItems: [...prevState.quizItems, quiz],
  //     };
  //   });
  // };

  render() {
    const { quizItems, filters, isLoading, error } = this.state;

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
        <QuizForm onAdd={this.addQUiz} />
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
          <QuizList items={visibleQuizItems} onDelete={this.deleteQuiz} />
        )}
        <GlobalStyle />
        <Toaster />
      </Layout>
    );
  }
}
