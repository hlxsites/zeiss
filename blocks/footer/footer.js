import { getMetadata } from '../../scripts/lib-franklin.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */

export default async function decorate(block) {
  const locale = getMetadata('locale');
  block.textContent = '';
  const hostnames = {
    en: 'www.zeiss.com',
    de: 'www.zeiss.de',
  };
  const hostname = hostnames[locale] || hostnames.en;
  const footerUrl = `https://${hostname}/semiconductor-manufacturing-technology/home.html`;
  const resp = await fetch(footerUrl);
  if (resp.ok) {
    const html = await resp.text();
    const div = document.createElement('div');
    div.innerHTML = html;
    const footer = div.querySelector('footer');
    block.append(footer);
  }
}
