import CreateQuizPage from 'pages/CreateQuizPage';
import HomePage from 'pages/HomePage';
import QuizDetailsPage from 'pages/QuizDetailsPage';
import QuizzesPage from 'pages/QuizzesPage';
import { NavLink, Route, Routes } from 'react-router-dom';
import { GlobalStyle } from './GlobalStyle';
import { Toaster } from 'react-hot-toast';

export const App = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/create">Create</NavLink>
            </li>
            <li>
              <NavLink to="/list">Quiz list</NavLink>
            </li>
            <li></li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateQuizPage />} />
        <Route path="/list" element={<QuizzesPage />} />
        <Route path="/list/:quizId" element={<QuizDetailsPage />} />
      </Routes>

      <GlobalStyle />
      <Toaster />
    </div>
  );
};

// import { Route, Routes } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import QuizzesPage from './pages/QuizzesPage';
// import CreateQuizPage from './pages/CreateQuizPage';
// import QuizDetailsPage from './pages/QuizDetailsPage';
// import NotFoundPage from './pages/NotFoundPage';
// import AppLayout from './AppLayout';

// export const App = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<AppLayout />}>
//         <Route index element={<HomePage />} />
//         <Route path="create" element={<CreateQuizPage />} />
//         <Route path="list" element={<QuizzesPage />} />
//         <Route path="list/:quizId" element={<QuizDetailsPage />}>
//           <Route path="stats" element={<div>Stats</div>} />
//           <Route path="users" element={<div>Users</div>} />
//         </Route>
//       </Route>
//       <Route path="*" element={<NotFoundPage />} />
//     </Routes>
//   );
// };
