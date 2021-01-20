import { TemplateResult } from 'lit-html';
import { UpdatedProperties } from './decorators';
export declare abstract class SimplrComponentBase extends HTMLElement {
    static _is: string | undefined;
    _properties: ComponentProperties;
    _renderRequested: boolean;
    _updatedProperties: UpdatedProperties;
    _willUpdate: boolean;
    constructor();
    beforeRender(): void;
    afterRender(): void;
    updated(_updatedProperties: UpdatedProperties): void;
    render(): void;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    requestRender(): void;
    publish(eventName: string, eventPayload: any): void;
    _queuePropertyUpdate(name: string, oldValue: unknown): void;
    abstract get html(): TemplateResult;
    abstract get css(): string;
}
export declare type ComponentProperties<T = any> = keyof T extends PropertyKey ? Map<keyof T, unknown> : never;
//# sourceMappingURL=simplr-component-base.d.ts.map