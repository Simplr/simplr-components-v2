import { SimplrComponentBase } from './simplr-component-base';
export declare type PropertyOptions = {
    reflect?: boolean;
    type?: any;
    default?: any;
    value?: any;
};
export declare type UpdatedProperties<T = any> = keyof T extends PropertyKey ? Map<keyof T, unknown> : never;
export declare function CustomElement<_T extends SimplrComponentBase>(componentName: string): Function;
export declare function Property(_opts: PropertyOptions): (prototype: SimplrComponentBase, name: PropertyKey) => void;
//# sourceMappingURL=decorators.d.ts.map