import { Badge } from '../../shared/badge.js';
import { css } from '../../shared/element/styles/css.js';
import { html } from '../../shared/template.js';
import { appearanceBehavior } from '../../shared/utilities/behaviors.js';
import { display } from '../../shared/utilities/style/display.js';
import { bodyFont } from './design-tokens.js';

export const badgeTemplate = (context, definition) => html`
  <template>
    <slot></slot>
  </template>
`;

export const lightgrayBadgeStyles = (context, definition) => css`
  :host([appearance='lightgray']) {
    border: 1px solid rgb(232, 237, 235);
    background-color: rgb(249, 251, 250);
    color: rgb(92, 108, 117);
  }
`;

export const greenBadgeStyles = (context, definition) => css`
  :host([appearance='green']) {
    border: 1px solid rgb(195, 231, 202);
    background-color: rgb(228, 244, 228);
    color: rgb(17, 97, 73);
  }
`;

export const redBadgeStyles = (context, definition) => css`
  :host([appearance='red']) {
    border: 1px solid rgb(249, 211, 197);
    background-color: rgb(252, 235, 226);
    color: rgb(143, 34, 27);
  }
`;

export const blueBadgeStyles = (context, definition) => css`
  :host([appearance='blue']) {
    border: 1px solid rgb(197, 228, 242);
    background-color: rgb(225, 242, 246);
    color: rgb(26, 86, 126);
  }
`;

// TODO - design tokens
export const badgeStyles = (context, definition) =>
  css`
    ${display('inline-flex')}
    :host {
      font-family: ${bodyFont};
      -webkit-box-align: center;
      align-items: center;
      font-weight: 700;
      font-size: 12px;
      line-height: 16px;
      border-radius: 5px;
      height: 18px;
      padding-left: 6px;
      padding-right: 6px;
      text-transform: uppercase;
    }
  `.withBehaviors(
    appearanceBehavior('lightgray', lightgrayBadgeStyles(context, definition)),
    appearanceBehavior('green', greenBadgeStyles(context, definition)),
    appearanceBehavior('red', redBadgeStyles(context, definition)),
    appearanceBehavior('blue', blueBadgeStyles(context, definition))
  );

// noinspection JSUnusedGlobalSymbols
export const badge = Badge.compose({
  baseName: 'badge',
  template: badgeTemplate,
  styles: badgeStyles
});
