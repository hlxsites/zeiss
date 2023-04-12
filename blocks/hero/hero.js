import { decorateIcons, getMetadata, fetchPlaceholders } from '../../scripts/lib-franklin.js';
import { socials, addClipboardInteraction } from '../../scripts/utils.js';

function template(info) {
  return `<div class="general-article-stage">
    <div class="grid__container" xmlns="http://www.w3.org/1999/html">
        <div class="grid__structure">
            <div class="grid__column grid__column--100">
                <hr class="divider divider--dark">
            </div>
            <div class="grid__column general-article-stage__column-content">
                <div class="headline hl-xxl hl--sub-m">
                    <span>
                        <span class="headline__eyebrow text--eyebrow">Presseinformation</span>
                        <h1>
                            <span class="headline__main" data-js-select="Headline_main">${info.Main}</span>
                        </h1>
                        <h3 class="headline__sub hl--sub">${info.Sub}</h3>
                    </span>
                </div>
                <div class="general-article-stage__details text--eyebrow">
                    ${info.Date}
                    · ${info.Duration}
                </div>
            </div>
        </div>
    </div>
</div>`;
}

export default async function decorate(block) {
  const locale = getMetadata('locale');
  const placeholders = await fetchPlaceholders('/' + locale);
  const pub = document.querySelector('head > meta[name="publicationdate"');
  const time = document.querySelector('head > meta[name="readingtime"');
  let dateString = '';
  if (pub && pub.content) {
    dateString = pub.content;
  }
  let timeString = '';
  if (time && time.content) {
    timeString = time.content + ' ' + placeholders.readingtime;
  }
  const picture = block.querySelector('picture');
  block.innerHTML = template(
    {
      Date: dateString,
      Duration: timeString,
      Main: block.querySelector('h1')?.textContent || '',
      Sub: block.querySelector('h3')?.textContent || '',
      socials,
    },
  );

  if (picture) {
    block.querySelector('.general-article-stage__column-content').prepend(picture);
  }

  decorateIcons(block, true);

  addClipboardInteraction(block);
}
