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

function breadcrumbTemplate(locale) {
  const localized = {
    en: {
      href: 'https://www.zeiss.com/semiconductor-manufacturing-technology/news-and-events.html',
      text: 'News and Events',
    },
    de: {
      href: 'https://www.zeiss.de/semiconductor-manufacturing-technology/news-und-events.html',
      text: 'News Und Events',
    },
  }[locale];
  return `
    <ul class="breadcrumb__list-wrapper breadcrumb__list-wrapper--less-than-two">
      <li class="breadcrumb__list-item">  
        <span class="icon icon-symbols-chevron-right icon--symbol">
          <span class="svg-scale-wrapper" style="padding-bottom: 100%;">
            <svg focusable="false" xmlns:xlink="http://www.w3.org/1999/xlink">
              <use xlink:href="/icons/symbols-sprite.svg#svgsymbol-chevron-right"></use>
            </svg>
          </span>
        </span>
        <a class="plain-link breadcrumb__link-item" data-gtm-eventname="Navigation" data-gtm-eventaction="Click" data-gtm-eventtype="Footer" data-gtm-eventvalue="Home" data-gtm-eventdetail="https://www.zeiss.com/semiconductor-manufacturing-technology/home.html" href="https://www.zeiss.com/semiconductor-manufacturing-technology/home.html">Home</a>
      </li>
      <li class="breadcrumb__list-item">   
        <span class="icon icon-symbols-chevron-right icon--symbol">
          <span class="svg-scale-wrapper" style="padding-bottom: 100%;">
            <svg focusable="false" xmlns:xlink="http://www.w3.org/1999/xlink">
              <use xlink:href="/icons/symbols-sprite.svg#svgsymbol-chevron-right"></use>
            </svg>
          </span>
        </span>
        <a class="plain-link breadcrumb__link-item" data-gtm-eventname="Navigation" data-gtm-eventaction="Click" data-gtm-eventtype="Footer" data-gtm-eventvalue="${localized.text}" data-gtm-eventdetail="${localized.href}" href="${localized.href}">${localized.text}</a>
      </li>
    </ul>
  `;
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
    // add breadcrump
    const breadcrumb = footer.querySelector('nav[class=breadcrumb]');
    breadcrumb.innerHTML = breadcrumbTemplate(locale);
    // fix svg relative urls
    decorateIcons(footer, true);
    block.append(footer);
    addFooterInteractions(block);
  }
}
