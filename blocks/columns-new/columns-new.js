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
}
