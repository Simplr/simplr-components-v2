import { html, fixture, expect } from '@open-wc/testing';

import SimplrButton from '../src/button/button';

describe('SimplrButton', () => {
    let element: SimplrButton;
    beforeEach(async () => {
        element = await fixture(html`<simplr-button></simplr-button>`);
    });

    it('is accessible', async () => {
        await expect(element).shadowDom.to.be.accessible();
    });
});
