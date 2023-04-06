/**
 * loads and decorates the footer
 * @param {Element} block The header block element
 */

export default async function decorate(block) {
  block.textContent = '';
  const footerUrl = 'https://www.zeiss.com/semiconductor-manufacturing-technology/home.html';
  const resp = await fetch(footerUrl);
if (resp.ok) {
  const html = await resp.text();
  const div = document.createElement('div');
  div.innerHTML = html;
  const footer = div.querySelector('footer');
  block.append(footer);
}
}
