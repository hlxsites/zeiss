import { decorateIcons } from '../../scripts/lib-franklin.js';
import { socials, addClipboardInteraction } from '../../scripts/utils.js';
import template from './template.js';

/**
 * decorates the social block
 * @param {Element} block The social block element
 */

export default async function decorate(block) {
  Handlebars.partials['social'] = Handlebars.template(template);
  
  block.innerHTML = Handlebars.partials['social']({
    title: block.textContent.trim(),
    items: socials
  });

  decorateIcons(block, true);

  addClipboardInteraction(block);
}
