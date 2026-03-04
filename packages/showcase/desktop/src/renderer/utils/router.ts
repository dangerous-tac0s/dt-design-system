export function initRouter(
  routes: Record<string, (container: HTMLElement) => void>,
  container: HTMLElement,
) {
  function navigate() {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    const render = routes[hash] || routes[''];

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach((link) => {
      const href = (link as HTMLAnchorElement).getAttribute('href') || '';
      const linkHash = href.replace('#/', '').replace('#', '');
      link.classList.toggle('active', linkHash === hash);
    });

    // Clear content safely
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    if (render) {
      render(container);
    }
  }

  window.addEventListener('hashchange', navigate);
  navigate();
}
