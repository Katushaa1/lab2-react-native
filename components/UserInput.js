import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { UserContext } from '../context/UserContext';

export default function UserInput() {

  const { setUsername } = useContext(UserContext);
  const [name, setName] = useState('');
  console.log(name);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your name to start 🎬</Text>
      <TextInput
        style={styles.input}
        placeholder="Your name"
        placeholderTextColor="#888" // 🔹 placeholder gri deschis
        value={name}
        onChangeText={setName}
      />
      <Button
        title="Start"
        color="#007AFF" // 🔹 albastru plăcut (opțional)
        onPress={() => {
          if (name.trim().length > 0) setUsername(name);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff' // 🔹 fundal alb (ca să nu fie negru)
  },
  label: { 
    fontSize: 18, 
    marginBottom: 10, 
    color: '#222' // 🔹 text vizibil
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    width: '70%',
    marginBottom: 10,
    color: '#000', // 🔹 textul introdus devine negru
    backgroundColor: '#f9f9f9', // 🔹 input vizibil pe fundal alb
  },
});
