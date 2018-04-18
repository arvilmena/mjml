import { BodyComponent } from 'mjml-core'

export default class MjCMLayout extends BodyComponent {

  static allowedAttributes = {
    'label': 'string',
  }

  static defaultAttributes = {
    'label': '',
  }

  getChildContext() {
    return {
      ...this.context
    }
  }

  render() {

    return `
      <layout
        ${this.htmlAttributes({
          label: this.getAttribute('label'),
        })}
      >
        ${this.renderChildren()}
      </layout>
    `
  }
}
