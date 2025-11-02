import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { imageMap } from '../data/imageMap';
import UserInput from './UserInput';

export default function ResultsScreen({ winners, onRestart }) {
  if (!winners || winners.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🏆 Câștigătorul nu este disponibil încă</Text>
      </View>
    );
  }

  const winner = winners[winners.length - 1]; // ultimul câștigător

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Câștigătorul este:</Text>
      <Image
        source={winner.image ? imageMap[winner.image] : null}
        style={styles.image}
      />
      <Text style={styles.movieTitle}>{winner.title}</Text>
      <TouchableOpacity style={styles.button} onPress={onRestart} >
        <Text style={styles.buttonText}>Reia turneul</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#faf6f2' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  image: { width: 180, height: 260, borderRadius: 10, marginBottom: 20 },
  movieTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 30 },
  button: { backgroundColor: '#7b4b94', padding: 10, borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 16 },
});
