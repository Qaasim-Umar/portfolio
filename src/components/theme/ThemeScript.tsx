/**
 * Inline, render-blocking script that applies the saved/system theme to
 * <html> BEFORE first paint, preventing a flash of the wrong theme.
 *
 * It must run synchronously (not deferred / not a module), so it is injected
 * via dangerouslySetInnerHTML as the first node in <body>. CSS defaults to the
 * light tokens, so if this script fails the site still renders correctly.
 */
const script = `(() => {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = stored ? stored === 'dark' : prefersDark;
    document.documentElement.classList.toggle('dark', isDark);
  } catch (e) {}
})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
