import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { saveUserData } from '../utils/storage';

export default function useTournament(items) {
  const [roundPairs, setRoundPairs] = useState([]); // lista perechilor curente
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [winners, setWinners] = useState([]); // câștigători din roundul curent
  const [isFinished, setIsFinished] = useState(false);

  const { username, history, setHistory } = useContext(UserContext);

  // Funcție pentru a genera perechi dintr-un array
  const generatePairs = (arr) => {
    const pairs = [];
    for (let i = 0; i < arr.length; i += 2) {
      if (i + 1 < arr.length) {
        pairs.push(arr.slice(i, i + 2)); // două filme
      } else {
        pairs.push([arr[i]]); // bye automat
      }
    }
    return pairs;
  };

  // La început: creăm perechile rundei inițiale
  useEffect(() => {
    setRoundPairs(generatePairs(items));
  }, [items]);

  const handleVote = async (winner) => {
    const nextWinners = [...winners, winner];
    setWinners(nextWinners);

    const nextPairIndex = currentPairIndex + 1;

    // dacă mai există perechi în runda curentă
    if (nextPairIndex < roundPairs.length) {
      setCurrentPairIndex(nextPairIndex);
    } else {
      // runda s-a terminat
      if (nextWinners.length === 1) {
        // câștigător final
        setIsFinished(true);
        const newHistory = [
          ...history,
          { username, winner: winner.title, date: new Date().toLocaleString() },
        ];
        setHistory(newHistory);
        await saveUserData({ username, history: newHistory });
      } else {
        // construim runda următoare
        const newPairs = generatePairs(nextWinners);

        // dacă există o pereche cu un singur film, îl promovăm automat
        if (newPairs.length === 1 && newPairs[0].length === 1) {
          handleVote(newPairs[0][0]);
          return;
        }

        setRoundPairs(newPairs);
        setCurrentPairIndex(0);
        setWinners([]);
      }
    }
  };

  const restartTournament = () => {
    setCurrentPairIndex(0);
    setWinners([]);
    setIsFinished(false);
    setRoundPairs(generatePairs(items));
  };

  const currentPair = roundPairs[currentPairIndex] || [];

  return { currentPair, winners, handleVote, restartTournament, isFinished };
}
