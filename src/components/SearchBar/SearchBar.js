export const SearchBar = ({
  filters: { topic, level },
  onUpdateTopic,
  onUpdateLevel,
  onReset,
}) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Topic filter"
        value={topic}
        onChange={evt => onUpdateTopic(evt.target.value)}
      />
      <select value={level} onChange={evt => onUpdateLevel(evt.target.value)}>
        <option value="all">All</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
      <button onClick={onReset}>Reset filters</button>
    </div>
  );
};

// на 8 рядку ми збираємо значення інпуту і віддаємо в метод в App в updateTopicFilter
