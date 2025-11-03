import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MovieCard from './MovieCard';

export default function Matchup({ pair, onVote }) {
  // useEffect- Dacă există doar un film (bye automat), îl votează automat
  useEffect(() => {
    if (pair && pair.length === 1) {
      onVote(pair[0]);
    }
  }, [pair]);

  if (!pair || pair.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Alege filmul preferat 🎥</Text>
      <View style={styles.row}>
        {pair.map((movie) => (   
          //map- pentru ca sa fie flexibil la 1 sau 2 filme

          <MovieCard key={movie.id} movie={movie} onSelect={onVote} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', width: '90%' },
});
