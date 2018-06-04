import { highlight, languages } from 'prismjs';

import { createNode, getAction, querySelectorAll, toggleNode, wrapNode } from './_dom';
import { ON_NAVIGATE } from './_router';

function getLinkIcon(icon: string, href = '#') {
  return createNode(`<a href="${href}"><i class="fas fa-${icon} fa-fw fa-lg"></i></a>`);
}

export function toggleCss() {
  const headCss = querySelectorAll<HTMLStyleElement>('head [app-css-toggle]');
  let contentCss: HTMLStyleElement[];

  const toggle = (styles: HTMLStyleElement[]) => styles.forEach((style) => {
    style.disabled = !style.disabled;
  });

  const action = getAction('toggle_css', getLinkIcon('eye-slash'), () => {
    toggle(headCss);
    if (contentCss) toggle(contentCss);
  });

  window.addEventListener(ON_NAVIGATE, () => {
    contentCss = querySelectorAll('[app-content] [app-css-toggle]');
    if (action.active) toggle(contentCss);
  });

  return action.link;
}

function formatSource(source: Element) {
  const code = source.cloneNode(true) as Element;
  querySelectorAll<Element>('[app-code-hidden]', code).forEach((hidden) => {
    if (hidden.parentNode) hidden.parentNode.removeChild(hidden);
  });
  return code.innerHTML.trim().replace(/\n{2,}/g, '\n\n');
}

export function viewCode() {
  const source = document.querySelector('[app-content]') as Element;
  source.classList.add('app-code__source');
  const wrap = wrapNode(source, 'app-code');
  const code = createNode('<pre class="app-code__target language-html"><code></code></pre>');

  const action = getAction('view_code', getLinkIcon('code'), () => {
    wrap.classList.toggle('app-code--active');
    toggleNode(code, wrap);
  });

  window.addEventListener(ON_NAVIGATE, () => {
    (code.firstChild as Element).innerHTML = highlight(formatSource(source), languages.html, languages.html);
  });

  return action.link;
}

export function toggleGridFixed() {
  const html = document.querySelector('html') as Element;
  const action = getAction('toggle_grid_fixed', getLinkIcon('angle-double-down'), () => {
    html.classList.toggle('app-grid--fixed');
  });
  return action.link;
}

export function initToolbox() {
  const toolbox = document.querySelector('[app-toolbox]');
  if (!toolbox) return;

  toolbox.classList.add('app-toolbox');

  // toolbox.appendChild(toggleCss());
  toolbox.appendChild(viewCode());
  toolbox.appendChild(toggleGridFixed());
}