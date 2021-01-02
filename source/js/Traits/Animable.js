class Animable extends Renderable
{
  _rotationLoopManager = null;

  constructor() {
    super();
    this._rotationLoopManager = new Animation(this);
  }


  //======================ROTATION MANAGEMENT==========================
  animateRotationBy(x, y, z, duration = 5000 , callback = null) {
    let rotation =  new Animation(this);
    rotation.rotateBy(x, y, z, duration, callback);
  }

  flatten(duration, callback = null) {
    this.disableRotations();
    this._rotationLoopManager.flatten(duration , callback);
  }


  //======================ROTATION LOOP MANAGEMENT==========================

  disableRotations() {
    this._rotationLoopManager.disableRotations();

  }

  enableRotations(x = true, y = true, z = true, duration = 5000) {
    this._rotationLoopManager.enableRotations(x, y, z, duration);
  }

  rotationEnabled() {
    return this._rotationLoopManager.rotationEnabled();
  }
}