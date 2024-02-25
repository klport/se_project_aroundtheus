class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; //an array of data that we want to convert to html and then place on the page
    this._renderer = renderer; //function that takes data and converts it to html
    this._container = document.querySelector(containerSelector); //this place we want to append or prepend the html to
  }

  renderItems() {
    this._items.forEach((data) => {
      // this.addItem(data, "append");
      const cardEl = this._renderer(data);
      this.addItem(cardEl);
    });
  }

  // addItem(data, placement = "prepend") {
  //   const element = this._renderer(data);
  //   if (placement === "append") {
  //     this._container.append(element);
  //   } else if (placement === "prepend") {
  //     this._container.prepend(element);
  //   }
  // }

  addItem(data) {
    this._container.prepend(data);
  }

  // setItems{

  // }

  // deleteItems{
  //   this._items.forEach((item)=>)
  //   console.log(item));

  //   //delete Item using id, use a function that compares. filter is a method run on an array, returns a new array for which the filter was TRUE 

  // }
}

export default Section;
