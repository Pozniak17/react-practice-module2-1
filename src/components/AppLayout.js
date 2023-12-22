import { NavLink, Outlet } from 'react-router-dom';
import { GlobalStyle } from './GlobalStyle';
import { Toaster } from 'react-hot-toast';
import { Layout } from './Layout';

export const AppLayout = () => {
  return (
    <div>
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
                <NavLink to="/list">Quiz list</NavLink>
              </li>
              <li></li>
            </ul>
          </nav>
        </header>

        <main>
          <Outlet />
        </main>

        <footer>FOOTER</footer>
        <GlobalStyle />
        <Toaster />
      </Layout>
    </div>
  );
};
