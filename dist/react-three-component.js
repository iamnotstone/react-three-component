(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("three"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "three"], factory);
	else if(typeof exports === 'object')
		exports["ReactThreeComponent"] = factory(require("react"), require("three"));
	else
		root["ReactThreeComponent"] = factory(root["React"], root["THREE"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(1);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactThreeComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _three = __webpack_require__(7);

var THREE = _interopRequireWildcard(_three);

var _propTypes = __webpack_require__(8);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 *  props{
 *    height,
 *    width,
 *    appendObjects, [THREE.Object3D]
 *    dropObjects, [THREE.Object3D]
 *    mode:ENUM{
 *      FIT_ALL,
 *      FIT_SELECTE,
 *      LEFT_VIEW,
 *      RIGHT_VIEW,
 *      FRONT_VIEW,
 *      REAR_VIEW,
 *      TOP_VIEW,
 *      BOTTOM_VIEW,
 *      AXONOMETRIC_VIEW,
 *      FIT_ALL_AXONO_VIEW
 *    },
 *
 *    trig: Bool
 *  }
 *
 */

function matrixOfRotateAxisAndPoint(axis, point, angle) {
  var x01 = -point.x,
      y01 = -point.y,
      z01 = -point.z;
  var vec01 = new THREE.Vector3(x01, y01, z01);
  var rotateM = new THREE.Matrix4();
  rotateM.makeRotationAxis(axis, angle);
  var vec01Next = vec01.clone().applyMatrix4(rotateM);
  var objectVec = vec01Next.clone().sub(vec01);
  var translateM = new THREE.Matrix4();
  translateM.makeTranslation(objectVec.x, objectVec.y, objectVec.z);
  return translateM.multiply(rotateM);
}

function makeNormalizeMatrixOnAxis(m) {
  var vector = new THREE.Vector3();
  var te = m.elements;
  var sx = vector.set(te[0], te[1], te[2]).length();
  var sy = vector.set(te[4], te[5], te[6]).length();
  var sz = vector.set(te[8], te[9], te[10]).length();
  var invSx = 1 / sx;
  var invSy = 1 / sy;
  var invSz = 1 / sz;
  te[0] *= invSx;
  te[1] *= invSx;
  te[2] *= invSx;

  te[4] *= invSy;
  te[5] *= invSy;
  te[6] *= invSy;

  te[8] *= invSz;
  te[9] *= invSz;
  te[10] *= invSz;
}

var ReactThreeComponent = exports.ReactThreeComponent = function (_React$Component) {
  _inherits(ReactThreeComponent, _React$Component);

  function ReactThreeComponent(props) {
    _classCallCheck(this, ReactThreeComponent);

    var _this = _possibleConstructorReturn(this, (ReactThreeComponent.__proto__ || Object.getPrototypeOf(ReactThreeComponent)).call(this, props));

    _this._onDocumentRightClick = function (event) {
      event.preventDefault();
    };

    _this._onDocumentMouseDown = function (event) {
      event.preventDefault();
      //console.log('button', event.button)
      var clientRect = _this.container.getBoundingClientRect();
      document.addEventListener('mousemove', _this._onDocumentMouseMove, false);
      document.addEventListener('mouseup', _this._onDocumentMouseUp, false);
      document.addEventListener('mouseout', _this._onDocumentMouseOut, false);
      var windowHalfX = (clientRect.left + clientRect.right) / 2;

      var windowHalfY = (clientRect.top + clientRect.bottom) / 2;
      _this.previousXY[0] = event.clientX - windowHalfX;
      _this.previousXY[1] = event.clientY - windowHalfY;

      _this.currentXY[0] = _this.previousXY[0];
      _this.currentXY[1] = _this.previousXY[1];
      if (event.button == 1 || event.button == 0) _this.isRotating = true;else if (event.button == 2) _this.isMoving = true;
    };

    _this._onDocumentMouseMove = function (event) {
      var clientRect = _this.container.getBoundingClientRect();
      var windowHalfX = (clientRect.left + clientRect.right) / 2;
      var windowHalfY = (clientRect.top + clientRect.bottom) / 2;

      _this.currentXY[0] = event.clientX - windowHalfX;
      _this.currentXY[1] = event.clientY - windowHalfY;
      _this.animate();
    };

    _this._onDocumentMouseUp = function () {
      document.removeEventListener('mousemove', _this._onDocumentMouseMove, false);
      document.removeEventListener('mouseup', _this._onDocumentMouseUp, false);
      document.removeEventListener('mouseout', _this._onDocumentMouseOut, false);
      _this.isRotating = false;
      _this.isMoving = false;
    };

    _this._onDocumentMouseOut = function () {
      document.removeEventListener('mousemove', _this._onDocumentMouseMove, false);
      document.removeEventListener('mouseup', _this._onDocumentMouseUp, false);
      document.removeEventListener('mouseout', _this._onDocumentMouseOut, false);
      _this.isRotating = false;
      _this.isMoving = false;
    };

    _this._onDocumentTouchStart = function (event) {
      document.addEventListener('touchend', _this._onDocumentTouchEnd, false);
      if (event.touches.length === 1) {
        event.preventDefault();
        var clientRect = _this.container.getBoundingClientRect();
        var windowHalfX = (clientRect.left + clientRect.right) / 2;

        var windowHalfY = (clientRect.top + clientRect.bottom) / 2;

        _this.previousXY[0] = event.touches[0].pageX - windowHalfX;
        _this.previousXY[1] = event.touches[0].pageY - windowHalfY;

        _this.currentXY[0] = _this.previousXY[0];
        _this.currentXY[1] = _this.previousXY[1];

        _this.isRotating = true;
      } else if (event.touches.length === 3) {
        var _clientRect = _this.container.getBoundingClientRect();
        var _windowHalfX = (_clientRect.left + _clientRect.right) / 2;

        var _windowHalfY = (_clientRect.top + _clientRect.bottom) / 2;
        var centerX = 0,
            centerY = 0;
        Object.keys(event.touches).forEach(function (k) {
          centerX += event.touches[k].pageX;
          centerY += event.touches[k].pageY;
        });
        centerX /= 3;
        centerY /= 3;
        _this.previousXY[0] = centerX - _windowHalfX;
        _this.previousXY[1] = centerY - _windowHalfY;

        _this.currentXY[0] = _this.previousXY[0];
        _this.currentXY[1] = _this.previousXY[1];

        _this.isMoving = true;
      } else if (event.touches.length === 2) {
        //get this.touchPreviousDistance
        event.preventDefault();
        var aX = event.touches[0].pageX;
        var aY = event.touches[0].pageY;
        var bX = event.touches[1].pageX;
        var bY = event.touches[1].pageY;
        _this.touchPreviousDistance = Math.pow(aX - bX, 2) + Math.pow(aY - bY, 2);
        _this.touchCurrentDistance = _this.touchPreviousDistance;
      }
    };

    _this._onDocumentTouchMove = function (event) {
      if (event.touches.length === 1) {
        event.preventDefault();

        var clientRect = _this.container.getBoundingClientRect();
        var windowHalfX = (clientRect.left + clientRect.right) / 2;

        var windowHalfY = (clientRect.top + clientRect.bottom) / 2;

        _this.currentXY[0] = event.touches[0].pageX - windowHalfX;
        _this.currentXY[1] = event.touches[0].pageY - windowHalfY;
      } else if (event.touches.length === 3) {
        event.preventDefault();

        var _clientRect2 = _this.container.getBoundingClientRect();
        var _windowHalfX2 = (_clientRect2.left + _clientRect2.right) / 2;

        var _windowHalfY2 = (_clientRect2.top + _clientRect2.bottom) / 2;

        var centerX = 0,
            centerY = 0;
        Object.keys(event.touches).forEach(function (k) {
          centerX += event.touches[k].pageX;
          centerY += event.touches[k].pageY;
        });
        centerX /= 3;
        centerY /= 3;
        _this.currentXY[0] = centerX - _windowHalfX2;
        _this.currentXY[1] = centerY - _windowHalfY2;
        if (_this.isRotating) {
          _this.isRotating = false;
          _this.isMoving = true;
        }
      }

      if (event.touches.length == 2) {
        event.preventDefault();
        var aX = event.touches[0].pageX;
        var aY = event.touches[0].pageY;
        var bX = event.touches[1].pageX;
        var bY = event.touches[1].pageY;

        _this.touchCurrentDistance = Math.pow(aX - bX, 2) + Math.pow(aY - bY, 2);
        var delta = _this.touchCurrentDistance - _this.touchPreviousDistance;
        if (Math.abs(delta) !== 0) {
          _this.scrollLength = -delta;
          _this.touchPreviousDistance = _this.touchCurrentDistance;
        }
      }
      _this.animate();
    };

    _this._onDocumentTouchEnd = function (event) {

      document.removeEventListener('touchend', _this._onDocumentTouchEnd, false);
      _this.isRotating = false;
      _this.isMoving = false;
    };

    _this._onDocumentResize = function (event) {
      //this.forceUpdate()
    };

    _this._onDocumentWheel = function (event) {
      _this.scrollLength = event.deltaY;
      _this.animate();
    };

    _this.fitAll = function () {
      _this.computeBoundingSphere();
      if (_this.sphereRadius > 0) {
        /* let curPosition = new THREE.Vector3()
         let curX = this.globalGroup.matrix.elements[12]
         let curY = this.globalGroup.matrix.elements[13]
         let curZ = this.globalGroup.matrix.elements[14]
         curPosition.set(curX, curY, curZ)*/
        var goalPosition = _this.centerPoint.clone().multiplyScalar(-1);
        console.log('goalPosition:', goalPosition);

        var translationM = new THREE.Matrix4().setPosition(goalPosition);

        _this.globalGroup.applyMatrix(translationM);
        _this.zoom = _this.sphereRadius / _this.props.height * 2.5;

        _this.animate();
      }
    };

    _this.fitAllAndAxono = function () {
      var rotationM1 = new THREE.Matrix4(),
          rotationM2 = new THREE.Matrix4();

      rotationM1.makeRotationY(-Math.PI / 4);
      //rotationM1.multiply(translationM)
      rotationM2.makeRotationX(Math.PI / 4);
      rotationM2.multiply(rotationM1);
      _this.globalGroup.matrix = rotationM2;
      _this.globalGroup.matrix.decompose(_this.globalGroup.position, _this.globalGroup.quaternion, _this.globalGroup.scale);
      _this.computeBoundingSphere();
      if (_this.sphereRadius > 0) {
        var translationM = new THREE.Matrix4().setPosition(_this.centerPoint.clone().multiplyScalar(-1));
        _this.globalGroup.applyMatrix(translationM);
        _this.zoom = _this.sphereRadius / _this.props.height * 2.5;

        _this.animate();
      }
    };

    _this.axonometricView = function () {
      _this.computeBoundingSphere();
      _this.prevCenter = _this.centerPoint.clone();
      var rotationM1 = new THREE.Matrix4(),
          rotationM2 = new THREE.Matrix4();
      rotationM1.makeRotationY(-Math.PI / 4);
      rotationM2.makeRotationX(Math.PI / 4);
      rotationM2.multiply(rotationM1);
      _this.globalGroup.matrix = rotationM2;
      _this.globalGroup.matrix.decompose(_this.globalGroup.position, _this.globalGroup.quaternion, _this.globalGroup.scale);

      _this.computeBoundingSphere();
      var translationM = new THREE.Matrix4().setPosition(_this.prevCenter.sub(_this.centerPoint));
      _this.globalGroup.applyMatrix(translationM);
      _this.animate();
    };

    _this.leftView = function () {
      _this.computeBoundingSphere();
      _this.prevCenter = _this.centerPoint.clone();
      var M = new THREE.Matrix4();
      M.makeRotationY(Math.PI / 2);
      _this.globalGroup.matrix = M;
      _this.globalGroup.matrix.decompose(_this.globalGroup.position, _this.globalGroup.quaternion, _this.globalGroup.scale);
      _this.computeBoundingSphere();
      var translationM = new THREE.Matrix4().setPosition(_this.prevCenter.sub(_this.centerPoint));
      _this.globalGroup.applyMatrix(translationM);

      _this.animate();
    };

    _this.rightView = function () {
      _this.computeBoundingSphere();
      _this.prevCenter = _this.centerPoint.clone();
      var M = new THREE.Matrix4();
      M.makeRotationY(-Math.PI / 2);
      _this.globalGroup.matrix = M;
      _this.globalGroup.matrix.decompose(_this.globalGroup.position, _this.globalGroup.quaternion, _this.globalGroup.scale);
      _this.computeBoundingSphere();
      var translationM = new THREE.Matrix4().setPosition(_this.prevCenter.sub(_this.centerPoint));
      _this.globalGroup.applyMatrix(translationM);
      _this.animate();
    };

    _this.topView = function () {
      _this.computeBoundingSphere();
      _this.prevCenter = _this.centerPoint.clone();
      var M = new THREE.Matrix4();
      M.makeRotationX(Math.PI / 2);
      _this.globalGroup.matrix = M;
      _this.globalGroup.matrix.decompose(_this.globalGroup.position, _this.globalGroup.quaternion, _this.globalGroup.scale);
      _this.computeBoundingSphere();
      var translationM = new THREE.Matrix4().setPosition(_this.prevCenter.sub(_this.centerPoint));
      _this.globalGroup.applyMatrix(translationM);
      _this.animate();
    };

    _this.bottomView = function () {
      _this.computeBoundingSphere();
      _this.prevCenter = _this.centerPoint.clone();
      var M = new THREE.Matrix4();
      M.makeRotationX(-Math.PI / 2);
      _this.globalGroup.matrix = M;
      _this.globalGroup.matrix.decompose(_this.globalGroup.position, _this.globalGroup.quaternion, _this.globalGroup.scale);
      _this.computeBoundingSphere();
      var translationM = new THREE.Matrix4().setPosition(_this.prevCenter.sub(_this.centerPoint));
      _this.globalGroup.applyMatrix(translationM);
      _this.animate();
    };

    _this.frontView = function () {
      _this.computeBoundingSphere();
      _this.prevCenter = _this.centerPoint.clone();
      var M = new THREE.Matrix4();
      _this.globalGroup.matrix = M;
      _this.globalGroup.matrix.decompose(_this.globalGroup.position, _this.globalGroup.quaternion, _this.globalGroup.scale);
      _this.computeBoundingSphere();
      var translationM = new THREE.Matrix4().setPosition(_this.prevCenter.sub(_this.centerPoint));
      _this.globalGroup.applyMatrix(translationM);
      _this.animate();
    };

    _this.rearView = function () {
      _this.computeBoundingSphere();
      _this.prevCenter = _this.centerPoint.clone();
      var M = new THREE.Matrix4();
      M.makeRotationY(Math.PI);
      _this.globalGroup.matrix = M;
      _this.globalGroup.matrix.decompose(_this.globalGroup.position, _this.globalGroup.quaternion, _this.globalGroup.scale);
      _this.computeBoundingSphere();
      var translationM = new THREE.Matrix4().setPosition(_this.prevCenter.sub(_this.centerPoint));
      _this.globalGroup.applyMatrix(translationM);
      _this.animate();
    };

    _this.container = null;
    //this.initThree = initThree().bind(this)
    _this.previousXY = [0, 0];
    _this.currentXY = [0, 0];
    _this.isRotating = false;
    _this.scrollLength = 0;

    _this.touchPreviousDistance = 0;
    _this.touchCurrentDistance = 0;

    _this.centerPoint = new THREE.Vector3(0, 0, 0);

    _this.sphereRadius = 0;
    _this.viewType = null;

    _this.zoom = 1;
    return _this;
  }

  _createClass(ReactThreeComponent, [{
    key: 'updateObjects',
    value: function updateObjects(props) {
      var _this2 = this;

      props.dropObjects.forEach(function (obj) {
        _this2.globalGroup.remove(obj);
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
        if (obj.texture) obj.texture.dispose();
      });
      props.appendObjects.forEach(function (obj) {
        _this2.globalGroup.add(obj);
      });
      this.renderer.render(this.scene, this.camera);
    }
  }, {
    key: 'initThree',
    value: function initThree() {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xb39c9c);
      this.camera = new THREE.OrthographicCamera(-this.props.width * 0.5 * this.zoom, this.props.width * 0.5 * this.zoom, this.props.height * 0.5 * this.zoom, -this.props.height * 0.5 * this.zoom, 1, 2000);

      this.camera.position.set(0, 0, 1000);
      this.light = new THREE.PointLight(0x505050, 0.8);
      this.camera.add(this.light);
      this.scene.add(this.camera);
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(this.props.width, this.props.height);
      this.container.appendChild(this.renderer.domElement);

      this.globalGroup = new THREE.Group();
      this.scene.add(this.globalGroup);
      this.updateObjects(this.props);

      if (this.props.mode) {
        this.viewType = this.props.mode;
        this.applyViewType();
      }
    }
  }, {
    key: 'animate',
    value: function animate() {
      if (this.isRotating || this.isMoving) {
        if (Math.abs(this.previousXY[0] - this.currentXY[0]) >= 1 || Math.abs(this.previousXY[1] - this.currentXY[1]) >= 1) {

          var viewerWidth = this.props.width;
          var viewerHeight = this.props.height;
          var r = Math.sqrt(Math.pow(viewerWidth / 2, 2) + Math.pow(viewerHeight / 2, 2)) * 1.1;

          var xP = this.previousXY[0],
              yP = this.previousXY[1];
          var xC = this.currentXY[0],
              yC = this.currentXY[1];

          var zP = -Math.sqrt(r * r - xP * xP - yP * yP);
          var zC = -Math.sqrt(r * r - xP * xP - yP * yP);

          var a = new THREE.Vector3(-(yC * zP - zC * yP), zC * xP - xC * zP, xC * yP - yC * xP).normalize();
          var angle = Math.asin(Math.sqrt(Math.pow(xC - xP, 2) + Math.pow(yC - yP, 2) + Math.pow(zC - zP, 2)) / (2 * r));

          if (this.isRotating) {
            var cMatrix = matrixOfRotateAxisAndPoint(a, new THREE.Vector3(), angle * 4);
            this.globalGroup.applyMatrix(cMatrix);
          } else if (this.isMoving) {
            var translationM = new THREE.Matrix4();
            translationM.makeTranslation((xC - xP) * this.zoom, -(yC - yP) * this.zoom, 0);
            this.globalGroup.applyMatrix(translationM);
          }
          this.previousXY[0] = this.currentXY[0];
          this.previousXY[1] = this.currentXY[1];
        }
      }

      //note: this.zoom can not be 0. once be zero,can never recoverd
      if (this.scrollLength != 0) {
        var k = void 0;
        if (this.scrollLength > 0) k = 1.1;else k = 0.9;
        this.zoom = this.zoom * k;
        this.scrollLength = 0;
      }

      this.camera.left = this.props.width * -0.5 * this.zoom;
      this.camera.right = this.props.width * 0.5 * this.zoom;
      this.camera.top = this.props.height * 0.5 * this.zoom;
      this.camera.bottom = this.props.height * -0.5 * this.zoom;
      this.camera.updateProjectionMatrix();
      this.renderer.render(this.scene, this.camera);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initThree();
      var container = this.container;
      container.addEventListener('mousedown', this._onDocumentMouseDown, false);
      container.addEventListener('touchstart', this._onDocumentTouchStart, false);
      document.addEventListener('touchmove', this._onDocumentTouchMove, false);
      window.addEventListener('resize', this._onDocumentResize, false);
      document.addEventListener('contextmenu', this._onDocumentRightClick, false);
      container.addEventListener('wheel', this._onDocumentWheel, false);
      //this.setState({})
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {}
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return false;
    }
  }, {
    key: 'applyViewType',
    value: function applyViewType() {
      switch (this.viewType) {
        case 'FIT_ALL':
          this.fitAll();
          break;
        case 'FIT_ALL_AXONO_VIEW':
          this.fitAllAndAxono();
          break;
        case 'AXONOMETRIC_VIEW':
          this.axonometricView();
          break;
        case 'LEFT_VIEW':
          this.leftView();
          break;
        case 'RIGHT_VIEW':
          this.rightView();
          break;
        case 'FRONT_VIEW':
          this.frontView();
          break;
        case 'REAR_VIEW':
          this.rearView();
          break;
        case 'TOP_VIEW':
          this.topView();
          break;
        case 'BOTTOM_VIEW':
          this.bottomView();
          break;
        default:
          break;
      }
      this.viewType = null;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      console.log('received props');
      if (nextProps.appendObjects.length > 0 || nextProps.dropObjects.length > 0) this.updateObjects(nextProps);
      if (nextProps.mode && this.props.mode && nextProps.trig !== this.props.trig || nextProps.mode && !this.props.mode) {
        this.viewType = nextProps.mode;
        this.applyViewType();
      }

      //check for width and height
      if (nextProps.height != this.props.height || nextProps.width != this.props.width) {
        this.renderer.setSize(nextProps.width, nextProps.height);

        this.camera.left = -nextProps.width * 0.5 * this.zoom;
        this.camera.right = nextProps.width * 0.5 * this.zoom;
        this.camera.top = nextProps.height * 0.5 * this.zoom;
        this.camera.bottom = -nextProps.height * 0.5 * this.zoom;
        this.camera.updateProjectionMatrix();
      }
      this.renderer.render(this.scene, this.camera);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      //to check if width and height changed, or we have to resize the scene
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var container = this.container;
      container.removeEventListener('mousedown', this._onDocumentMouseDown, false);
      container.removeEventListener('touchstart', this._onDocumentTouchStart, false);
      document.removeEventListener('touchmove', this._onDocumentTouchMove, false);
      document.removeEventListener('touchend', this._onDocumentTouchEnd, false);

      document.removeEventListener('resize', this._onDocumentResize, false);

      document.removeEventListener('mousemove', this._onDocumentMouseMove, false);
      document.removeEventListener('mouseup', this._onDocumentMouseUp, false);
      document.removeEventListener('mouseout', this._onDocumentMouseOut, false);
      document.removeEventListener('contextmenu', this._onDocumentRightClick, false);
      container.removeEventListener('wheel', this._onDocumentWheel, false);
    }
  }, {
    key: 'computeBoundingSphere',
    value: function computeBoundingSphere() {
      /*
      let sphereList = [], sumX = 0, sumY = 0, sumZ = 0
      this.globalGroup.children.forEach( obj => {
        if(obj.geometry){
          obj.geometry.computeBoundingSphere()
          let geoCenter = obj.geometry.boundingSphere.center
          geoCenter.applyMatrix4(obj.matrix)
          sumX += geoCenter.x
          sumY += geoCenter.y
          sumZ += geoCenter.z
          console.log('center', obj.geometry.boundingSphere.center) 
          sphereList.push(obj.geometry.boundingSphere)
        }
      })
       let l = sphereList.length
      //set global center
      if(sphereList.length > 0)
      {
        this.centerPoint.set(sumX / l, sumY / l, sumZ / l)
        this.sphereRadius = 0
        sphereList.forEach( sphere => {
          let curR = sphere.center.distanceTo(this.centerPoint) + sphere.radius
          this.sphereRadius = this.sphereRadius > curR ? this.sphereRadius : curR
        })
      }
      else{
        this.centerPoint.set(0,0,0)
        this.sphereRadius = 0
      }
      //console.log('centerPoint', this.centerPoint, 'sphereRadius', this.sphereRadius)
      */
      var box = new THREE.Box3().setFromObject(this.globalGroup);
      var sphere = box.getBoundingSphere();
      this.centerPoint = sphere.center;
      this.sphereRadius = sphere.radius;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement('div', {
        ref: function ref(node) {
          _this3.container = node;
        },
        style: { height: '100%' }
      });
    }
  }]);

  return ReactThreeComponent;
}(_react2.default.Component);

ReactThreeComponent.propTypes = {
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  appendObjects: _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(THREE.Object3D)),
  dropObjects: _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(THREE.Object3D)),
  mode: _propTypes2.default.string,
  trig: _propTypes2.default.bool
};
ReactThreeComponent.defaultProps = {
  appendObjects: [],
  dropObjects: [],
  mode: 'FIT_ALL',
  trig: false
};
ReactThreeComponent.divStyle = {
  height: '100%'
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

  var isValidElement = function isValidElement(object) {
    return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(9)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(12)();
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var emptyFunction = __webpack_require__(1);
var invariant = __webpack_require__(2);
var warning = __webpack_require__(4);
var assign = __webpack_require__(10);

var ReactPropTypesSecret = __webpack_require__(3);
var checkPropTypes = __webpack_require__(11);

module.exports = function (isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (!manualPropTypeCallCache[cacheKey] &&
          // Avoid spamming the console because they are often not actionable except for lib authors
          manualPropTypeWarningCount < 3) {
            warning(false, 'You are manually calling a React.PropTypes validation ' + 'function for the `%s` prop on `%s`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.', propFullName, componentName);
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(false, 'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received %s at index %s.', getPostfixForTypeWarning(checker), i);
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue)) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(2);
  var warning = __webpack_require__(4);
  var ReactPropTypesSecret = __webpack_require__(3);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, _typeof(typeSpecs[typeSpecName]));
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error === 'undefined' ? 'undefined' : _typeof(error));
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(1);
var invariant = __webpack_require__(2);
var ReactPropTypesSecret = __webpack_require__(3);

module.exports = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/***/ })
/******/ ]);
});