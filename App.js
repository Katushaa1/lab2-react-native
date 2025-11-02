import React, { useContext } from 'react';
import { View } from 'react-native';
import globalStyles from './styles/globalStyles';

import { UserProvider, UserContext } from './context/UserContext';
import useTournament from './hooks/useTournaments';
import movies from './data/movies.json';
import UserInput from './components/UserInput';
import Matchup from './components/Matchup';
import ResultsScreen from './components/ResultsScreen';

function MainApp() {
  const { username } = useContext(UserContext);
  const { currentPair, winners, handleVote, restartTournament, isFinished } = useTournament(movies);

  // dacă nu există username, arată input-ul
  if (!username) return <UserInput />;

  return (
    <View style={globalStyles.container}>
      {!isFinished ? (
        <Matchup pair={currentPair} onVote={handleVote} />
      ) : (
        <ResultsScreen winners={winners} onRestart={restartTournament} />
      )}
    </View>
  );
}

export default function App() {
  return (
    <UserProvider>
      <MainApp />
    </UserProvider>
  );
}
