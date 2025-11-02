import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { imageMap } from '../data/imageMap';

export default function MovieCard({ movie, onSelect }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onSelect(movie)}>
      <Image source={imageMap[movie.image]} style={styles.image} />
      <Text style={styles.title}>{movie.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '45%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    marginVertical: 10,
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: { fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
});
