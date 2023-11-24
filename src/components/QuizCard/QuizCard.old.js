import { Component } from 'react';
import { TopicModal } from 'components/TopicModal/TopicModal';
import { Button, MetaWrapper, Text, Topic, Wrapper } from './QuizCard.styled';

export class QuizCard extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { isModalOpen } = this.state;

    const {
      quiz: { id, topic, level, time, questions },
      onDelete,
    } = this.props;

    return (
      <Wrapper level={level}>
        <Topic>{topic}</Topic>
        <MetaWrapper>
          <Text>
            <b>Level:</b>
            {level}
          </Text>
          <Text>
            <b>Time:</b>
            {time}
          </Text>
          <Text>
            <b>Questions:</b>
            {questions}
          </Text>
        </MetaWrapper>
        <div>
          <Button onClick={() => onDelete(id)}>Delete</Button>
          <Button onClick={this.openModal}>Edit</Button>
        </div>
        {/* {isModalOpen && <h1 onClick={this.closeModal}>MODAL!!! - {topic}</h1>} */}

        <TopicModal
          isOpen={isModalOpen}
          onClose={this.closeModal}
          topic={topic}
        />
      </Wrapper>
    );
  }
}
