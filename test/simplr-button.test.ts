import { html, fixture, expect } from '@open-wc/testing';

import { SimplrButton } from '../src/button/button';
import '../src/button/button';

describe('SimplrButton', () => {
    it('is accessible', async () => {
        const el: SimplrButton = await fixture(html`<simplr-button>Test</simplr-button>`);
        el.name = 'testi';
        el.label = 'testi';
        await expect(el).to.be.accessible();
    });

    it('disabled-property set correctly', async () => {
        const el: SimplrButton = await fixture(html`<simplr-button>Test</simplr-button>`);
        el.disabled = true;
        await expect(el.disabled).to.eq(true);
    });

    it('disabled-property reflects attribute', async () => {
        const el: SimplrButton = await fixture(html`<simplr-button>Test</simplr-button>`);
        el.disabled = true;
        await expect(el.hasAttribute('disabled')).eq(true);
    });
});
