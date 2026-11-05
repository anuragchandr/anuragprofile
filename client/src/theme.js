// Imported once (first thing in App.jsx) so the theme is set before React paints.
const KEY = 'ac-theme';

export function getTheme() {
  try { const saved = localStorage.getItem(KEY); if (saved) return saved; } catch { /* storage blocked */ }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function applyTheme(t) {
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem(KEY, t); } catch { /* ignore */ }
}

document.documentElement.dataset.theme = getTheme();