class Section {
  constructor({ items, renderer }, selectorContainer) {
    this._items = items;
    this.renderer = renderer;
    this._container = document.querySelector(selectorContainer);
  }

  renderItems() {
    this._items.forEach((item) => {
      this.renderer(item);
    });
    }
  
  addItem(element) {
    this._container.prepend(element);
  }
}

export default Section;