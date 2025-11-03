import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { imageMap } from '../data/imageMap';
import { UserContext } from '../context/UserContext';

export default function ResultsScreen({ winners, onRestart }) {
  const { history, username, setUsername } = useContext(UserContext);
  const [showHistory, setShowHistory] = useState(false);

  if (!winners || winners.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🏆 Câștigătorul nu este disponibil încă</Text>
      </View>
    );
  }

  const winner = winners[winners.length - 1];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Câștigătorul este:</Text>
      <Image
        source={winner.image ? imageMap[winner.image] : null}
        style={styles.image}
      />
      <Text style={styles.movieTitle}>{winner.title}</Text>

      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={[styles.button, styles.restartButton]}
          onPress={() => {
            setUsername(''); // 🔹 Resetează userul — apare din nou inputul
            onRestart();     // 🔹 Reia turneul
          }}
        >
          <Text style={styles.buttonText}>🔁 Reia turneul</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.historyButton]}
          onPress={() => setShowHistory(!showHistory)}
        >
          <Text style={styles.buttonText}>📜 Istoric</Text>
        </TouchableOpacity>
      </View>

      {showHistory && (
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>🕓 Alegerile anterioare</Text>
          {history.length === 0 ? (
            <Text style={styles.noHistory}>Nu există istoric salvat.</Text>
          ) : (
            <FlatList
              data={history}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.historyItem}>
                  <Text style={styles.historyText}>
                    👤 {item.username} — a ales „{item.winner}”
                  </Text>
                  <Text style={styles.historyDate}>{item.date}</Text>
                </View>
              )}
            />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#faf6f2', 
    paddingHorizontal: 20 
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  image: { width: 180, height: 260, borderRadius: 10, marginBottom: 20 },
  movieTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  buttonsRow: { flexDirection: 'row', gap: 10 },
  button: { padding: 10, borderRadius: 8, minWidth: 130, alignItems: 'center' },
  restartButton: { backgroundColor: '#7b4b94' },
  historyButton: { backgroundColor: '#5a7ea6' },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  historyContainer: { marginTop: 30, width: '100%', backgroundColor: '#fff', padding: 10, borderRadius: 8 },
  historyTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  historyItem: { marginBottom: 8 },
  historyText: { fontSize: 16 },
  historyDate: { fontSize: 12, color: '#666' },
  noHistory: { fontSize: 15, color: '#888', textAlign: 'center' },
});
