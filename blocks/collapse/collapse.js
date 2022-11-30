import { decorateIcons } from '../../scripts/lib-franklin.js';

function template(props) {
  return props.items.map((item) => `
    <div class="text-block">
      <div class="grid__container">
        <div class="grid__structure">
          <div class="grid__column grid__column--inner">
            <div class="text-block__headline">
              <div class="headline hl-l">
                <span>
                  <h2 id="${item.title.id}">
                    <span class="headline__main">${item.title.label}</span>
                  </h2>
                </span>
              </div>
            </div>

            <div class="text-block__expandable-area">
              <div class="text text--body-m">
                ${item.text}
              </div>

              <div class="button-link button-link--link text-block__button">
                <a class=" button-link--icon  button-link--internal" href="${item.more.href}" title="${item.more.label}" >
                  <span class="button-link__content">
                    <span>
                      <span>${item.more.label}</span>
                    </span>
                    ${item.more.isInternal ? '<span class="icon icon-internal-link"></span>' : '<span class="icon icon-external-link"></span>'}
                  </span>
                </a>
              </div>
            </div>

            <div>
              <div class="button-toggle button-toggle--collapsed" data-collapsed-label="Mehr Informationen ${item.title.uncapitalizedLabel}" data-expanded-label="Weniger Informationen ${item.title.uncapitalizedLabel}">
                <div class="button-link button-link--link">
                  <button class="button-link--icon" title="Mehr Informationen ${item.title.uncapitalizedLabel}" aria-label="Mehr Informationen ${item.title.uncapitalizedLabel}">
                    <span class="button-link__content">
                      <span>Mehr Informationen ${item.title.uncapitalizedLabel}</span>
                    </span>
    
                    <span class="icon icon-expand-more"></span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function addCollapseListener(collapse) {
  const expandable = collapse.querySelector('.text-block__expandable-area');
  expandable.style.transition = 'height 500ms ease-in-out';

  const textBlock = expandable.querySelector('.text');
  const textBlockButton = expandable.querySelector('.text-block__button');

  collapse.addEventListener('click', (event) => {
    const toggle = event.target.closest('.button-toggle');
    if (toggle) {
      const isExpanded = toggle.classList.contains('button-toggle--expanded');
      const isCollapsed = toggle.classList.contains('button-toggle--collapsed');

      collapse.classList.toggle('text-block--expanded', !isExpanded);
      toggle.classList.toggle('button-toggle--expanded', !isExpanded);
      toggle.classList.toggle('button-toggle--collapsed', !isCollapsed);

      const button = toggle.querySelector('button');
      const buttonContent = button.querySelector('.button-link__content');
      const newLabel = isExpanded ? toggle.dataset.collapsedLabel : toggle.dataset.expandedLabel;
      button.setAttribute('aria-label', newLabel);
      button.setAttribute('title', newLabel);
      buttonContent.textContent = newLabel;

      const height = isCollapsed ? textBlock.getBoundingClientRect().height + textBlockButton.getBoundingClientRect().height + parseFloat(getComputedStyle(expandable).paddingBottom) : '0';
      expandable.style.height = `${height}px`;
    }
  });
}

export default function decorate(block) {
  const uncapitalize = (s) => s.charAt(0).toLowerCase() + s.slice(1);

  const items = Array.from(block.children).map((item) => {
    const heading = item.querySelector('h2');
    const label = heading.textContent;
    const uncapitalizedLabel = uncapitalize(label);
    const { id } = heading;

    const paragraphs = Array.from(item.querySelectorAll('p'));
    const link = paragraphs.pop().querySelector('a');
    const text = paragraphs.map((p) => p.outerHTML).join('');

    return {
      title: {
        id,
        label,
        uncapitalizedLabel,
      },
      text,
      more: {
        isInternal: new URL(link.href).hostname.split('.').slice(0, -1).pop() === 'zeiss',
        label: link.textContent,
        href: link.href,
      },
    };
  });

  block.innerHTML = template({ items });

  decorateIcons(block, true);

  block.querySelectorAll('.text-block').forEach((collapse) => {
    addCollapseListener(collapse);
  });
}
