// import { Basics } from 'Basics';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import { QuizForm } from './QuizForm/QuizForm';
import { SearchBar } from './SearchBar/SearchBar';
import { QuizList } from './QuizList/QuizList';
import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';
import initialQuizItems from './json/quiz-items.json';

const initialFilters = {
  topic: '',
  level: 'all',
};

const storageKey = 'quiz-filters';

export class App extends Component {
  state = {
    quizItems: initialQuizItems,
    filters: initialFilters,
  };

  // якщо в localStorage не null, приводимо до об'єкта і записуємо в state.
  componentDidMount() {
    const savedFilters = window.localStorage.getItem(storageKey);
    if (savedFilters !== null) {
      this.setState({ filters: JSON.parse(savedFilters) });
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
  deleteQuiz = quizId => {
    this.setState(prevState => {
      return {
        quizItems: prevState.quizItems.filter(item => item.id !== quizId),
      };
    });
  };

  addQUiz = newQuiz => {
    const quiz = { ...newQuiz, id: nanoid() };
    this.setState(prevState => {
      return {
        quizItems: [...prevState.quizItems, quiz],
      };
    });
  };

  render() {
    const { quizItems, filters } = this.state;

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
        {visibleQuizItems.length > 0 && (
          <QuizList items={visibleQuizItems} onDelete={this.deleteQuiz} />
        )}
        <GlobalStyle />
      </Layout>
    );
  }
}
