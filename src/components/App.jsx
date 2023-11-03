// import { Basics } from 'Basics';
import { Component } from 'react';
import { QuizForm } from './QuizForm/QuizForm';
import { SearchBar } from './SearchBar/SearchBar';
import { QuizList } from './QuizList/QuizList';
import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';
import initialQuizItems from './json/quiz-items.json';

export class App extends Component {
  state = {
    quizItems: initialQuizItems,
    filters: {
      topic: '',
      level: 'all',
    },
  };

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
        <QuizForm />
        <SearchBar
          filters={filters}
          onUpdateTopic={this.updateTopicFilter}
          onUpdateLevel={this.updateLevelFilter}
        />
        {visibleQuizItems.length > 0 && <QuizList items={visibleQuizItems} />}
        <GlobalStyle />
      </Layout>
    );
  }
}
