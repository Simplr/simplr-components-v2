import { html, TemplateResult, render } from 'lit-html';
import { SimplrComponentBase } from './simplr-component-base';

export function renderComponent(target: SimplrComponentBase): void {
    const instance = instantiate(target);
    const targetNode: Element | DocumentFragment = target.shadowRoot ?? target;
    render(instance, targetNode);
}

export function instantiate(component: SimplrComponentBase): TemplateResult {
    const template: TemplateResult = createTemplate(component);
    return template;
}

function createTemplate(component: SimplrComponentBase): TemplateResult {
    const template = html`
        <style>
            ${component.css}
        </style>
        ${component.html}
    `;
    return template;
}
