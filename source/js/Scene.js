class Scene extends Animable
{


  _viewport;

  _name = '';
  items = {};

  constructor(viewport) {
    super();
    this._viewport = viewport;

    this.container = null;

    // this.element = document.createElement('div');
    this.getElement().classList.add('board');
  }

  setName(name) {
    this._name = name;
    this.getElement().dataset.name = name;
    return this;
  }

  getName() {
    return this._name;
  }


  setViewport(viewport) {
    this._viewport = viewport;
  }

  getViewport() {
    return this._viewport;
  }



  addItem(item, x, y, z) {

    item.setBoard(this);

    this.items[item.getId()] = {
      x: x,
      y: y,
      z: z,
      item: item
    };

    item.draw();
    return this;
  }

  getItemDescriptorById(itemId) {
    return this.items[itemId]
  }

  setContainer(container) {
    this.container = container;
    this.container.appendChild(this._element);
    return this;
  }

  generate() {
    this.refresh();
    this._rendered = true;
  }


  clear() {
    this.items = {};
    this.getElemen().innerHTML = '';
    return this;
  }

  refresh() {

    for (let id in this.items) {
      let itemData = this.items[id];

      itemData.item.setPositions(
        itemData.x,
        itemData.y,
        itemData.z
      );

      let wrapper = itemData.item.getWrapper();
      this.getElement().appendChild(wrapper);
      itemData.item.draw();

    }
  }

}
