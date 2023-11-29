// import { useState, useEffect } from 'react';

// const App = () => {
//   const [images, setImages] = useState([]);
//   const [query, setQuery] = useState('');
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     // ОТРЕЗАТЬ ID ЗАПРОСА ИЗ QUERY
//     // делаем http запрос с query и page
//     // записываем результат в images
//     console.log(query);
//     console.log(page);
//   }, [query, page]);

//   const handleSubmit = newQuery => {
//     setImages([]);
//     setQuery(`${Date.now()}/${newQuery}`);
//     setPage(1);
//   };

//   const handleLoadMore = () => {
//     setPage(prevPage => prevPage + 1);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}></form>

//       <div>Gallery</div>

//       <button onClick={handleLoadMore}>Load more</button>
//     </div>
//   );
// };
