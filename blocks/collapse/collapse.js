function addCollapseListener(collapseBlock) {
  const expandableText = collapseBlock.querySelector('div:nth-child(2)');
  const collapsibleSection = collapseBlock.parentElement.parentElement;
  const expandButton = collapseBlock.querySelector('div:nth-child(3)');
  const collapseButton = collapseBlock.querySelector('div:nth-child(4)');
  const buttonsParent = expandButton.parentElement;
  const arrowElement = document.createElement('div');
  arrowElement.classList.add('arrow');
  arrowElement.classList.add('up');
  buttonsParent.appendChild(arrowElement);

  expandButton.addEventListener('click', () => {
    const height = collapseBlock.querySelector('div:nth-child(2) > div').clientHeight
        + collapseButton.getBoundingClientRect().height
        + parseFloat(getComputedStyle(expandableText).paddingBottom);
    expandableText.style.height = `${height}px`;
    collapsibleSection.classList.remove('collapsed-text');
    collapsibleSection.classList.add('expanded-text');
    arrowElement.classList.add('down');
    arrowElement.classList.remove('up');
  });

  collapseButton.addEventListener('click', () => {
    expandableText.style.height = '0';
    collapsibleSection.classList.add('collapsed-text');
    collapsibleSection.classList.remove('expanded-text');
    arrowElement.classList.add('up');
    arrowElement.classList.remove('down');
  });
}

export default function decorate(block) {
  addCollapseListener(block);
}
