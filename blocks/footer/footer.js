import { decorateIcons, readBlockConfig } from '../../scripts/lib-franklin.js';
import { getLocale, getAemTemplateUrl } from '../../scripts/utils.js';

function addFooterInteractions(block) {
  block.querySelector('a[href="#to-top"]').onclick = (event) => {
    event.preventDefault();
    window.scrollTo(0, 0);
  };

  block.querySelectorAll('.footer-tabs__tab').forEach((tab) => {
    tab.onclick = () => {
      const content = tab.nextElementSibling.querySelector('.footer-tabs__tab-content');
      const icon = tab.querySelector('.icon-expand-more');

      const isActiveTabClass = 'footer-tabs__tab--active';
      const isTabContentVisibleClass = 'footer-tabs__tab-content--visible';
      const isActive = tab.classList.contains(isActiveTabClass);

      const activeEl = block.querySelector(`.${isActiveTabClass}`);
      if (!isActive && activeEl) {
        activeEl.classList.remove(isActiveTabClass);
        block.querySelector(`.${isTabContentVisibleClass}`).classList.remove(isTabContentVisibleClass);
        block.querySelector('.icon-expand-more.is-active').classList.remove('is-active');
      }

      tab.classList.toggle(isActiveTabClass, !isActive);
      content.classList.toggle(isTabContentVisibleClass, !isActive);
      icon.classList.toggle('is-active', !isActive);
    };
  });

  block.querySelectorAll('.country-switch__first-level-list-item > .country-switch__link').forEach((link) => {
    link.onclick = (event) => {
      event.preventDefault();

      const activeFirstLevelClass = 'country-switch__first-level-list-item--active';
      const activeSecondLevelClass = 'country-switch__second-level-list-item--active';
      const li = link.parentElement;
      const isActive = li.classList.contains(activeFirstLevelClass);

      const activeEl = block.querySelector(`.${activeFirstLevelClass}`);
      if (activeEl) {
        activeEl.classList.remove(activeFirstLevelClass);
        activeEl.querySelector('.country-switch__second-level-list-item').classList.remove(activeSecondLevelClass);
      }

      li.classList.toggle(activeFirstLevelClass, !isActive);
      requestAnimationFrame(() => {
        li.querySelector('.country-switch__second-level-list-item').classList.toggle(activeSecondLevelClass, !isActive);
      });
    };
  });
}

/**
 * loads and decorates the footer
 * @param {Element} block The header block element
 */

export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  const locale = getLocale();
  const footerPath = cfg.footer || getAemTemplateUrl(locale);
  const resp = await fetch(footerPath);
  if (resp.ok) {
    const html = await resp.text();
    const parser = new DOMParser();
    const footer = parser.parseFromString(html, 'text/html').querySelector('footer');
    decorateIcons(footer, true);
    block.append(footer);
    addFooterInteractions(block);
  }
}
