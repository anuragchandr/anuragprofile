import { Router } from 'express';

const router = Router();
const TTL = 60 * 60 * 1000; // refresh at most once an hour
const GH_USER = process.env.GITHUB_USERNAME || 'anuragchandr';
const LC_USER = process.env.LEETCODE_USERNAME || 'nrgchandra';
const CC_USER = process.env.CODECHEF_USERNAME || 'nrgchandra';

const fallbackStats = {
  github: { user: 'anuragchandr', total: null, repos: 19, followers: 1, weeks: null },
  leetcode: { user: 'nrgchandra', total: 405, easy: 159, medium: 221, hard: 25 },
  codechef: {
    user: 'nrgchandra',
    url: 'https://www.codechef.com/users/nrgchandra',
    rating: 1426,
    highestRating: 1426,
    stars: '★★★',
    division: 'Div 3',
    globalRank: 1174,
    countryRank: null,
    profileUrl: 'https://www.codechef.com/users/nrgchandra',
  },
};

let cache = { at: 0, data: null };

async function getGithub() {
  const token = process.env.GITHUB_TOKEN;
  const headers = { 'User-Agent': 'portfolio-stats', 'Content-Type': 'application/json' };

  if (token) {
    const query = `query($login:String!){user(login:$login){
      followers{totalCount} repositories(privacy:PUBLIC){totalCount}
      contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{contributionCount}}}}}}`;
    const r = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { ...headers, Authorization: `bearer ${token}` },
      body: JSON.stringify({ query, variables: { login: GH_USER } }),
      signal: AbortSignal.timeout(8000),
    });
    const u = (await r.json())?.data?.user;
    if (u) {
      const cal = u.contributionsCollection.contributionCalendar;
      return {
        user: GH_USER,
        total: cal.totalContributions,
        repos: u.repositories.totalCount,
        followers: u.followers.totalCount,
        weeks: cal.weeks.map((w) => w.contributionDays.map((d) => d.contributionCount)),
      };
    }
  }

  // No token (or GraphQL failed): public REST gives counts but no calendar.
  const r = await fetch(`https://api.github.com/users/${GH_USER}`, { headers, signal: AbortSignal.timeout(8000) });
  if (!r.ok) return null;
  const u = await r.json();
  return { user: GH_USER, total: null, repos: u.public_repos, followers: u.followers, weeks: null };
}

// Unofficial LeetCode GraphQL endpoint: it can change or block at any time, so callers must tolerate null.
async function getLeetcode() {
  if (!LC_USER) return null;
  const query = `query($u:String!){matchedUser(username:$u){submitStatsGlobal{acSubmissionNum{difficulty count}}}}`;
  const r = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Referer: 'https://leetcode.com' },
    body: JSON.stringify({ query, variables: { u: LC_USER } }),
    signal: AbortSignal.timeout(8000),
  });
  const rows = (await r.json())?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum;
  if (!rows) return null;
  const by = Object.fromEntries(rows.map((x) => [x.difficulty, x.count]));
  return { user: LC_USER, total: by.All, easy: by.Easy, medium: by.Medium, hard: by.Hard };
}

async function getCodechef() {
  const url = `https://www.codechef.com/users/${CC_USER}`;
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!r.ok) return null;
    const html = await r.text();

    const profile = {
      user: CC_USER,
      url,
      rating: null,
      highestRating: null,
      stars: '★★★',
      division: 'Div 3',
      globalRank: null,
      countryRank: null,
      profileUrl: url,
    };

    const ratingMatch = html.match(/class='rating'>(\d+)\s*\(/i)
      || html.match(/class="rating">(\d+)\s*\(/i)
      || html.match(/rating[^\d]*(\d{3,})/i);
    if (ratingMatch) {
      profile.rating = Number(ratingMatch[1]);
      profile.highestRating = Number(ratingMatch[1]);
    }

    const globalRankMatch = html.match(/<div id='global-rank-all'><small>Global Rank:<\/small>\s*<strong[^>]*class='global-rank'[^>]*>(\d+)<\/strong><\/div>/i)
      || html.match(/<strong class='global-rank'>(\d+)<\/strong>/i)
      || html.match(/Global Rank:\s*<\/small>\s*<strong[^>]*>(\d+)<\/strong>/i)
      || html.match(/global rank[^\d]*(\d+)/i);
    if (globalRankMatch) profile.globalRank = Number(globalRankMatch[1]);

    const countryRankMatch = html.match(/Country Rank:\s*<\/small>\s*<strong[^>]*>(\d+)<\/strong>/i)
      || html.match(/country rank[^\d]*(\d+)/i);
    if (countryRankMatch) {
      const countryRank = Number(countryRankMatch[1]);
      if (countryRank > 0) profile.countryRank = countryRank;
    }

    return profile;
  } catch {
    return { user: CC_USER, url, rating: null, highestRating: null, stars: '★★★', division: 'Div 3', globalRank: null, countryRank: null, profileUrl: url };
  }
}

router.get('/', async (req, res) => {
  const fresh = cache.data && Date.now() - cache.at < TTL;
  if (!fresh) {
    const [gh, lc, cc] = await Promise.allSettled([getGithub(), getLeetcode(), getCodechef()]);
    const github = gh.status === 'fulfilled' ? gh.value : null;
    const leetcode = lc.status === 'fulfilled' ? lc.value : null;
    const codechef = cc.status === 'fulfilled' ? cc.value : null;

    cache = {
      at: Date.now(),
      data: {
        github: github ?? cache.data?.github ?? fallbackStats.github,
        leetcode: leetcode ?? cache.data?.leetcode ?? fallbackStats.leetcode,
        codechef: codechef ?? cache.data?.codechef ?? fallbackStats.codechef,
        updatedAt: new Date().toISOString(),
      },
    };
  }
  res.set('Cache-Control', 'public, max-age=300');
  res.json(cache.data ?? { github: fallbackStats.github, leetcode: fallbackStats.leetcode, codechef: fallbackStats.codechef, updatedAt: new Date().toISOString() });
});

export default router;