// This is just a placeholder. It helps with editors knowing it's css. Might add functionality later.
export function css(strings: TemplateStringsArray, ...keys: unknown[]): string {
    let cssString = '';
    let i = 0;
    while (i < keys.length) {
        cssString += strings[i];
        cssString += String(keys[i]);
        i++;
    }
    cssString += strings[strings.length - 1];
    return cssString;
}
