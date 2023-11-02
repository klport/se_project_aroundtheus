class Section {
 constructor ({ items, renderer}), ".modal" {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(".modal");
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.appendChild(element);
  }
}

export default Section;
