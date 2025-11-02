//funcții de salvare / încărcare AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';


const STORAGE_KEY = 'movieBattleData';


export const saveUserData = async (data) => {
try {
await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
} catch (error) {
console.error('Error saving data', error);
}
};


export const loadUserData = async () => {
try {
const json = await AsyncStorage.getItem(STORAGE_KEY);
return json ? JSON.parse(json) : null;
} catch (error) {
console.error('Error loading data', error);
return null;
}
};


export const clearUserData = async () => {
try {
await AsyncStorage.removeItem(STORAGE_KEY);
} catch (error) {
console.error('Error clearing data', error);
}
};