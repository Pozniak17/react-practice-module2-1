import { GlobalStyle } from './GlobalStyle';
import { Toaster } from 'react-hot-toast';
import { Layout } from './Layout';
import { NavLink, Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <Layout>
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
              <NavLink to="/list">Quiz List</NavLink>
            </li>
          </ul>
        </nav>
      </header>

      {/* список маршрутів */}
      <main>
        <Outlet />
      </main>

      <footer>FOOTER</footer>
      <GlobalStyle />
      <Toaster />
    </Layout>
  );
};
