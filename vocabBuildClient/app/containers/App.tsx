import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import Home from '../components/Home';
import AudioRound from './AudioRound';
import HomePage from './HomePage';
import LeaderBoard from './LeaderBoard';
import Login from './Login';

export default function App() {
  return (
    <Router>
      <div>
        <main>
          <Route exact path="/" component={Login} />
          <Route path="/home" component={HomePage} />
          <Route path="/audio" component={AudioRound} />
          <Route path="/leaderboard" component={LeaderBoard} />

        </main>
      </div>
    </Router>
  );
}
