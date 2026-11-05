// Game "service". The UI only calls gameApi.play(), so swapping to a real
// backend later means replacing this one object, not touching the component.
const LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

export function outcome(b) {
  for (const [x, y, z] of LINES) if (b[x] && b[x] === b[y] && b[x] === b[z]) return { winner: b[x], line: [x, y, z] };
  return b.every(Boolean) ? { winner: 'draw', line: [] } : null;
}

function minimax(b, turn) {
  const o = outcome(b);
  if (o) return o.winner === 'O' ? 1 : o.winner === 'X' ? -1 : 0;
  let best = turn === 'O' ? -2 : 2;
  for (let i = 0; i < 9; i++) if (!b[i]) {
    b[i] = turn;
    const s = minimax(b, turn === 'O' ? 'X' : 'O');
    b[i] = null;
    best = turn === 'O' ? Math.max(best, s) : Math.min(best, s);
  }
  return best;
}

function pickMove(b, difficulty) {
  const free = b.map((v, i) => (v ? -1 : i)).filter((i) => i >= 0);
  if (difficulty === 'easy') return free[Math.floor(Math.random() * free.length)];
  let best = -2, moves = [];
  for (const i of free) {
    const c = [...b]; c[i] = 'O';
    const s = minimax(c, 'X');
    if (s > best) { best = s; moves = [i]; } else if (s === best) moves.push(i);
  }
  return moves[Math.floor(Math.random() * moves.length)];
}

// Contract a future backend should keep: (board, index, difficulty) -> { board, result }
export const gameApi = {
  async play(board, index, difficulty = 'hard') {
    const b = [...board]; b[index] = 'X';
    let result = outcome(b);
    if (!result) { b[pickMove(b, difficulty)] = 'O'; result = outcome(b); }
    await new Promise((r) => setTimeout(r, 350)); // feels like the computer is "thinking"
    return { board: b, result };
  },
};
