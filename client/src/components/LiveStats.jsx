import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import portfolio from '../data/portfolio';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const level = (n) => (n === 0 ? '' : n < 3 ? 'l1' : n < 6 ? 'l2' : n < 10 ? 'l3' : 'l4');
const fallbackStats = {
  github: { user: 'anuragchandr', total: null, repos: 19, followers: 1, weeks: null },
  leetcode: { user: 'nrgchandra', total: 405, easy: 159, medium: 221, hard: 25 },
  codechef: {
    user: 'nrgchandra',
    url: 'https://www.codechef.com/users/nrgchandra',
    rating: 1426,
    highestRating: 1426,
    stars: '★★',
    division: 'Div 3',
    globalRank: 1174,
    countryRank: null,
  },
};

export default function LiveStats() {
  const [data, setData] = useState(undefined); // undefined = loading, null = failed

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`${API}/stats`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then(setData)
      .catch((e) => e.name !== 'AbortError' && setData(null));
    return () => ctrl.abort();
  }, []);

  const merged = {
    github: { ...fallbackStats.github, ...(data?.github || {}) },
    leetcode: { ...fallbackStats.leetcode, ...(data?.leetcode || {}) },
    codechef: { ...fallbackStats.codechef, ...(data?.codechef || {}) },
  };

  const lc = merged.leetcode;
  const gh = merged.github;
  const cc = merged.codechef;
  const max = Math.max(lc.easy || 0, lc.medium || 0, lc.hard || 0, 1);

  return (
    <div className="live">
      <h3>Live from GitHub, LeetCode &amp; CodeChef</h3>
      <div className="live-grid">
        <div className="card stat-card">
          <div className="mini-head">LeetCode</div>
          <div className="big">{lc.total}</div>
          <p className="sub">problems solved</p>
          {[['Easy', lc.easy], ['Medium', lc.medium], ['Hard', lc.hard]].map(([k, v]) => (
            <div className="bar" key={k}>
              <span>{k}</span>
              <i><motion.b initial={{ width: 0 }} whileInView={{ width: `${(Number(v || 0) / max) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1 }} /></i>
              <span>{v}</span>
            </div>
          ))}
        </div>

        <div className="card stat-card">
          <div className="mini-head">GitHub</div>
          <div className="stats-inline">
            <div><b>{gh.repos ?? 0}</b><small>repos</small></div>
            <div><b>{gh.followers ?? 0}</b><small>followers</small></div>
            <div><b>{gh.total ?? 0}</b><small>contribs</small></div>
          </div>
          {gh.weeks ? (
            <div className="heat-wrap">
              <div className="heat" role="img" aria-label="GitHub contributions in the last year">
                {gh.weeks.flat().map((n, i) => <span key={i} className={level(n)} title={`${n} contributions`} />)}
              </div>
            </div>
          ) : (
            <div className="git-link-row">
              <span>Public activity</span>
              <a href={portfolio.links.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            </div>
          )}
        </div>

        <div className="card stat-card compact-card">
          <div className="mini-head">CodeChef</div>
          <div className="codechef-username">{cc.user || 'nrgchandra'}</div>
          <div className="cc-meta">
            <span><b>{cc.rating ?? '—'}</b> rating</span>
            <span><b>{cc.division || 'Div 3'}</b> division</span>
            <span><b>{cc.highestRating ?? cc.rating ?? '—'}</b> highest</span>
          </div>
          <div className="stars-row">{cc.stars || '★★★'}</div>
          <div className="cc-ranks">
            <span><b>{cc.globalRank ?? '—'}</b> Global Rank</span>
            {cc.countryRank ? <span><b>{cc.countryRank}</b> Country Rank</span> : null}
          </div>
          <div className="cta compact-cta">
            <a className="btn ghost sm" href={cc.url || portfolio.links.codechef} target="_blank" rel="noreferrer">Open profile ↗</a>
          </div>
        </div>
      </div>
    </div>
  );
}