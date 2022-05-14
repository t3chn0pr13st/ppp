/** @decorator */

import { attr } from './element/components/attributes.js';
import { observable } from './element/observation/observable.js';
import { ARIAGlobalStatesAndProperties } from './patterns/aria-global.js';
import { StartEnd } from './patterns/start-end.js';
import { applyMixins } from './utilities/apply-mixins.js';
import { html } from './element/templating/template.js';
import { ref } from './element/templating/ref.js';
import { slotted } from './element/templating/slotted.js';
import { endSlotTemplate, startSlotTemplate } from './patterns/start-end.js';
import { FormAssociated } from './form-associated.js';
import { FoundationElement } from './foundation-element.js';

class _Button extends FoundationElement {}

/**
 * A form-associated base class for the Button component.
 *
 * @internal
 */
export class FormAssociatedButton extends FormAssociated(_Button) {
  constructor() {
    super(...arguments);
    this.proxy = document.createElement('input');
  }
}

/**
 * The template for the Button component.
 * @public
 */
export const buttonTemplate = (context, definition) => html`
  <button
    class="control"
    part="control"
    ?autofocus="${(x) => x.autofocus}"
    ?disabled="${(x) => x.disabled}"
    form="${(x) => x.formId}"
    formaction="${(x) => x.formaction}"
    formenctype="${(x) => x.formenctype}"
    formmethod="${(x) => x.formmethod}"
    formnovalidate="${(x) => x.formnovalidate}"
    formtarget="${(x) => x.formtarget}"
    name="${(x) => x.name}"
    type="${(x) => x.type}"
    value="${(x) => x.value}"
    aria-atomic="${(x) => x.ariaAtomic}"
    aria-busy="${(x) => x.ariaBusy}"
    aria-controls="${(x) => x.ariaControls}"
    aria-current="${(x) => x.ariaCurrent}"
    aria-describedBy="${(x) => x.ariaDescribedby}"
    aria-details="${(x) => x.ariaDetails}"
    aria-disabled="${(x) => x.ariaDisabled}"
    aria-errormessage="${(x) => x.ariaErrormessage}"
    aria-expanded="${(x) => x.ariaExpanded}"
    aria-flowto="${(x) => x.ariaFlowto}"
    aria-haspopup="${(x) => x.ariaHaspopup}"
    aria-hidden="${(x) => x.ariaHidden}"
    aria-invalid="${(x) => x.ariaInvalid}"
    aria-keyshortcuts="${(x) => x.ariaKeyshortcuts}"
    aria-label="${(x) => x.ariaLabel}"
    aria-labelledby="${(x) => x.ariaLabelledby}"
    aria-live="${(x) => x.ariaLive}"
    aria-owns="${(x) => x.ariaOwns}"
    aria-pressed="${(x) => x.ariaPressed}"
    aria-relevant="${(x) => x.ariaRelevant}"
    aria-roledescription="${(x) => x.ariaRoledescription}"
    ${ref('control')}
  >
    ${startSlotTemplate(context, definition)}
    <span class="content" part="content">
      <slot ${slotted('defaultSlottedContent')}></slot>
    </span>
    ${endSlotTemplate(context, definition)}
  </button>
`;

/**
 * A Button Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element }.
 *
 * @public
 */
export class Button extends FormAssociatedButton {
  /**
   * Determines if the element should receive document focus on page load.
   *
   * @public
   * @remarks
   * HTML Attribute: autofocus
   */
  @attr({ mode: 'boolean' })
  autofocus;

  /**
   * The id of a form to associate the element to.
   *
   * @public
   * @remarks
   * HTML Attribute: form
   */
  @attr({ attribute: 'form' })
  formId;

  /**
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
   *
   * @public
   * @remarks
   * HTML Attribute: formaction
   */
  @attr
  formaction;

  /**
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
   *
   * @public
   * @remarks
   * HTML Attribute: formenctype
   */
  @attr
  formenctype;

  /**
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
   *
   * @public
   * @remarks
   * HTML Attribute: formmethod
   */
  @attr
  formmethod;

  /**
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
   *
   * @public
   * @remarks
   * HTML Attribute: formnovalidate
   */
  @attr({ mode: 'boolean' })
  formnovalidate;

  /**
   * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
   *
   * @public
   * @remarks
   * HTML Attribute: formtarget
   */
  @attr
  formtarget;

  /**
   * The button type.
   *
   * @public
   * @remarks
   * HTML Attribute: type
   */
  @attr
  type;

  /**
   *
   * Default slotted content
   *
   * @public
   * @remarks
   */
  @observable
  defaultSlottedContent;

  constructor() {
    super(...arguments);
    /**
     * Submits the parent form
     */
    this.handleSubmission = () => {
      if (!this.form) {
        return;
      }

      const attached = this.proxy.isConnected;

      if (!attached) {
        this.attachProxy();
      }

      // Browser support for requestSubmit is not comprehensive
      // so click the proxy if it isn't supported
      typeof this.form.requestSubmit === 'function'
        ? this.form.requestSubmit(this.proxy)
        : this.proxy.click();

      if (!attached) {
        this.detachProxy();
      }
    };
    /**
     * Resets the parent form
     */
    this.handleFormReset = () => {
      this.form?.reset();
    };
  }

  formactionChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.formAction = this.formaction;
    }
  }

  formenctypeChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.formEnctype = this.formenctype;
    }
  }

  formmethodChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.formMethod = this.formmethod;
    }
  }

  formnovalidateChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.formNoValidate = this.formnovalidate;
    }
  }

  formtargetChanged() {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.formTarget = this.formtarget;
    }
  }

  typeChanged(previous, next) {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.type = this.type;
    }

    next === 'submit' && this.addEventListener('click', this.handleSubmission);
    previous === 'submit' &&
      this.removeEventListener('click', this.handleSubmission);
    next === 'reset' && this.addEventListener('click', this.handleFormReset);
    previous === 'reset' &&
      this.removeEventListener('click', this.handleFormReset);
  }

  /**
   * @internal
   */
  connectedCallback() {
    super.connectedCallback();
    this.proxy.setAttribute('type', this.type);
  }
}

/**
 * Includes ARIA states and properties relating to the ARIA button role
 *
 * @public
 */
export class DelegatesARIAButton {
  /**
   * See {@link https://www.w3.org/WAI/PF/aria/roles#button} for more information
   * @public
   * @remarks
   * HTML Attribute: aria-expanded
   */
  @attr({ attribute: 'aria-expanded', mode: 'fromView' })
  ariaExpanded;

  /**
   * See {@link https://www.w3.org/WAI/PF/aria/roles#button} for more information
   * @public
   * @remarks
   * HTML Attribute: aria-pressed
   */
  @attr({ attribute: 'aria-pressed', mode: 'fromView' })
  ariaPressed;
}

applyMixins(DelegatesARIAButton, ARIAGlobalStatesAndProperties);
applyMixins(Button, StartEnd, DelegatesARIAButton);
