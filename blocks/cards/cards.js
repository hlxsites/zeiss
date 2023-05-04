import { createOptimizedPicture, fetchPlaceholders } from '../../scripts/lib-franklin.js';
import { getLocale } from '../../scripts/utils.js';

const hasPressStyle = (block) => block.parentElement && block.parentElement.parentElement
      && block.parentElement.parentElement.classList.contains('press-cards');
export default async function decorate(block) {
  const locale = getLocale();
  const placeholders = await fetchPlaceholders(`/${locale}`);
  const isPressStyle = hasPressStyle(block);
  /* format headers */
  if (block.querySelector('h2')) {
    block.querySelector('h2').classList.add('headline');
    block.querySelector('h2').classList.add('headline__main');
    block.querySelector('h2').classList.add('headline--align-center');
    block.querySelector('h2').classList.add('hl-l');
    block.querySelector('h2').classList.add('hl--sub-xs');
  }

  block.querySelectorAll('h3').forEach((h3) => {
    h3.classList.add('headline');
    h3.classList.add('headline__main');
    h3.classList.add('hl-xs');
    h3.classList.add('spacing--s');
  });

  block.querySelectorAll('h4').forEach((h4) => {
    h4.classList.add('headline__sub');
    h4.classList.add('hl-sub');
  });
  let headline;
  if (isPressStyle) {
    [headline] = block.children;
    block.removeChild(headline);
  }
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.innerHTML = row.innerHTML;
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
      } else {
        div.className = 'cards-card-body';
        div.classList.add('text');
        div.classList.add('text--body-m');
        div.classList.add('spacing--s');
        if (isPressStyle) {
          const downloadInfoElement = document.createElement('div');
          const downloadButton = div.querySelector('.button-container');
          downloadInfoElement.innerHTML = `
            <div class="cards-info-data">
              <span class="cards-info-label text--bold">${placeholders.columnpages}:</span>
              <span class="cards-info-value">1</span>
            </div>
            <div class="cards-info-data">
              <span class="cards-info-label text--bold">${placeholders.columnfilesize}:</span>
              <span class="cards-info-value"></span>
            </div>
          </div>`;
          downloadInfoElement.classList.add('cards-item-info', 'text--body-m');
          div.insertBefore(downloadInfoElement, downloadButton);
        }
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  if (isPressStyle) {
    block.append(headline);
  }
  block.append(ul);
}
