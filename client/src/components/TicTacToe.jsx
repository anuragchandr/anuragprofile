import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { gameApi } from '../game/engine';
import UnderTheHood from './UnderTheHood';

export default function TicTacToe() {
  const [tab, setTab] = useState('play');
  const [board, setBoard] = useState(Array(9).fill(null));
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [difficulty, setDifficulty] = useState('hard');
  const [score, setScore] = useState({ you: 0, cpu: 0, draw: 0 });

  async function click(i) {
    if (busy || result || board[i]) return;
    setBusy(true);
    setBoard((b) => b.map((v, k) => (k === i ? 'X' : v)));
    try {
      const res = await gameApi.play(board, i, difficulty);
      setBoard(res.board);
      if (res.result) {
        setResult(res.result);
        const k = res.result.winner === 'X' ? 'you' : res.result.winner === 'O' ? 'cpu' : 'draw';
        setScore((s) => ({ ...s, [k]: s[k] + 1 }));
      }
    } finally { setBusy(false); }
  }

  const reset = () => { setBoard(Array(9).fill(null)); setResult(null); };
  const status = result
    ? result.winner === 'X' ? 'You win! 🎉' : result.winner === 'O' ? 'Computer wins.' : "It's a draw."
    : busy ? 'Computer is thinking…' : 'Your move (X)';

  return (
    <>
      <div className="tabs" role="tablist">
        <button role="tab" aria-selected={tab === 'play'} className={tab === 'play' ? 'on' : ''} onClick={() => setTab('play')}>Play</button>
        <button role="tab" aria-selected={tab === 'hood'} className={tab === 'hood' ? 'on' : ''} onClick={() => setTab('hood')}>Under the hood</button>
      </div>

      {tab === 'hood' ? <UnderTheHood /> : (
        <div className="ttt">
          <div className="ttt-top">
            <div className="seg">
              {['easy', 'hard'].map((d) => (
                <button key={d} className={difficulty === d ? 'on' : ''} onClick={() => { setDifficulty(d); reset(); }}>{d}</button>
              ))}
            </div>
            <div className="score">You {score.you} · CPU {score.cpu} · Draws {score.draw}</div>
          </div>
          <div className="board">
            {board.map((v, i) => (
              <motion.button key={i} whileTap={{ scale: 0.92 }} className={`cell ${v || ''} ${result?.line.includes(i) ? 'win' : ''}`}
                onClick={() => click(i)} aria-label={`Cell ${i + 1}${v ? ', ' + v : ''}`}>
                {v && <motion.span initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}>{v}</motion.span>}
              </motion.button>
            ))}
          </div>
          <p className="ttt-status">{status}</p>
          <button className="btn ghost" onClick={reset}>{result ? 'Play again' : 'Reset'}</button>
        </div>
      )}
    </>
  );
}