export default class Section {
  constructor(renderer, container) {
    this._renderer = renderer;
    this._container = container;
  }

  renderItems(data) {
    this._renderedItems = data,
    this._renderedItems.forEach(item => this._renderer(item));
  }

  addItem(element, toEnd) {
    const method = toEnd ? 'append' : 'prepend';
    this._container[method](element);
  }
}