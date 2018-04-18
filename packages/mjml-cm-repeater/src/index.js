import { BodyComponent } from 'mjml-core'

export default class MjCMRepeater extends BodyComponent {
  static defaultAttributes = {
  }

  getChildContext() {
    return {
      ...this.context
    }
  }

  render() {

    return `
      <repeater>
        ${this.renderChildren()}
      </repeater>
    `
  }
}
