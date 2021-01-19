import { html, fixture, expect } from '@open-wc/testing';

import { SimplrComponents } from '../src/SimplrComponents.js';
import '../src/simplr-components.js';

describe('SimplrComponents', () => {
  let element: SimplrComponents;
  beforeEach(async () => {
    element = await fixture(html`<simplr-components></simplr-components>`);
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot!.querySelector('h1')!;
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('My app');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
