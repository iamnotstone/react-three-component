(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("three"), require("prop-types"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "three", "prop-types"], factory);
	else if(typeof exports === 'object')
		exports["ReactThreeComponent"] = factory(require("react"), require("three"), require("prop-types"));
	else
		root["ReactThreeComponent"] = factory(root["React"], root["THREE"], root["PropTypes"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactThreeComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _three = __webpack_require__(2);

var THREE = _interopRequireWildcard(_three);

var _propTypes = __webpack_require__(3);

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
 *    trig: Bool,
 *    onFeatureSelected,
 *    onFeatureCtrlSelected,
 *    onFeatureClicked,
 *    onFeatureDeselected,
 *    onFeatureDeselectedAll,
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
var HIGHLIGHT_COLOR = 0xffff00;
var SELECTED_COLOR = 0x00ffff;

function recoverAppearance() {
  this.userData.interact = null;
  this.material.color.set(this.userData.oldColor);
  if (this.material.type == 'LineBasicMaterial') this.material.linewidth = 1;
}

function setSelected() {
  if (!this.userData.interact) this.userData.oldColor = this.material.color.getHex();
  this.userData.interact = 'selected';
  this.material.color.set(SELECTED_COLOR);
  if (this.material.type == 'LineBasicMaterial') this.material.linewidth = 3;
}

var ReactThreeComponent = exports.ReactThreeComponent = function (_React$Component) {
  _inherits(ReactThreeComponent, _React$Component);

  function ReactThreeComponent(props) {
    _classCallCheck(this, ReactThreeComponent);

    var _this = _possibleConstructorReturn(this, (ReactThreeComponent.__proto__ || Object.getPrototypeOf(ReactThreeComponent)).call(this, props));

    _this._onDoubleClick = function (event) {
      event.preventDefault();
      if (_this.currentIntersected) {
        var mouseXY = [event.clientX, event.clientY];
        _this.props.onFeatureClicked(_this.currentIntersected, mouseXY);
      }
    };

    _this._onClick = function (event) {
      event.preventDefault();
      if (_this.isOperating) {
        _this.isOperating = false;
        return;
      }
      if (_this.currentIntersected) {
        if (event.ctrlKey) {
          if (_this.currentIntersected.userData.interact == 'selected') _this.props.onFeatureDeselected(_this.currentIntersected);else _this.props.onFeatureCtrlSelected(_this.currentIntersected);
        } else _this.props.onFeatureSelected(_this.currentIntersected);
      } else _this.props.onFeatureDeselectedAll();
    };

    _this._onDocumentRightClick = function (event) {
      event.preventDefault();
    };

    _this._onDocumentMouseDown = function (event) {
      event.preventDefault();
      //console.log('button', event.button)
      var clientRect = _this.container.getBoundingClientRect();
      document.addEventListener('mousemove', _this._onTransDocumentMouseMove, false);
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

    _this._onTransDocumentMouseMove = function (event) {
      event.preventDefault();
      _this.isOperating = true;
      var clientRect = _this.container.getBoundingClientRect();
      var windowHalfX = (clientRect.left + clientRect.right) / 2;
      var windowHalfY = (clientRect.top + clientRect.bottom) / 2;

      _this.currentXY[0] = event.clientX - windowHalfX;
      _this.currentXY[1] = event.clientY - windowHalfY;
      _this.animate();
    };

    _this._onDocumentMouseMove = function (event) {
      event.preventDefault();
      var clientRect = _this.container.getBoundingClientRect();
      var windowHalfX = (clientRect.left + clientRect.right) / 2;
      var windowX = clientRect.right - clientRect.left;
      var windowHalfY = (clientRect.top + clientRect.bottom) / 2;
      var windowY = clientRect.bottom - clientRect.top;
      _this.mouse.x = 2 * (event.clientX - windowHalfX) / windowX;
      _this.mouse.y = -2 * (event.clientY - windowHalfY) / windowY;
      _this.animate();
    };

    _this._onDocumentMouseUp = function () {
      document.removeEventListener('mousemove', _this._onTransDocumentMouseMove, false);
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

    _this.mouse = new THREE.Vector2();
    _this.raycaster = new THREE.Raycaster();
    _this.raycaster.linePrecision = 1;
    _this.oldColor = undefined;
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
      this.light = new THREE.PointLight(0xf0f0f0, 1);
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

        this.camera.left = this.props.width * -0.5 * this.zoom;
        this.camera.right = this.props.width * 0.5 * this.zoom;
        this.camera.top = this.props.height * 0.5 * this.zoom;
        this.camera.bottom = this.props.height * -0.5 * this.zoom;
        this.camera.updateProjectionMatrix();
      }

      this.raycaster.setFromCamera(this.mouse, this.camera);
      var intersects = this.raycaster.intersectObjects(this.globalGroup.children, true);

      if (intersects.length > 0) {
        if (this.currentIntersected !== undefined) {
          if (this.currentIntersected.userData.interact == 'highlight') this.currentIntersected.recoverAppearance();
          /*this.currentIntersected.userData.interact = null
          this.currentIntersected.material.color
            .set(this.currentIntersected.userData.oldColor) 
          if(this.currentIntersected.material.type == 'LineBasicMaterial')
            this.currentIntersected.material.linewidth = 1*/
        }
        this.currentIntersected = intersects[0].object;
        if (!this.currentIntersected.userData.interact) {
          this.currentIntersected.userData.oldColor = this.currentIntersected.material.color.getHex();
          this.currentIntersected.userData.interact = 'highlight';
          this.currentIntersected.material.color.set(HIGHLIGHT_COLOR);
          if (this.currentIntersected.material.type == 'LineBasicMaterial') this.currentIntersected.material.linewidth = 3;

          this.currentIntersected.recoverAppearance = recoverAppearance;
          this.currentIntersected.setSelected = setSelected;
        }
        //console.log('highlight:', this.currentIntersected)
      } else {
        if (this.currentIntersected != undefined) {
          if (this.currentIntersected.userData.interact == 'highlight') {
            /*this.currentIntersected.userData.interact = null
            this.currentIntersected.material.color
              .set(this.currentIntersected.userData.oldColor) 
            if(this.currentIntersected.material.type == 'LineBasicMaterial')
              this.currentIntersected.material.linewidth = 1*/
            this.currentIntersected.recoverAppearance();
          }
        }
        this.currentIntersected = undefined;
      }

      this.renderer.render(this.scene, this.camera);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initThree();
      var container = this.container;
      container.addEventListener('mousedown', this._onDocumentMouseDown, false);
      container.addEventListener('touchstart', this._onDocumentTouchStart, false);
      container.addEventListener('mousemove', this._onDocumentMouseMove, false);
      container.addEventListener('dblclick', this._onDoubleClick, false);
      container.addEventListener('click', this._onClick, false);
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
      container.removeEventListener('mousemove', this._onDocumentMouseMove, false);
      container.removeEventListener('dblclick', this._onDoubleClick, false);
      container.removeEventListener('click', this._onClick, false);
      document.removeEventListener('touchmove', this._onDocumentTouchMove, false);
      document.removeEventListener('touchend', this._onDocumentTouchEnd, false);

      document.removeEventListener('resize', this._onDocumentResize, false);

      document.removeEventListener('mousemove', this._onTransDocumentMouseMove, false);
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
  trig: _propTypes2.default.bool,
  onFeatureSelected: _propTypes2.default.func,
  onFeatureCtrlSelected: _propTypes2.default.func,
  onFeatureClicked: _propTypes2.default.func,
  onFeatureDeselected: _propTypes2.default.func,
  onFeatureDeselectedAll: _propTypes2.default.func
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
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ })
/******/ ]);
});