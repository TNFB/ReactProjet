import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Header from './components/Header';
import Questionnaire from './pages/Questionnaire'
import Results from './pages/Results'
import Login from './pages/Login'
import Profile from './pages/Profile';
import ModifyProfile from './pages/ModifyProfile';
import Commande from './pages/Commande';
import GestionArticles from './pages/GestionArticles';

import { QuestionnaireProvider } from './context'



import { BrowserRouter as Router, Route } from 'react-router-dom'
import Admin from './pages/Admin';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <QuestionnaireProvider>

        <Header />
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/detail/:idArticle">
          <Detail />
        </Route>
        <Route path="/questionnaire/:questionNumber">
          <Questionnaire />
        </Route>
        <Route path="/results">
          <Results />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/modifyProfile">
          <ModifyProfile />
        </Route>
        <Route path="/commande">
          <Commande />
        </Route>
        <Route path="/gestionArticles">
          <GestionArticles />
        </Route>
      </QuestionnaireProvider>

    </Router>
  </React.StrictMode>
);


