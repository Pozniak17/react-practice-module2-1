import { TopicModal } from 'components/TopicModal/TopicModal';
import { Button, MetaWrapper, Text, Topic, Wrapper } from './QuizCard.styled';
import { useState } from 'react';

export const QuizCard = ({
  quiz: { id, topic, level, time, questions },
  onDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const deleteCard = () => onDelete(id);

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
        <Button onClick={deleteCard}>Delete</Button>
        <Button onClick={openModal}>Edit</Button>
      </div>
      {/* {isModalOpen && <h1 onClick={this.closeModal}>MODAL!!! - {topic}</h1>} */}

      <TopicModal isOpen={isModalOpen} onClose={closeModal} topic={topic} />
    </Wrapper>
  );
};
