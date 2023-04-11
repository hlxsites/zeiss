/* eslint-disable no-unused-expressions */
/* global describe before it */

import { expect } from '@esm-bundle/chai';

const PATH = '/de/semiconductor-manufacturing-technology/news-und-events/smt-pressemeldung/zeiss-trumpf-und-fraunhofer-mit-deutschem-zukunftspreis-ausgezeichnet';

let delayed;

describe('Delayed customer features', () => {
  before(async () => {
    delayed = await import('../../scripts/delayed.js');
  });

  it('Define Page Environment', async () => {
    expect(delayed.pageEnvironment('unknown')).to.equal('publish');
    expect(delayed.pageEnvironment('www.zeiss.de')).to.equal('prod_publish');
    expect(delayed.pageEnvironment('localhost')).to.equal('local_publish');
  });

  it('Undefined Path Item', async () => {
    expect(delayed.pathItem(PATH, 100)).to.equal('');
  });

  it('Define Content Hierarchy', async () => {
    expect(delayed.pathItem(PATH, 3)).to.equal('news-und-events');
  });

  it('Define Page Pool', async () => {
    expect(delayed.pathItem(PATH, 4)).to.equal('smt-pressemeldung');
  });
});
