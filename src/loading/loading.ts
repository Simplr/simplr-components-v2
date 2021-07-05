import { html, TemplateResult } from 'lit-html';
import { SimplrComponentBase, CustomElement, css } from '@simplr-wc/core';

const gearPath =
    'M24 14.187v-4.374c-2.148-.766-2.726-.802-3.027-1.529-.303-.729.083-1.169 1.059-3.223l-3.093-3.093c-2.026.963-2.488 1.364-3.224 1.059-.727-.302-.768-.889-1.527-3.027h-4.375c-.764 2.144-.8 2.725-1.529 3.027-.752.313-1.203-.1-3.223-1.059l-3.093 3.093c.977 2.055 1.362 2.493 1.059 3.224-.302.727-.881.764-3.027 1.528v4.375c2.139.76 2.725.8 3.027 1.528.304.734-.081 1.167-1.059 3.223l3.093 3.093c1.999-.95 2.47-1.373 3.223-1.059.728.302.764.88 1.529 3.027h4.374c.758-2.131.799-2.723 1.537-3.031.745-.308 1.186.099 3.215 1.062l3.093-3.093c-.975-2.05-1.362-2.492-1.059-3.223.3-.726.88-.763 3.027-1.528zm-4.875.764c-.577 1.394-.068 2.458.488 3.578l-1.084 1.084c-1.093-.543-2.161-1.076-3.573-.49-1.396.581-1.79 1.693-2.188 2.877h-1.534c-.398-1.185-.791-2.297-2.183-2.875-1.419-.588-2.507-.045-3.579.488l-1.083-1.084c.557-1.118 1.066-2.18.487-3.58-.579-1.391-1.691-1.784-2.876-2.182v-1.533c1.185-.398 2.297-.791 2.875-2.184.578-1.394.068-2.459-.488-3.579l1.084-1.084c1.082.538 2.162 1.077 3.58.488 1.392-.577 1.785-1.69 2.183-2.875h1.534c.398 1.185.792 2.297 2.184 2.875 1.419.588 2.506.045 3.579-.488l1.084 1.084c-.556 1.121-1.065 2.187-.488 3.58.577 1.391 1.689 1.784 2.875 2.183v1.534c-1.188.398-2.302.791-2.877 2.183zm-7.125-5.951c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.762 0-5 2.238-5 5s2.238 5 5 5 5-2.238 5-5-2.238-5-5-5z';

/**
 *   A Loading element From Simplr Components
 *
 *   Usage
 *
 *   <simplr-loading></simplr-loading>
 *
 *   To remove loading, call hide()
 *
 *   @element simplr-loading
 *
 * */
@CustomElement('simplr-loading')
export class SimplrLoading extends SimplrComponentBase {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    public hide(): void {
        this.addEventListener('transitionend', () => {
            this.remove();
        });
        this.setAttribute('hiding', '');
    }

    get html(): TemplateResult {
        return html`<div class="loader">
            <svg id="gear-1" height="24" width="24" viewBox="0 0 24 24">
                <path d=${gearPath} />
            </svg>
            <svg id="gear-2" height="24" width="24" viewBox="0 0 24 24">
                <path d=${gearPath} />
            </svg>
        </div>`;
    }

    get css(): string {
        return css`
            :host {
                position: absolute;
                top: 0;
                left: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                z-index: 999;
                background: rgba(243, 243, 243, 0.5);
                opacity: 1;

                --speed: 3s;
            }

            :host([hiding]) {
                opacity: 0;
                transition: 1s ease-in-out;
            }

            @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
                :host {
                    -webkit-backdrop-filter: blur(3px);
                    backdrop-filter: blur(3px);
                }
            }

            .loader {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            svg {
                height: 10%;
                width: 10%;
            }

            @keyframes gear1 {
                from {
                    transform: translate(10%, -25%) rotateZ(0deg);
                }
                to {
                    transform: translate(10%, -25%) rotateZ(360deg);
                }
            }

            @keyframes gear2 {
                from {
                    transform: translate(-10%, 25%) rotateZ(0deg);
                }
                to {
                    transform: translate(-10%, 25%) rotateZ(-360deg);
                }
            }

            #gear-1 {
                transform: translate(10%, -25%);
                animation: gear1 var(--speed) infinite linear;
                fill: var(--primary-color);
            }
            #gear-2 {
                transform: translate(-10%, 25%);
                animation: gear2 var(--speed) infinite linear;
                fill: var(--secondary-color);
            }
        `;
    }
}
