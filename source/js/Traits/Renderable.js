class Renderable extends PositionManager
{
  _element;
  _wrapper;

  _rendered = false;

  // list of css classes applyed on the element
  _classList;

  _transformOrigin = '50% 50%';

  _connections = [];

  constructor() {
    super();
    this._element = document.createElement('div');
    this._element.classList.add('item');
    this._classList = this._element.classList;


    this._wrapper = document.createElement('div');
    this._wrapper.classList.add('item-wrapper');
    this._wrapper.manager = this;
    this._wrapper.appendChild(this._element);

  }

  addConnection(line) {
    this._connections.push(line);
    return this;
  }


  setTranformOrigin(value) {
    this._transformOrigin = value;
    return this;
  }


  draw() {
    this.getWrapper().style.transformOrigin  = this._transformOrigin;

    this.getWrapper().style.transform  = `
      translateX(` + (this.getX() + this._origins.x) + this.unit + `)
      translateY(` + (this.getY() + this._origins.y) + this.unit + `)
      translateZ(` + (this.getZ() + this._origins.z) + this.unit + `)

      rotateX(` + (this.getRotation('x')) + this.rotationUnit + `)
      rotateY(` + (this.getRotation('y')) + this.rotationUnit + `)
      rotateZ(` + (this.getRotation('z')) + this.rotationUnit + `)
    `;
    this._rendered = true;
    return this;
  }


  applyTransformations() {


   this.getWrapper().style.transform = `
      translateX(` + (this.getX() + this._origins.x) + this.unit + `)
      translateY(` + (this.getY() + this._origins.y) + this.unit + `)
      translateZ(` + (this.getZ() + this._origins.z) + this.unit + `)
      rotateX(` + this.getRotation('x') + `deg)
      rotateY(` + this.getRotation('y') + `deg)
      rotateZ(` + this.getRotation('z') + `deg)
    `;

  }


  getWrapper() {
    return this._wrapper;

  }


  getElement() {
    return this._element;
  }


  isRendered() {
    return this._rendered;
  }

  addClass(cssClass) {
    this.getElement().classList.add(cssClass);
  }

  removeClass(cssClass) {
    this.getElement().classList.remove(cssClass);
  }
}
