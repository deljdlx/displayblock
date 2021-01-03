class Animation
{

  _lastTimestamp = null;
  _duration = null;
  _startTime = null;
  _animation = null;

  _rotations = {
    increments : {
      x: null,
      y: null,
      z: null,
    }
  };

  _translations = {
    increments : {
      x: null,
      y: null,
      z: null,
    }
  };


  _item;

  constructor(element) {
    this._item = element;
  }

  animate(duration, callback = null) {


  }


  //======================TRANSLATION MANAGEMENT==========================

  translateTo(x = 0, y = 0, z = 0, duration = 5000, callback = null) {
    this.translateBy(
      x - this._item.getX(),
      y - this._item.getY(),
      z - this._item.getZ(),
      duration,
      callback,
    );
  }


  translateBy(x = 0, y = 0, z = 0, duration = 5000, callback = null) {
    this._duration = duration;
    this._startTime = null;
    this._lastTimestamp = null;

    this._translations.increments.x =  x / duration;
    this._translations.increments.y =  y / duration;
    this._translations.increments.z =  z / duration;
    this.animateTranslation(duration, callback);
  }


  animateTranslation(duration, callback = null) {


    this._animation = requestAnimationFrame((timestamp) => {

      if(!this._startTime) {
        this._startTime = timestamp;
      }

      if(this._lastTimestamp) {
        let elapsed = timestamp - this._lastTimestamp;

        this._item.setPositions(
          this._item.getX() + (elapsed * this._translations.increments.x),
          this._item.getY() + (elapsed * this._translations.increments.y),
          this._item.getZ() + (elapsed * this._translations.increments.z)
        );
        this._item.applyTransformations();
      }

      this._lastTimestamp = timestamp;
      const remaining = duration - (timestamp - this._startTime);

      if(remaining >= 0) {
        this.animateTranslation(duration, callback);
      }
      else {
        this.disableTranslation();
        if(callback) {
          callback();
        }
      }
    });
    return;
  }

  disableTranslation() {
    cancelAnimationFrame(this._animation);
    this._animation = null;
  }


  //======================ROTATION MANAGEMENT==========================


  flatten(duration, callback) {
    this.rotateTo(0, 0, 0, duration, callback);
  }

  rotateTo(x = 0, y = 0, z = 0, duration = 5000, callback = null) {
    this.rotateBy(
      x - this._item.getRotation('x'),
      y - this._item.getRotation('y'),
      z - this._item.getRotation('z'),
      duration,
      callback,
    );
  }


  rotateBy(x = 0, y = 0, z = 0, duration = 5000, callback = null) {
    this._duration = duration;
    this._startTime = null;
    this._lastTimestamp = null;

    this._rotations.increments.x =  x / duration;
    this._rotations.increments.y =  y / duration;
    this._rotations.increments.z =  z / duration;
    this.animateRotation(duration, callback);
  }



  animateRotation(duration, callback = null) {


    this._animation = requestAnimationFrame((timestamp) => {

      if(!this._startTime) {
        this._startTime = timestamp;
      }

      if(this._lastTimestamp) {
        let elapsed = timestamp - this._lastTimestamp;

        this._item.setRotations(
          this._item.getRotation('x') + (elapsed * this._rotations.increments.x),
          this._item.getRotation('y') + (elapsed * this._rotations.increments.y),
          this._item.getRotation('z') + (elapsed * this._rotations.increments.z)
        );
        this._item.applyTransformations();
      }

      this._lastTimestamp = timestamp;
      const remaining = duration - (timestamp - this._startTime);

      if(remaining >= 0) {
        this.animateRotation(duration, callback);
      }
      else {
        this._item.setRotations(
           this._item.getRotation('x') % 360,
           this._item.getRotation('y') % 360,
           this._item.getRotation('z') % 360
        );
        this.disableRotations();
        if(callback) {
          callback();
        }
      }
    });
    return;
  }


  disableRotations() {
    cancelAnimationFrame(this._animation);
    this._animation = null;

  }

  enableRotations(x = true, y = true, z = true, duration = 5000) {


    if(x) {
      x = 360;
    }
    if(y) {
      y = 360;
    }

    if(z) {
      z = 360;
    }

    this.rotateBy(x, y, z, duration, () => {
      this.enableRotations(x, y, z, duration);
    });
  }

  rotationEnabled() {
    if(this._animation) {
      return true;
    }
    else {
      return false;
    }
  }
}


