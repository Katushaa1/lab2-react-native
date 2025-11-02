import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { saveUserData } from '../utils/storage';

export default function useTournament(items) {
  const [roundPairs, setRoundPairs] = useState([]); // lista de perechi din runda curentă
  const [currentPairIndex, setCurrentPairIndex] = useState(0); // indexul perechii curente
  const [winners, setWinners] = useState([]); // câștigători până acum
  const [isFinished, setIsFinished] = useState(false);

  const { username, history, setHistory } = useContext(UserContext);

  // La început: creăm perechile rundei inițiale
  useEffect(() => {
    const initialPairs = [];
    for (let i = 0; i < items.length; i += 2) {
      initialPairs.push(items.slice(i, i + 2));
    }
    setRoundPairs(initialPairs);
  }, [items]);

  const handleVote = async (winner) => {
    const nextWinners = [...winners, winner];
    setWinners(nextWinners);

    const nextPairIndex = currentPairIndex + 1;

    // dacă mai există perechi în runda curentă
    if (nextPairIndex < roundPairs.length) {
      setCurrentPairIndex(nextPairIndex);
    } else {
      // runda curentă s-a terminat
      if (nextWinners.length === 1) {
        // avem câștigător final
        setIsFinished(true);
        const newHistory = [
          ...history,
          { username, winner: winner.title, date: new Date().toLocaleString() },
        ];
        setHistory(newHistory);
        await saveUserData({ username, history: newHistory });
      } else {
        // construim runda următoare
        const newPairs = [];
        for (let i = 0; i < nextWinners.length; i += 2) {
          newPairs.push(nextWinners.slice(i, i + 2));
        }
        setRoundPairs(newPairs);
        setCurrentPairIndex(0);
        setWinners([]); // resetăm câștigătorii pentru noua rundă
      }
    }
  };

  const restartTournament = () => {
    setCurrentPairIndex(0);
    setWinners([]);
    setIsFinished(false);

    const initialPairs = [];
    for (let i = 0; i < items.length; i += 2) {
      initialPairs.push(items.slice(i, i + 2));
    }
    setRoundPairs(initialPairs);
  };

  const currentPair = roundPairs[currentPairIndex] || [];

  return { currentPair, winners, handleVote, restartTournament, isFinished };
}
