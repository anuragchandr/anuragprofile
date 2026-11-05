import React, { useState } from 'react';

const USERS = [1_000, 10_000, 100_000, 500_000, 1_000_000];
const fmt = (n) => n.toLocaleString('en-IN');

export default function UnderTheHood() {
  const [u, setU] = useState(4);            // index into USERS
  const [gap, setGap] = useState(10);       // seconds between a player's moves
  const [cap, setCap] = useState(2000);     // requests/sec one instance can serve

  const users = USERS[u];
  const rps = Math.round(users / gap);
  const instances = Math.ceil((rps / cap) * 1.5); // 50% headroom

  return (
    <div className="hood">
      <div className="card">
        <span className="badge">Planned, not built yet</span>
        <h3>Target architecture</h3>
        <div className="flow">
          <span>Browser</span><em>→</em><span>CDN + edge rate limit</span><em>→</em><span>Load balancer</span><em>→</em>
          <span>Stateless game API (autoscaled)</span><em>→</em><span>Redis (hot state, TTL)</span><em>⇢</em>
          <span>Queue</span><em>⇢</em><span>Postgres (results)</span>
        </div>
      </div>

      <div className="card">
        <h3>Design decisions</h3>
        <ul>
          <li><b>Stateless servers.</b> Any instance can serve any move, so scaling is just adding instances behind the load balancer.</li>
          <li><b>No search at runtime.</b> Tic-tac-toe has only 5,478 reachable positions, so perfect-play replies can come from a precomputed lookup table in O(1).</li>
          <li><b>Hot path stays tiny.</b> A move is validate, look up, respond. Game state lives in Redis with a short TTL.</li>
          <li><b>Writes off the hot path.</b> Finished games go to a queue and are batch-inserted into Postgres. Counters use Redis INCR.</li>
          <li><b>Protect the service.</b> Per-IP and per-session rate limits, load shedding, and a p99 latency target.</li>
          <li><b>Prove it, don't claim it.</b> Load-test with k6 and publish the measured numbers here, plus a live games counter.</li>
        </ul>
      </div>

      <div className="card calc">
        <h3>Back-of-envelope capacity</h3>
        <label>Concurrent players: <b>{fmt(users)}</b></label>
        <input type="range" min="0" max={USERS.length - 1} value={u} onChange={(e) => setU(+e.target.value)} />
        <label>Seconds between a player's moves: <b>{gap}s</b></label>
        <input type="range" min="2" max="30" value={gap} onChange={(e) => setGap(+e.target.value)} />
        <label>Requests/sec one instance handles (assumed): <b>{fmt(cap)}</b></label>
        <input type="range" min="500" max="10000" step="500" value={cap} onChange={(e) => setCap(+e.target.value)} />
        <div className="out">
          <div><b>{fmt(rps)}</b><span>requests / sec</span></div>
          <div><b>{fmt(instances)}</b><span>instances (+50% headroom)</span></div>
          <div><b>{fmt(rps * 60)}</b><span>moves / minute</span></div>
        </div>
        <p className="sub" style={{ marginTop: 12 }}>These are assumptions, not measurements. Real numbers will come from load tests once the backend exists.</p>
      </div>
    </div>
  );
}