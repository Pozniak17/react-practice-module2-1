import { NavLink, Outlet } from 'react-router-dom';
import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';
import { Toaster } from 'react-hot-toast';

export default function AppLayout() {
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
              <NavLink to="/list">Quiz list</NavLink>
            </li>
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
  );
}
