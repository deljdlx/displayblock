class Line extends Item
{


  _length = 100;
  _weight = 1;
  _color = '#fff';

  _start = {
    x: 0,
    y: 0,
    z: 0,
  };

  _end = {
    x: 0,
    y: 0,
    z: 0,
  };

  _connectedItems = {
    start: null,
    end: null,
  };


  constructor(weight = 1, color = '#fff') {

    super();

    this._weight = weight;
    this._color = color;

    this.getWrapper().classList.add('line');
    this.getElement().classList.add('line');
    this.getElement().style.width = this._length + this.unit;
    this.getElement().style.height = this._weight + this.unit;
    this.getElement().style.backgroundColor = this._color;
    this.setTranformOrigin('0 0');
  }

  connectItems(itemStart, itemEnd) {

    this._connectedItems.start = itemStart;
    this._connectedItems.end = itemEnd;

    let start = this._connectedItems.start.getCenter();
    let end = this._connectedItems.end.getCenter();

    console.log(start, end);

    this.setStart(start.x, start.y, start.z);
    this.setEnd(end.x, end.y, end.z);
    return this;
  }




  getStart(axe) {
    return this._start[axe];
  }

  setStart(x, y, z) {
    this._start.x = x;
    this._start.y = y;
    this._start.z = z;

    this.setX(x);
    this.setY(y);
    this.setZ(z);

    return this;
  }

  setEnd(x, y, z) {

    if(this._end.z < this._start.z) {

      this._end.x = this._start.x;
      this._end.y = this._start.y;
      this._end.z = this._start.z;
      this.setStart(x, y, z);

    }
    else {
      this._end.x = x;
      this._end.y = y;
      this._end.z = z;
    }

    let xDelta = this._end.x - this._start.x;
    let yDelta = this._end.y - this._start.y;
    let zDelta = this._end.z - this._start.z;

    let length;

    let angleX = 0;
    let angleY = 0;
    let angleZ = 0;

    if(xDelta) {
      length = Math.abs(xDelta);
    }

    if(yDelta) {
      length = Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2));
    }

    if(zDelta) {
      if(xDelta) {
        length = Math.sqrt(Math.pow(xDelta, 2) + Math.pow(zDelta, 2));
        if(yDelta) {
          length = Math.sqrt(Math.pow(length, 2) + Math.pow(yDelta, 2));
        }
      }
      else if(yDelta) {
        length = Math.sqrt(Math.pow(yDelta, 2) + Math.pow(zDelta, 2));
      }
      if(!length) {
        length = Math.abs(zDelta);
      }
    }

    //=========================================================

    if(zDelta && !yDelta && !xDelta) {
      angleY = 90 * Math.PI / 180;
    }
    if(!zDelta && yDelta && !xDelta) {
      angleZ = 90 * Math.PI / 180;
    }
    else if(zDelta && !yDelta  && xDelta ) {
      angleY = Math.atan( zDelta/ xDelta);
    }
    else if(zDelta && yDelta  && !xDelta ) {
      angleX = Math.atan( zDelta / yDelta);
      angleZ = 90 * Math.PI / 180;
    }
    else if(!zDelta && yDelta  && xDelta ) {
      angleZ = Math.atan( yDelta / xDelta);
    }
    else if(zDelta && yDelta  && xDelta ) {
        angleY = Math.acos(xDelta / length);
        let z1 = Math.sin(angleY) * length;
        if(yDelta > 0) {
          angleX = Math.acos(this._end.z / z1) * -1;
        }
        else {
          angleX = Math.acos(this._end.z / z1);
        }

    }

    // ============================================================

    angleX = angleX/Math.PI * 180;
    angleY = angleY/Math.PI * -180;
    angleZ = angleZ/Math.PI * 180;

    if(xDelta < 0 && !yDelta) {
      angleZ += 180;
    }

    if(zDelta < 0 && !xDelta && !yDelta) {
      angleZ += 180;
    }

    if(yDelta < 0 && !xDelta && !zDelta) {
      angleZ += 180;
    }

    if(zDelta > 0 && !xDelta && yDelta < 0) {
      angleZ += 180;
    }

    this._length = Math.round(length);

    this.setRotations(angleX, angleY, angleZ);

    this.draw();

    return this;
  }



  draw() {
    super.draw();

    this.getElement().style.width = this._length + this.unit;
    this.getElement().style.height = this._weight + this.unit;
  }



}
