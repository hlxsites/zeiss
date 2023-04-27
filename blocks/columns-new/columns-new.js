export default function decorate(block) {
  if (block.querySelector('h2')) {
    block.querySelector('h2').classList.add('headline');
    block.querySelector('h2').classList.add('headline__main');
    block.querySelector('h2').classList.add('headline--align-center');
    block.querySelector('h2').classList.add('hl-l');
    block.querySelector('h2').classList.add('hl--sub-xs');
  }

  block.querySelectorAll('h3').forEach((h3) =>  {
    h3.classList.add('headline');
    h3.classList.add('headline__main');
    h3.classList.add('hl-xs');
    h3.classList.add('spacing--s');
  });

  block.querySelectorAll('h4').forEach((h4) =>  {
    h4.classList.add('headline__sub');
    h4.classList.add('hl-sub');
  });

  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-new-${cols.length}-cols`);
  const item = cols[0];

  if (item) {
    const pTags = item.querySelectorAll('p');

    if (pTags && pTags[0] && pTags[0].querySelector('img')) {
      // Marking caption and copyright only in case if first p has img
      for (let i = 1; i < pTags.length; i += 1) {
        const currentP = pTags[i];
        const currentPText = currentP.textContent;
        const { parentNode } = currentP;

        if (currentPText.startsWith('©')) {
          const nextP = pTags[i + 1];
          const copyright = document.createElement('span');
          copyright.classList.add('copyright');
          const spanText = document.createElement('span');
          spanText.classList.add('copyright-text');
          spanText.textContent = currentPText.substring(1);
          copyright.appendChild(spanText);

          if (nextP) {
            const caption = document.createElement('span');
            caption.classList.add('caption');
            caption.textContent = nextP.firstChild.textContent;
            nextP.removeChild(nextP.firstChild);
            nextP.appendChild(copyright);
            nextP.appendChild(caption);
            parentNode.removeChild(currentP);
          } else {
            const newP = document.createElement('p');
            newP.appendChild(copyright);
            parentNode.appendChild(newP);
            parentNode.removeChild(currentP);
          }

          break;
        } else {
          const caption = document.createElement('span');
          caption.classList.add('caption');
          caption.textContent = currentP.firstChild.textContent;
          currentP.removeChild(currentP.firstChild);
          currentP.appendChild(caption);
        }
      }
    }
  }
}
