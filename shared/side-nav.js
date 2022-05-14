/** @decorator */

import { attr } from './element/components/attributes.js';
import { observable } from './element/observation/observable.js';
import { FoundationElement } from './foundation-element.js';

export class SideNav extends FoundationElement {
  @attr({ mode: 'boolean' })
  ready;

  @attr({ mode: 'boolean' })
  expanded;

  @attr({ mode: 'boolean' })
  hovered;

  @observable
  topLevelItems;

  collapseToggle;

  constructor() {
    super(...arguments);

    this.topLevelItems = [];
  }

  connectedCallback() {
    super.connectedCallback(...arguments);

    const parent = this;

    ['pointerleave', 'pointercancel'].forEach((type) => {
      this.collapseToggle.addEventListener(
        type,
        (event) => {
          if (event.relatedTarget && !event.relatedTarget.closest('.wrapper'))
            parent.hovered = false;
        },
        {
          passive: true
        }
      );
    });

    setTimeout(() => {
      this.ready = true;
    }, 200);
  }

  handlePointerEnter() {
    this.hovered = true;
  }

  handlePointerLeave(c) {
    if (!this.expanded && c.event.relatedTarget === this.collapseToggle) return;

    this.hovered = false;
  }
}
