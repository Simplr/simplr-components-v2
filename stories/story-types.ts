import { TemplateResult } from "lit-html";

export interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

export interface ArgTypes {
  title?: string;
  backgroundColor?: string;
}
