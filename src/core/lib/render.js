import { html, render } from 'lit-html';
export function renderComponent(target) {
    const instance = instantiate(target);
    const targetNode = target.shadowRoot ?? target;
    render(instance, targetNode);
}
export function instantiate(component) {
    const template = createTemplate(component);
    return template;
}
function createTemplate(component) {
    const template = html `
        <style>
            ${component.css}
        </style>
        ${component.html}
    `;
    return template;
}
//# sourceMappingURL=render.js.map