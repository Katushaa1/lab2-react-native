import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MovieCard from './MovieCard';

export default function Matchup({ pair, onVote }) {
  if (!pair || pair.length < 2) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Alege filmul preferat 🎥</Text>
      <View style={styles.row}>
        <MovieCard movie={pair[0]} onSelect={onVote} />
        <MovieCard movie={pair[1]} onSelect={onVote} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', width: '90%' },
});
