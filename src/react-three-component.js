import React from 'react'
import * as THREE from 'three'
/*
 *  props{
 *    height,
 *    width,
 *    appendObjects, [THREE.Object3D]
 *    dropObjects, [THREE.Object3D]
 *    viewState, {mode:"One of FIT_ALL_AXONO_VIEW ..." , trig: Bool}
 *  }
 *
 */

function matrixOfRotateAxisAndPoint (axis, point, angle){
	let x01 = - point.x, y01 = -point.y, z01 = -point.z
	let vec01 = new THREE.Vector3(x01, y01, z01)
	let rotateM = new THREE.Matrix4()
	rotateM.makeRotationAxis(axis, angle)
	let vec01Next = vec01.clone().applyMatrix4(rotateM)
	let objectVec = vec01Next.clone().sub(vec01)
	let translateM = new THREE.Matrix4()
	translateM.makeTranslation(objectVec.x, objectVec.y, objectVec.z)
	return translateM.multiply(rotateM)
}


function makeNormalizeMatrixOnAxis(m){
  let vector = new THREE.Vector3()
  let te = m.elements
  let sx = vector.set(te[0], te[1], te[2]).length()
  let sy = vector.set(te[4], te[5], te[6]).length()
  let sz = vector.set(te[8], te[9], te[10]).length()
  let invSx = 1 / sx
  let invSy = 1 / sy
  let invSz = 1 / sz
  te[0] *= invSx
  te[1] *= invSx
  te[2] *= invSx

  te[4] *= invSy
  te[5] *= invSy
  te[6] *= invSy

  te[8] *= invSz
  te[9] *= invSz
  te[10] *= invSz
}

export class ReactThreeComponent extends React.Component{
  constructor(props){
    super(props)
	  this.container = null
	  //this.initThree = initThree().bind(this)
		this.previousXY = [0,0]
		this.currentXY = [0,0]
		this.isRotating = false
		this.scrollLength = 0

		this.touchPreviousDistance = 0
		this.touchCurrentDistance = 0

		this.centerPoint = new THREE.Vector3(0,0,0)

		this.sphereRadius = 0
		this.viewType = null

    this.zoom = 1
	}

	updateObjects(){
	  this.props.dropObjects.forEach(obj => {
		  this.globalGroup.remove(obj)
		})
		this.props.appendObjects.forEach(obj => {
		  this.globalGroup.add(obj)
		})
		this.renderer.render(this.scene, this.camera)
	}

  initThree(){
    this.scene = new THREE.Scene()
		this.scene.background = new THREE.Color(0xb39c9c)
	  this.camera = new THREE.OrthographicCamera(
      - this.props.width * 0.5 * this.zoom,
      this.props.width * 0.5 * this.zoom,
      this.props.height * 0.5 * this.zoom,
      - this.props.height * 0.5 * this.zoom,
      1,
      2000
    )	
		
		this.camera.position.set(0, 0, 1000)
		this.light = new THREE.PointLight(0x505050,0.8)
		this.camera.add(this.light)
		this.scene.add(this.camera)
	  this.renderer = new THREE.WebGLRenderer({antialias: true})
		this.renderer.setPixelRatio(window.devicePixelRatio)
		this.renderer.setSize(this.props.width, this.props.height)
		this.container.appendChild(this.renderer.domElement)

    this.globalGroup = new THREE.Group()
    this.scene.add(this.globalGroup)
		this.updateObjects()
	}

  animate(){
    if(this.isRotating || this.isMoving){
      console.log('animate')
      if (Math.abs(this.previousXY[0] - this.currentXY[0]) >= 1 || 
				Math.abs(this.previousXY[1] - this.currentXY[1]) >= 1) {

				let viewerWidth = this.props.width
				let viewerHeight = this.props.height
				let r = Math.sqrt(Math.pow(viewerWidth/2, 2) + Math.pow(viewerHeight/2, 2)) * 1.1

				let xP = this.previousXY[0], yP = this.previousXY[1]
				let xC = this.currentXY[0], yC = this.currentXY[1]

				let zP = - Math.sqrt(r*r - xP*xP - yP*yP)
				let zC = - Math.sqrt(r*r - xP*xP - yP*yP)

				let a = new THREE.Vector3(-(yC*zP - zC*yP), zC*xP - xC*zP, xC*yP - yC*xP).normalize()
				let angle = Math.asin(Math.sqrt(Math.pow(xC - xP, 2) + Math.pow(yC - yP, 2) + Math.pow(zC - zP, 2) ) /(2 * r))

				if(this.isRotating)
				{
          let cMatrix = matrixOfRotateAxisAndPoint(a, new THREE.Vector3(), angle*4)
					this.globalGroup.applyMatrix(cMatrix)
				}else if(this.isMoving){
					let translationM = new THREE.Matrix4()
					translationM.makeTranslation((xC - xP)*this.zoom,- (yC - yP)*this.zoom, 0)
					this.globalGroup.applyMatrix(translationM)
				}
				this.previousXY[0] = this.currentXY[0]
				this.previousXY[1] = this.currentXY[1]
    	}
		}

		if(this.scrollLength != 0){
			let k
			if(this.scrollLength > 0)
				k = 1.1
			else
				k = 0.9
			this.zoom = this.zoom*k
			this.scrollLength = 0
		}

    this.camera.left = this.props.width * -0.5 * this.zoom
    this.camera.right = this.props.width * 0.5 * this.zoom
    this.camera.top = this.props.height * 0.5 * this.zoom
    this.camera.bottom = this.props.height * -0.5 * this.zoom
    this.camera.updateProjectionMatrix() 
    this.renderer.render(this.scene, this.camera)
  }


  componentDidMount(){
	  this.initThree()
    const container = this.container;     
    container.addEventListener('mousedown', this._onDocumentMouseDown, false);
    container.addEventListener('touchstart', this._onDocumentTouchStart, false);
    document.addEventListener('touchmove', this._onDocumentTouchMove, false);  
		window.addEventListener('resize', this._onDocumentResize, false)
		document.addEventListener('contextmenu', this._onDocumentRightClick, false);
		container.addEventListener('wheel', this._onDocumentWheel, false)
		this.setState({})
	}

  componentWillMount(){
	}

  componentWillUpdate(nextProps, nextState){
	}

	shouldComponentUpdate(nextProps, nextState){
		return true
	}
  componentWillReceiveProps(nextProps){
	}

  componentDidUpdate(prevProps, prevState){
	}
	componentWillUnmount(){
    const container = this.container;
	  container.removeEventListener('mousedown', this._onDocumentMouseDown, false);
    container.removeEventListener('touchstart', this._onDocumentTouchStart, false);
	  document.removeEventListener('touchmove', this._onDocumentTouchMove, false);
		document.removeEventListener('touchend', this._onDocumentTouchEnd, false)

		document.removeEventListener('resize', this._onDocumentResize, false)

    document.removeEventListener('mousemove', this._onDocumentMouseMove, false);
    document.removeEventListener('mouseup', this._onDocumentMouseUp, false);
    document.removeEventListener('mouseout', this._onDocumentMouseOut, false);
		document.removeEventListener('contextmenu', this._onDocumentRightClick, false);
		container.removeEventListener('wheel', this._onDocumentWheel, false)
  }

	_onDocumentRightClick = (event) =>{
		event.preventDefault()
	} 


	_onDocumentMouseDown = (event) => { 
    	event.preventDefault()
		//console.log('button', event.button)
		let clientRect = this.container.getBoundingClientRect()
    document.addEventListener('mousemove', this._onDocumentMouseMove, false)
    document.addEventListener('mouseup', this._onDocumentMouseUp, false)
    document.addEventListener('mouseout', this._onDocumentMouseOut, false)
    const windowHalfX = (clientRect.left + clientRect.right) / 2

		const windowHalfY = (clientRect.top + clientRect.bottom) / 2
    this.previousXY[0] = event.clientX - windowHalfX
		this.previousXY[1] = event.clientY - windowHalfY

		this.currentXY[0] = this.previousXY[0]
		this.currentXY[1] = this.previousXY[1]
		if(event.button == 1 || event.button == 0)
			this.isRotating = true
		else if(event.button == 2)
			this.isMoving = true


	}
	_onDocumentMouseMove = (event) => {
		let clientRect = this.container.getBoundingClientRect()
    const windowHalfX = (clientRect.left + clientRect.right) / 2
		const windowHalfY = (clientRect.top + clientRect.bottom) / 2

		this.currentXY[0] = event.clientX - windowHalfX
		this.currentXY[1] = event.clientY - windowHalfY
    this.animate()
	}



	_onDocumentMouseUp = () => {
    document.removeEventListener('mousemove', this._onDocumentMouseMove, false);
    document.removeEventListener('mouseup', this._onDocumentMouseUp, false);
    document.removeEventListener('mouseout', this._onDocumentMouseOut, false);
		this.isRotating = false
		this.isMoving = false
	};


	_onDocumentMouseOut = () => {
    document.removeEventListener('mousemove', this._onDocumentMouseMove, false);
    document.removeEventListener('mouseup', this._onDocumentMouseUp, false);
    document.removeEventListener('mouseout', this._onDocumentMouseOut, false);
		this.isRotating = false
    this.isMoving = false
	};

	_onDocumentTouchStart = (event) => {
		document.addEventListener('touchend', this._onDocumentTouchEnd, false)
    if (event.touches.length === 1) {
     	event.preventDefault();
		  let clientRect = this.container.getBoundingClientRect()
    	const windowHalfX = (clientRect.left + clientRect.right) / 2

		  const windowHalfY = (clientRect.top + clientRect.bottom) / 2

     	this.previousXY[0] = event.touches[0].pageX - windowHalfX;
     	this.previousXY[1] = event.touches[0].pageY - windowHalfY;

		  this.currentXY[0] = this.previousXY[0]
		  this.currentXY[1] = this.previousXY[1]

		  this.isRotating = true
    }
		else if(event.touches.length === 3){
		  let clientRect = this.container.getBoundingClientRect()
    	const windowHalfX = (clientRect.left + clientRect.right) / 2

		  const windowHalfY = (clientRect.top + clientRect.bottom) / 2
		  let centerX = 0,centerY = 0
		  Object.keys(event.touches).forEach((k)=>{
			  centerX += event.touches[k].pageX
			  centerY += event.touches[k].pageY
		  })
		  centerX /= 3
		  centerY /= 3
     	this.previousXY[0] = centerX - windowHalfX;
     	this.previousXY[1] = centerY - windowHalfY;

		  this.currentXY[0] = this.previousXY[0]
		  this.currentXY[1] = this.previousXY[1]

		  this.isMoving = true
		}

	  else if (event.touches.length === 2){
		  //get this.touchPreviousDistance
		  event.preventDefault()
		  let aX = event.touches[0].pageX
		  let aY = event.touches[0].pageY
		  let bX = event.touches[1].pageX
		  let bY = event.touches[1].pageY
		  this.touchPreviousDistance = Math.pow(aX - bX, 2) + Math.pow(aY - bY, 2)
		  this.touchCurrentDistance = this.touchPreviousDistance
	  }
	};


	_onDocumentTouchMove = (event) => {
    if (event.touches.length === 1) {
      event.preventDefault();

			let clientRect = this.container.getBoundingClientRect()
    	const windowHalfX = (clientRect.left + clientRect.right) / 2

			const windowHalfY = (clientRect.top + clientRect.bottom) / 2

      this.currentXY[0] = event.touches[0].pageX - windowHalfX;
      this.currentXY[1] = event.touches[0].pageY - windowHalfY;
    }
		else if (event.touches.length === 3) {
    	event.preventDefault();

		  let clientRect = this.container.getBoundingClientRect()
    	const windowHalfX = (clientRect.left + clientRect.right) / 2

			const windowHalfY = (clientRect.top + clientRect.bottom) / 2

			let centerX = 0,centerY = 0
			Object.keys(event.touches).forEach((k)=>{
				centerX += event.touches[k].pageX
				centerY += event.touches[k].pageY
			})
			centerX /= 3
			centerY /= 3
      this.currentXY[0] = centerX - windowHalfX;
      this.currentXY[1] = centerY - windowHalfY;
			if(this.isRotating)
			{
			  this.isRotating = false
			  this.isMoving = true
			}
    }

		if(event.touches.length == 2){	
		  event.preventDefault()
		  let aX = event.touches[0].pageX
		  let aY = event.touches[0].pageY
		  let bX = event.touches[1].pageX
		  let bY = event.touches[1].pageY

		  this.touchCurrentDistance = Math.pow(aX - bX, 2) + Math.pow(aY - bY, 2)
		  let delta = this.touchCurrentDistance - this.touchPreviousDistance
		  if(Math.abs(delta) !== 0)
		  {
			  this.scrollLength = - delta
		 	  this.touchPreviousDistance = this.touchCurrentDistance
		  }
		}
    this.animate()
	};

	_onDocumentTouchEnd = (event) => {
		
		document.removeEventListener('touchend', this._onDocumentTouchEnd, false)
		this.isRotating = false
		this.isMoving = false
	}


	_onDocumentResize = (event) => {
		//this.forceUpdate()
	}

	_onDocumentWheel = (event) => {
		this.scrollLength = event.deltaY
    this.animate()
	}

  static divStyle = {
    height: '100%'
  }

  render(){
		return (<div 
      ref = {
        node => {
			    this.container = node
        }
      }
      style = {{height: '100%'}}
      >
    </div>)
  }
}
