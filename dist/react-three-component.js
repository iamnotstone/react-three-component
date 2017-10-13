(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("three"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "three"], factory);
	else if(typeof exports === 'object')
		exports["ReactThreeComponent"] = factory(require("react"), require("three"));
	else
		root["ReactThreeComponent"] = factory(root["React"], root["THREE"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ReactThreeComponent = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _three = __webpack_require__(2);

	var THREE = _interopRequireWildcard(_three);

	__webpack_require__(3);

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
	 *  }
	 *
	 */
	var ReactThreeComponent = exports.ReactThreeComponent = function (_React$Component) {
		_inherits(ReactThreeComponent, _React$Component);

		function ReactThreeComponent(props) {
			_classCallCheck(this, ReactThreeComponent);

			var _this = _possibleConstructorReturn(this, (ReactThreeComponent.__proto__ || Object.getPrototypeOf(ReactThreeComponent)).call(this, props));

			_this.container = null;
			//this.initThree = initThree().bind(this)
			return _this;
		}

		_createClass(ReactThreeComponent, [{
			key: 'updateObjects',
			value: function updateObjects() {
				var _this2 = this;

				this.props.dropObjects.forEach(function (obj) {
					_this2.scene.remove(obj);
				});
				this.props.appendObjects.forEach(function (obj) {
					_this2.scene.add(obj);
				});
				this.renderer.render(this.scene, this.camera);
			}
		}, {
			key: 'initThree',
			value: function initThree() {
				this.scene = new THREE.Scene();
				this.scene.background = new THREE.Color(0xb39c9c);
				this.camera = new THREE.PerspectiveCamera(75, this.props.width / this.props.height, 0.1, 1000);
				//this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / 
				//window.innerHeight,1,1000)
				this.scene.add(this.camera);
				this.camera.position.set(0, 0, 50);

				this.light = new THREE.PointLight(0x505050, 0.8);
				this.camera.add(this.light);
				this.renderer = new THREE.WebGLRenderer({ antialias: true });
				this.renderer.setPixelRatio(window.devicePixelRatio);
				this.renderer.setSize(this.props.width, this.props.height);
				//this.renderer.setSize(window.innerWidth, window.innerHeight)
				this.container.appendChild(this.renderer.domElement);
				this.controls = new THREE.TrackballControls(this.camera, this.renderer.domElement);
				this.controls.minDistance = 0;
				this.controls.maxDistance = 1000;

				console.log('controls', this.controls);
				//for test

				var animate = function () {
					requestAnimationFrame(animate);
					this.controls.update();
					this.renderer.render(this.scene, this.camera);
				}.bind(this);

				animate();

				this.updateObjects();
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.initThree();
				this.setState({});
			}
		}, {
			key: 'componentWillMount',
			value: function componentWillMount() {
				console.log('component will mount');
			}
		}, {
			key: 'componentWillUpdate',
			value: function componentWillUpdate(nextProps, nextState) {
				console.log('component will update');
			}
		}, {
			key: 'shouldComponentUpdate',
			value: function shouldComponentUpdate(nextProps, nextState) {
				console.log('should component update');
				return true;
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				console.log('component will receive props');
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate(prevProps, prevState) {
				console.log('component did update');
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				console.log('component will unmount');
			}
		}, {
			key: 'render',
			value: function render() {
				var _this3 = this;

				return _react2.default.createElement('div', { ref: function ref(node) {
						_this3.container = node;
					} });
			}
		}]);

		return ReactThreeComponent;
	}(_react2.default.Component);

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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _three = __webpack_require__(2);

	var THREE = _interopRequireWildcard(_three);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	THREE.TrackballControls = function (object, domElement) {

		var _this = this;
		var STATE = { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM_PAN: 4 };

		this.object = object;
		this.domElement = domElement !== undefined ? domElement : document;

		// API

		this.enabled = true;

		this.screen = { left: 0, top: 0, width: 0, height: 0 };

		this.rotateSpeed = 1.0;
		this.zoomSpeed = 1.2;
		this.panSpeed = 0.3;

		this.noRotate = false;
		this.noZoom = false;
		this.noPan = false;

		this.staticMoving = false;
		this.dynamicDampingFactor = 0.2;

		this.minDistance = 0;
		this.maxDistance = Infinity;

		this.keys = [65 /*A*/, 83 /*S*/, 68 /*D*/];

		// internals

		this.target = new THREE.Vector3();

		var EPS = 0.000001;

		var lastPosition = new THREE.Vector3();

		var _state = STATE.NONE,
		    _prevState = STATE.NONE,
		    _eye = new THREE.Vector3(),
		    _movePrev = new THREE.Vector2(),
		    _moveCurr = new THREE.Vector2(),
		    _lastAxis = new THREE.Vector3(),
		    _lastAngle = 0,
		    _zoomStart = new THREE.Vector2(),
		    _zoomEnd = new THREE.Vector2(),
		    _touchZoomDistanceStart = 0,
		    _touchZoomDistanceEnd = 0,
		    _panStart = new THREE.Vector2(),
		    _panEnd = new THREE.Vector2();

		// for reset

		this.target0 = this.target.clone();
		this.position0 = this.object.position.clone();
		this.up0 = this.object.up.clone();

		// events

		var changeEvent = { type: 'change' };
		var startEvent = { type: 'start' };
		var endEvent = { type: 'end' };

		// methods

		this.handleResize = function () {

			if (this.domElement === document) {

				this.screen.left = 0;
				this.screen.top = 0;
				this.screen.width = window.innerWidth;
				this.screen.height = window.innerHeight;
			} else {

				var box = this.domElement.getBoundingClientRect();
				// adjustments come from similar code in the jquery offset() function
				var d = this.domElement.ownerDocument.documentElement;
				this.screen.left = box.left + window.pageXOffset - d.clientLeft;
				this.screen.top = box.top + window.pageYOffset - d.clientTop;
				this.screen.width = box.width;
				this.screen.height = box.height;
			}
		};

		this.handleEvent = function (event) {

			if (typeof this[event.type] == 'function') {

				this[event.type](event);
			}
		};

		var getMouseOnScreen = function () {

			var vector = new THREE.Vector2();

			return function getMouseOnScreen(pageX, pageY) {

				vector.set((pageX - _this.screen.left) / _this.screen.width, (pageY - _this.screen.top) / _this.screen.height);

				return vector;
			};
		}();

		var getMouseOnCircle = function () {

			var vector = new THREE.Vector2();

			return function getMouseOnCircle(pageX, pageY) {

				vector.set((pageX - _this.screen.width * 0.5 - _this.screen.left) / (_this.screen.width * 0.5), (_this.screen.height + 2 * (_this.screen.top - pageY)) / _this.screen.width // screen.width intentional
				);

				return vector;
			};
		}();

		this.rotateCamera = function () {

			var axis = new THREE.Vector3(),
			    quaternion = new THREE.Quaternion(),
			    eyeDirection = new THREE.Vector3(),
			    objectUpDirection = new THREE.Vector3(),
			    objectSidewaysDirection = new THREE.Vector3(),
			    moveDirection = new THREE.Vector3(),
			    angle;

			return function rotateCamera() {

				moveDirection.set(_moveCurr.x - _movePrev.x, _moveCurr.y - _movePrev.y, 0);
				angle = moveDirection.length();

				if (angle) {

					_eye.copy(_this.object.position).sub(_this.target);

					eyeDirection.copy(_eye).normalize();
					objectUpDirection.copy(_this.object.up).normalize();
					objectSidewaysDirection.crossVectors(objectUpDirection, eyeDirection).normalize();

					objectUpDirection.setLength(_moveCurr.y - _movePrev.y);
					objectSidewaysDirection.setLength(_moveCurr.x - _movePrev.x);

					moveDirection.copy(objectUpDirection.add(objectSidewaysDirection));

					axis.crossVectors(moveDirection, _eye).normalize();

					angle *= _this.rotateSpeed;
					quaternion.setFromAxisAngle(axis, angle);

					_eye.applyQuaternion(quaternion);
					_this.object.up.applyQuaternion(quaternion);

					_lastAxis.copy(axis);
					_lastAngle = angle;
				} else if (!_this.staticMoving && _lastAngle) {

					_lastAngle *= Math.sqrt(1.0 - _this.dynamicDampingFactor);
					_eye.copy(_this.object.position).sub(_this.target);
					quaternion.setFromAxisAngle(_lastAxis, _lastAngle);
					_eye.applyQuaternion(quaternion);
					_this.object.up.applyQuaternion(quaternion);
				}

				_movePrev.copy(_moveCurr);
			};
		}();

		this.zoomCamera = function () {

			var factor;

			if (_state === STATE.TOUCH_ZOOM_PAN) {

				factor = _touchZoomDistanceStart / _touchZoomDistanceEnd;
				_touchZoomDistanceStart = _touchZoomDistanceEnd;
				_eye.multiplyScalar(factor);
			} else {

				factor = 1.0 + (_zoomEnd.y - _zoomStart.y) * _this.zoomSpeed;

				if (factor !== 1.0 && factor > 0.0) {

					_eye.multiplyScalar(factor);
				}

				if (_this.staticMoving) {

					_zoomStart.copy(_zoomEnd);
				} else {

					_zoomStart.y += (_zoomEnd.y - _zoomStart.y) * this.dynamicDampingFactor;
				}
			}
		};

		this.panCamera = function () {

			var mouseChange = new THREE.Vector2(),
			    objectUp = new THREE.Vector3(),
			    pan = new THREE.Vector3();

			return function panCamera() {

				mouseChange.copy(_panEnd).sub(_panStart);

				if (mouseChange.lengthSq()) {

					mouseChange.multiplyScalar(_eye.length() * _this.panSpeed);

					pan.copy(_eye).cross(_this.object.up).setLength(mouseChange.x);
					pan.add(objectUp.copy(_this.object.up).setLength(mouseChange.y));

					_this.object.position.add(pan);
					_this.target.add(pan);

					if (_this.staticMoving) {

						_panStart.copy(_panEnd);
					} else {

						_panStart.add(mouseChange.subVectors(_panEnd, _panStart).multiplyScalar(_this.dynamicDampingFactor));
					}
				}
			};
		}();

		this.checkDistances = function () {

			if (!_this.noZoom || !_this.noPan) {

				if (_eye.lengthSq() > _this.maxDistance * _this.maxDistance) {

					_this.object.position.addVectors(_this.target, _eye.setLength(_this.maxDistance));
					_zoomStart.copy(_zoomEnd);
				}

				if (_eye.lengthSq() < _this.minDistance * _this.minDistance) {

					_this.object.position.addVectors(_this.target, _eye.setLength(_this.minDistance));
					_zoomStart.copy(_zoomEnd);
				}
			}
		};

		this.update = function () {

			_eye.subVectors(_this.object.position, _this.target);

			if (!_this.noRotate) {

				_this.rotateCamera();
			}

			if (!_this.noZoom) {

				_this.zoomCamera();
			}

			if (!_this.noPan) {

				_this.panCamera();
			}

			_this.object.position.addVectors(_this.target, _eye);

			_this.checkDistances();

			_this.object.lookAt(_this.target);

			if (lastPosition.distanceToSquared(_this.object.position) > EPS) {

				_this.dispatchEvent(changeEvent);

				lastPosition.copy(_this.object.position);
			}
		};

		this.reset = function () {

			_state = STATE.NONE;
			_prevState = STATE.NONE;

			_this.target.copy(_this.target0);
			_this.object.position.copy(_this.position0);
			_this.object.up.copy(_this.up0);

			_eye.subVectors(_this.object.position, _this.target);

			_this.object.lookAt(_this.target);

			_this.dispatchEvent(changeEvent);

			lastPosition.copy(_this.object.position);
		};

		// listeners

		function keydown(event) {

			if (_this.enabled === false) return;

			window.removeEventListener('keydown', keydown);

			_prevState = _state;

			if (_state !== STATE.NONE) {

				return;
			} else if (event.keyCode === _this.keys[STATE.ROTATE] && !_this.noRotate) {

				_state = STATE.ROTATE;
			} else if (event.keyCode === _this.keys[STATE.ZOOM] && !_this.noZoom) {

				_state = STATE.ZOOM;
			} else if (event.keyCode === _this.keys[STATE.PAN] && !_this.noPan) {

				_state = STATE.PAN;
			}
		}

		function keyup(event) {

			if (_this.enabled === false) return;

			_state = _prevState;

			window.addEventListener('keydown', keydown, false);
		}

		function mousedown(event) {

			if (_this.enabled === false) return;

			event.preventDefault();
			event.stopPropagation();

			if (_state === STATE.NONE) {

				_state = event.button;
			}

			if (_state === STATE.ROTATE && !_this.noRotate) {

				_moveCurr.copy(getMouseOnCircle(event.pageX, event.pageY));
				_movePrev.copy(_moveCurr);
			} else if (_state === STATE.ZOOM && !_this.noZoom) {

				_zoomStart.copy(getMouseOnScreen(event.pageX, event.pageY));
				_zoomEnd.copy(_zoomStart);
			} else if (_state === STATE.PAN && !_this.noPan) {

				_panStart.copy(getMouseOnScreen(event.pageX, event.pageY));
				_panEnd.copy(_panStart);
			}

			document.addEventListener('mousemove', mousemove, false);
			document.addEventListener('mouseup', mouseup, false);

			_this.dispatchEvent(startEvent);
		}

		function mousemove(event) {

			if (_this.enabled === false) return;

			event.preventDefault();
			event.stopPropagation();

			if (_state === STATE.ROTATE && !_this.noRotate) {

				_movePrev.copy(_moveCurr);
				_moveCurr.copy(getMouseOnCircle(event.pageX, event.pageY));
			} else if (_state === STATE.ZOOM && !_this.noZoom) {

				_zoomEnd.copy(getMouseOnScreen(event.pageX, event.pageY));
			} else if (_state === STATE.PAN && !_this.noPan) {

				_panEnd.copy(getMouseOnScreen(event.pageX, event.pageY));
			}
		}

		function mouseup(event) {

			if (_this.enabled === false) return;

			event.preventDefault();
			event.stopPropagation();

			_state = STATE.NONE;

			document.removeEventListener('mousemove', mousemove);
			document.removeEventListener('mouseup', mouseup);
			_this.dispatchEvent(endEvent);
		}

		function mousewheel(event) {

			if (_this.enabled === false) return;

			event.preventDefault();
			event.stopPropagation();

			switch (event.deltaMode) {

				case 2:
					// Zoom in pages
					_zoomStart.y -= event.deltaY * 0.025;
					break;

				case 1:
					// Zoom in lines
					_zoomStart.y -= event.deltaY * 0.01;
					break;

				default:
					// undefined, 0, assume pixels
					_zoomStart.y -= event.deltaY * 0.00025;
					break;

			}

			_this.dispatchEvent(startEvent);
			_this.dispatchEvent(endEvent);
		}

		function touchstart(event) {

			if (_this.enabled === false) return;

			switch (event.touches.length) {

				case 1:
					_state = STATE.TOUCH_ROTATE;
					_moveCurr.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
					_movePrev.copy(_moveCurr);
					break;

				default:
					// 2 or more
					_state = STATE.TOUCH_ZOOM_PAN;
					var dx = event.touches[0].pageX - event.touches[1].pageX;
					var dy = event.touches[0].pageY - event.touches[1].pageY;
					_touchZoomDistanceEnd = _touchZoomDistanceStart = Math.sqrt(dx * dx + dy * dy);

					var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
					var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
					_panStart.copy(getMouseOnScreen(x, y));
					_panEnd.copy(_panStart);
					break;

			}

			_this.dispatchEvent(startEvent);
		}

		function touchmove(event) {

			if (_this.enabled === false) return;

			event.preventDefault();
			event.stopPropagation();

			switch (event.touches.length) {

				case 1:
					_movePrev.copy(_moveCurr);
					_moveCurr.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
					break;

				default:
					// 2 or more
					var dx = event.touches[0].pageX - event.touches[1].pageX;
					var dy = event.touches[0].pageY - event.touches[1].pageY;
					_touchZoomDistanceEnd = Math.sqrt(dx * dx + dy * dy);

					var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
					var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
					_panEnd.copy(getMouseOnScreen(x, y));
					break;

			}
		}

		function touchend(event) {

			if (_this.enabled === false) return;

			switch (event.touches.length) {

				case 0:
					_state = STATE.NONE;
					break;

				case 1:
					_state = STATE.TOUCH_ROTATE;
					_moveCurr.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
					_movePrev.copy(_moveCurr);
					break;

			}

			_this.dispatchEvent(endEvent);
		}

		function contextmenu(event) {

			if (_this.enabled === false) return;

			event.preventDefault();
		}

		this.dispose = function () {

			this.domElement.removeEventListener('contextmenu', contextmenu, false);
			this.domElement.removeEventListener('mousedown', mousedown, false);
			this.domElement.removeEventListener('wheel', mousewheel, false);

			this.domElement.removeEventListener('touchstart', touchstart, false);
			this.domElement.removeEventListener('touchend', touchend, false);
			this.domElement.removeEventListener('touchmove', touchmove, false);

			document.removeEventListener('mousemove', mousemove, false);
			document.removeEventListener('mouseup', mouseup, false);

			window.removeEventListener('keydown', keydown, false);
			window.removeEventListener('keyup', keyup, false);
		};

		this.domElement.addEventListener('contextmenu', contextmenu, false);
		this.domElement.addEventListener('mousedown', mousedown, false);
		this.domElement.addEventListener('wheel', mousewheel, false);

		this.domElement.addEventListener('touchstart', touchstart, false);
		this.domElement.addEventListener('touchend', touchend, false);
		this.domElement.addEventListener('touchmove', touchmove, false);

		window.addEventListener('keydown', keydown, false);
		window.addEventListener('keyup', keyup, false);

		this.handleResize();

		// force an update at start
		this.update();
	}; /**
	    * @author Eberhard Graether / http://egraether.com/
	    * @author Mark Lundin 	/ http://mark-lundin.com
	    * @author Simone Manini / http://daron1337.github.io
	    * @author Luca Antiga 	/ http://lantiga.github.io
	    */


	THREE.TrackballControls.prototype = Object.create(THREE.EventDispatcher.prototype);
	THREE.TrackballControls.prototype.constructor = THREE.TrackballControls;

	console.log('haha');

/***/ })
/******/ ])
});
;