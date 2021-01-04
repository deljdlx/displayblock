class PositionManager
{

  unit = 'px';
  rotationUnit = 'deg';

  _origins = {
    x: 0,
    y: 0,
    z: 0,
  };

  _positions =  {
    x: 0,
    y: 0,
    z: 0,
  };

  _rotations = {
    x: 0,
    y: 0,
    z: 0,
  };




  setRotations(x = null, y = null, z = null) {


    if(x !== null) {
      this._rotations.x = x;
    }
    if(y !== null) {
      this._rotations.y = y;
    }
    if(z !== null) {
      this._rotations.z = z;
    }
    return this;
  }

  getPositions() {
    return this._positions;
  }


  setPositions(x = null, y = null, z = null) {
    if(x !== null) {
      this._positions.x = x;
    }

    if(y !== null) {
      this._positions.y = y;
    }

    if(z !== null) {
      this._positions.z = z;
    }
    return this;
  }

  getX() {
    return this._positions.x;
  }

  getY() {
    return this._positions.y;
  }

  getZ() {
    return this._positions.z;
  }


  getRotation(axe) {
    return this._rotations[axe];
  }


  getRotations() {
    return {...this._rotations};
  }


  restorePosition() {
    this.positions.x = this.savedX;
    this.positions.y = this.savedY;
    this.positions.z = this.savedZ;

    this.rotationX = this.savedRotationX;
    this.rotationY = this.savedRotationY;
    this.rotationZ = this.savedRotationZ;

    return this;
  }


  savePosition() {
    this.savedX = this.x;
    this.savedY = this.y;
    this.savedZ = this.z;

    this.savedRotationX = this.rotationX;
    this.savedRotationY = this.rotationY;
    this.savedRotationZ = this.rotationZ;

    return this;
  }
}
