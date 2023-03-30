function addCollapseListener(collapseBlock) {
  const expandableText = collapseBlock.querySelector('div:nth-child(2)');
  const collapsibleSection = collapseBlock.parentElement.parentElement;
  const expandButton = collapseBlock.querySelector('div:nth-child(3)');
  const collapseButton = collapseBlock.querySelector('div:nth-child(4)');

  expandButton.addEventListener('click', () => {
    let height = 0;
    const paragraphs = expandableText.querySelectorAll('p');
    for (let i = 0; i < paragraphs.length; i += 1) {
      height += paragraphs[i].getBoundingClientRect().height;
    }
    height += collapseButton.getBoundingClientRect().height
        + parseFloat(getComputedStyle(expandableText).paddingBottom);
    expandableText.style.height = `${height}px`;
    collapsibleSection.classList.remove('collapsed-text');
    collapsibleSection.classList.add('expanded-text');
  });

  collapseButton.addEventListener('click', () => {
    expandableText.style.height = '0';
    collapsibleSection.classList.add('collapsed-text');
    collapsibleSection.classList.remove('expanded-text');
  });
}

export default function decorate(block) {
  addCollapseListener(block);
}

