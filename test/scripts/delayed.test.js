/* eslint-disable no-unused-expressions */
/* global describe before it */

import { expect } from '@esm-bundle/chai';

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
});
