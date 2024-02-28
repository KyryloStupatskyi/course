import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import MovieStore from './store/MovieStore';
import CinemaStore from './store/CinemaStore';
import AdminStore from './store/AdminStore';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={{
      user: new UserStore(),
      movie: new MovieStore(),
      cinema: new CinemaStore(),
      admin: new AdminStore(),
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);
