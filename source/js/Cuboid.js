class Cuboid extends Item
{


  width = 100;
  height = 100;
  depth = 100;


  topContent = '';
  frontContent = '';


  constructor(width, height, depth) {

    super();

    if(typeof(width) !== 'undefined' && width !== null) {
      this.width = width;
    }

    if(typeof(height) !== 'undefined' && height !== null) {
      this.height = height;
    }

    if(typeof(depth) !== 'undefined' && depth !== null) {
      this.depth = depth;
    }


    this.getElement().classList.add('cuboid');
    this.getElement().style.width = this.width + this.unit;
    this.getElement().style.height = this.height + this.unit;

    this._buildSides();

    this.topContentElement = null;
    this.frontContentElement = null;
  }


  setTopContent(content) {
    this.topContent = content;
    if(this.topElement) {
      this.topElement.innerHTML = content;
    }
  }

  setFrontContent(content) {
    this.frontContent = content;
    if(this.frontElement) {
      this.frontElement.innerHTML = content;
    }
  }

  centerOrigin() {
    this.originX = Math.floor(this.width / -2);
    this.originY = Math.floor(this.height / -2);
    this.originZ = Math.floor(this.depth / 2);

    this.getWrapper().style.transformOrigin =
      Math.floor(this.width / 2) + 'px '
      + Math.floor(this.height / 2) + 'px '
      + (this.depth / -2 ) + 'px '
    ;

  }

  setWidth(width) {
    this.width = width;
    this.draw();
  }

  setHeight(height) {
    this.height = height;
    this.draw();
  }


  setDepth(height) {
    this.depth = height;
    this.draw();
  }

  getTopContentElement()
  {
    return this.topContentElement;
  }

  getFrontSide() {
    return this.frontElement;
  }


  draw() {
    super.draw();

    this.topElement.style.width = this.width + this.unit;
    this.topElement.style.height = this.depth + this.unit;
    this.topElement.style.transform = 'translateZ(' + (this.depth * -1) + this.unit + ') rotateX(90deg)';
    this.topElement.innerHTML = this.topContent;

    // this.topElement.innerHTML = 'TOP';


    this.frontElement.style.width = this.width + this.unit;
    this.frontElement.style.height = this.height + this.unit;
    this.setFrontContent(this.frontContent);
    // this.frontElement.innerHTML = 'FRONT';


    this.rightElement.style.width = this.depth + this.unit;
    this.rightElement.style.height = this.height+ this.unit;
    this.rightElement.style.transform = 'rotateY(90deg)';
    // this.rightElement.innerHTML = 'RIGHT';

    this.leftElement.style.width = this.depth + this.unit;
    this.leftElement.style.height = this.height + this.unit;
    this.leftElement.style.transform = 'rotateY(-90deg) translateX(-' + this.depth  + this.unit + ')';
    // this.leftElement.innerHTML = 'LEFT';

    this.bottomElement.style.width = this.width + this.unit;
    this.bottomElement.style.height = this.depth + this.unit;
    this.bottomElement.style.transform = 'rotateX(-90deg)';
    // this.bottomElement.innerHTML = 'BOTTOM';


    this.backElement.style.width = this.width + this.unit;
    this.backElement.style.height = this.height + this.unit;
    this.backElement.style.transform = 'translateZ(-' + this.depth  + this.unit + ') rotateY(180deg) translateX(-' + this.width + this.unit + ')';
    // this.backElement.innerHTML = 'BACK';
  }



  _buildSides() {

    this._wrapper.style.width = this.width + this.unit;
    this._wrapper.style.height = this.height + this.unit;


    this.frontElement = document.createElement('div');
    this.frontElement.classList.add('cuboid-side');
    this.frontElement.classList.add('cuboid-side-front');
    this.getElement().appendChild(this.frontElement);



    this.topElement = document.createElement('div');
    this.topElement.classList.add('cuboid-side');
    this.topElement.classList.add('cuboid-side-top');

    this.topContentElement = document.createElement('div');
    this.topContentElement.classList.add('side-top-content');
    this.topElement.appendChild(this.topContentElement);
    this.getElement().appendChild(this.topElement);



    this.bottomElement = document.createElement('div');
    this.bottomElement.classList.add('cuboid-side-bottom');
    this.bottomElement.classList.add('cuboid-side');
    this.getElement().appendChild(this.bottomElement);





    this.backElement = document.createElement('div');
    this.backElement.classList.add('cuboid-side-back');
    this.backElement.classList.add('cuboid-side');
    this.getElement().appendChild(this.backElement);


    this.rightElement = document.createElement('div');
    this.rightElement.classList.add('cuboid-side-right');
    this.rightElement.classList.add('cuboid-side');
    this.getElement().appendChild(this.rightElement);

    this.leftElement = document.createElement('div');
    this.leftElement.classList.add('cuboid-side-left');
    this.leftElement.classList.add('cuboid-side');
    this.getElement().appendChild(this.leftElement);
  }

}
