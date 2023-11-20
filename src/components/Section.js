class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; //an array of data that we want to convert to html and then place on the page
    this._renderer = renderer; //function that takes data and converts it to html
    this._container = document.querySelector(containerSelector); //this place we want to append or prepend the html to
  }

  renderItems() {
    this._items.forEach((data) => {
      this.addItem(data, "append");
    });
  }

  addItem(data, placement = "prepend") {
    const element = this._renderer(data);
    if (placement === "append") {
      this._container.append(element);
    } else if (placement === "prepend") {
      this._container.prepend(element);
    }
  }
}

export default Section;
