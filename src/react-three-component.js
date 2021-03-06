import React from 'react'
import * as THREE from 'three'
import PropTypes from 'prop-types'
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
const HIGHLIGHT_COLOR = 0xffff00
const SELECTED_COLOR = 0x00ffff

function recoverAppearance(){
  this.userData.interact = null
  this.material.color.set(this.userData.oldColor) 
  if(this.material.type == 'LineBasicMaterial')
    this.material.linewidth = 1
}

function setSelected(){
  if(!this.userData.interact)
    this.userData.oldColor = this.material.color.getHex()
  this.userData.interact = 'selected'
  this.material.color.set(SELECTED_COLOR)
  if(this.material.type == 'LineBasicMaterial')
    this.material.linewidth = 3
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

    this.mouse = new THREE.Vector2()
    this.raycaster = new THREE.Raycaster()
    this.raycaster.linePrecision = 1
    this.oldColor = undefined
	}

  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    appendObjects: PropTypes.arrayOf(PropTypes.instanceOf(THREE.Object3D)),
    dropObjects: PropTypes.arrayOf(PropTypes.instanceOf(THREE.Object3D)),
    mode: PropTypes.string,
    trig: PropTypes.bool,
    onFeatureSelected: PropTypes.func,
    onFeatureCtrlSelected: PropTypes.func,
    onFeatureClicked: PropTypes.func,
    onFeatureDeselected: PropTypes.func,
    onFeatureDeselectedAll: PropTypes.func
  }

  static defaultProps = {
    appendObjects: [],
    dropObjects: [],
    mode: 'FIT_ALL',
    trig: false
  }

	updateObjects(props){
	  props.dropObjects.forEach(obj => {
		  this.globalGroup.remove(obj)
      if(obj.geometry) obj.geometry.dispose()
      if(obj.material) obj.material.dispose()
      if(obj.texture) obj.texture.dispose()
		})
		props.appendObjects.forEach(obj => {
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
		this.light = new THREE.PointLight(0xf0f0f0,1)
		this.camera.add(this.light)
		this.scene.add(this.camera)
	  this.renderer = new THREE.WebGLRenderer({antialias: true})
		this.renderer.setPixelRatio(window.devicePixelRatio)
		this.renderer.setSize(this.props.width, this.props.height)
		this.container.appendChild(this.renderer.domElement)

    this.globalGroup = new THREE.Group()
    this.scene.add(this.globalGroup)
		this.updateObjects(this.props)
    
    if(this.props.mode){
      this.viewType = this.props.mode
      this.applyViewType()
    }
	}

  animate(){
    if(this.isRotating || this.isMoving){
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

    //note: this.zoom can not be 0. once be zero,can never recoverd
		if(this.scrollLength != 0){
			let k
			if(this.scrollLength > 0)
				k = 1.1
			else
				k = 0.9
			this.zoom = this.zoom*k
			this.scrollLength = 0

      this.camera.left = this.props.width * -0.5 * this.zoom
      this.camera.right = this.props.width * 0.5 * this.zoom
      this.camera.top = this.props.height * 0.5 * this.zoom
      this.camera.bottom = this.props.height * -0.5 * this.zoom
      this.camera.updateProjectionMatrix() 
		}

    this.raycaster.setFromCamera(this.mouse, this.camera)
    let intersects = this.raycaster.intersectObjects(this.globalGroup.children, true)

    if ( intersects.length > 0 ) {
      if(this.currentIntersected !== undefined){
        if(this.currentIntersected.userData.interact == 'highlight')
          this.currentIntersected.recoverAppearance()
          /*this.currentIntersected.userData.interact = null
          this.currentIntersected.material.color
            .set(this.currentIntersected.userData.oldColor) 
          if(this.currentIntersected.material.type == 'LineBasicMaterial')
            this.currentIntersected.material.linewidth = 1*/
        
      }
      this.currentIntersected = intersects[ 0 ].object;
      if(!this.currentIntersected.userData.interact)
      {
        this.currentIntersected.userData.oldColor = 
          this.currentIntersected.material.color.getHex()
        this.currentIntersected.userData.interact = 'highlight'
        this.currentIntersected.material.color.set(HIGHLIGHT_COLOR)
        if(this.currentIntersected.material.type == 'LineBasicMaterial')
          this.currentIntersected.material.linewidth = 3

        this.currentIntersected.recoverAppearance = recoverAppearance
        this.currentIntersected.setSelected = setSelected
      }
      //console.log('highlight:', this.currentIntersected)
    } else {
      if(this.currentIntersected != undefined){
        if(this.currentIntersected.userData.interact == 'highlight'){
          /*this.currentIntersected.userData.interact = null
          this.currentIntersected.material.color
            .set(this.currentIntersected.userData.oldColor) 
          if(this.currentIntersected.material.type == 'LineBasicMaterial')
            this.currentIntersected.material.linewidth = 1*/
          this.currentIntersected.recoverAppearance()
        }
      }
      this.currentIntersected = undefined;
    }



    
    this.renderer.render(this.scene, this.camera)
  }


  componentDidMount(){
	  this.initThree()
    const container = this.container;     
    container.addEventListener('mousedown', this._onDocumentMouseDown, false);
    container.addEventListener('touchstart', this._onDocumentTouchStart, false);
    container.addEventListener('mousemove', this._onDocumentMouseMove, false);
    container.addEventListener('dblclick', this._onDoubleClick, false);
    container.addEventListener('click', this._onClick, false);
    document.addEventListener('touchmove', this._onDocumentTouchMove, false);  
		window.addEventListener('resize', this._onDocumentResize, false)
		document.addEventListener('contextmenu', this._onDocumentRightClick, false);
		container.addEventListener('wheel', this._onDocumentWheel, false)
		//this.setState({})
	}

  componentWillMount(){
	}

  componentWillUpdate(nextProps, nextState){
	}

	shouldComponentUpdate(nextProps, nextState){
		return false
	}

	applyViewType(){
		switch(this.viewType){
			case 'FIT_ALL':
				this.fitAll()
				break;
			case 'FIT_ALL_AXONO_VIEW':
				this.fitAllAndAxono()
				break;
			case 'AXONOMETRIC_VIEW':
				this.axonometricView()
				break;
			case 'LEFT_VIEW':
				this.leftView()
				break;
			case 'RIGHT_VIEW':
				this.rightView()
				break;
			case 'FRONT_VIEW':
				this.frontView()
				break;
			case 'REAR_VIEW':
				this.rearView()
				break;
			case 'TOP_VIEW':
				this.topView()
				break;
			case 'BOTTOM_VIEW':
				this.bottomView()
				break;
			default:
				break
		}
		this.viewType = null
	}


  componentWillReceiveProps(nextProps){
    if(nextProps.appendObjects.length > 0 || nextProps.dropObjects.length > 0)
      this.updateObjects(nextProps)
    if( (nextProps.mode && this.props.mode &&
      nextProps.trig !== this.props.trig) ||
      (nextProps.mode && !this.props.mode)
    ){
      this.viewType = nextProps.mode
      this.applyViewType()
    }

    //check for width and height
    if(nextProps.height != this.props.height || nextProps.width != this.props.width)
    {
		  this.renderer.setSize(nextProps.width, nextProps.height)
      
      this.camera.left = -nextProps.width * 0.5 * this.zoom
      this.camera.right =  nextProps.width * 0.5 * this.zoom
      this.camera.top = nextProps.height * 0.5 * this.zoom
      this.camera.bottom = - nextProps.height * 0.5 * this.zoom
      this.camera.updateProjectionMatrix()
      
    }
    this.renderer.render(this.scene, this.camera)
	}

  componentDidUpdate(prevProps, prevState){
    //to check if width and height changed, or we have to resize the scene
	}
	componentWillUnmount(){
    const container = this.container;
	  container.removeEventListener('mousedown', this._onDocumentMouseDown, false);
    container.removeEventListener('touchstart', this._onDocumentTouchStart, false);
    container.removeEventListener('mousemove', this._onDocumentMouseMove, false);
    container.removeEventListener('dblclick', this._onDoubleClick, false);
    container.removeEventListener('click', this._onClick, false);
	  document.removeEventListener('touchmove', this._onDocumentTouchMove, false);
		document.removeEventListener('touchend', this._onDocumentTouchEnd, false)

		document.removeEventListener('resize', this._onDocumentResize, false)

    document.removeEventListener('mousemove', this._onTransDocumentMouseMove, false);
    document.removeEventListener('mouseup', this._onDocumentMouseUp, false);
    document.removeEventListener('mouseout', this._onDocumentMouseOut, false);
		document.removeEventListener('contextmenu', this._onDocumentRightClick, false);
		container.removeEventListener('wheel', this._onDocumentWheel, false)
  }


  _onDoubleClick = (event) => {
    event.preventDefault()
    if(this.currentIntersected){
      let mouseXY = [event.clientX, event.clientY]
      this.props.onFeatureClicked(this.currentIntersected, mouseXY)
    }
  }

  _onClick = (event) => {
    event.preventDefault()
    if(this.isOperating)
    {
      this.isOperating = false
      return
    }
    if(this.currentIntersected){
      if(event.ctrlKey)
      {
        if(this.currentIntersected.userData.interact == 'selected')
          this.props.onFeatureDeselected(this.currentIntersected)
        else
          this.props.onFeatureCtrlSelected(this.currentIntersected)
      }
      else
        this.props.onFeatureSelected(this.currentIntersected)
    }
    else
      this.props.onFeatureDeselectedAll()
  }

  _

	_onDocumentRightClick = (event) =>{
		event.preventDefault()
	} 


	_onDocumentMouseDown = (event) => { 
    event.preventDefault()
		//console.log('button', event.button)
		let clientRect = this.container.getBoundingClientRect()
    document.addEventListener('mousemove', this._onTransDocumentMouseMove, false)
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


	_onTransDocumentMouseMove = (event) => {
    event.preventDefault()
    this.isOperating = true
		let clientRect = this.container.getBoundingClientRect()
    const windowHalfX = (clientRect.left + clientRect.right) / 2
		const windowHalfY = (clientRect.top + clientRect.bottom) / 2

		this.currentXY[0] = event.clientX - windowHalfX
		this.currentXY[1] = event.clientY - windowHalfY
    this.animate()
	}

  _onDocumentMouseMove = (event) => {
    event.preventDefault()
		let clientRect = this.container.getBoundingClientRect()
    const windowHalfX = (clientRect.left + clientRect.right) / 2
    let windowX = clientRect.right - clientRect.left
		const windowHalfY = (clientRect.top + clientRect.bottom) / 2
    let windowY = clientRect.bottom - clientRect.top
    this.mouse.x = 2 * (event.clientX - windowHalfX) / windowX
    this.mouse.y = -2 * (event.clientY - windowHalfY) / windowY
    this.animate()
  }

	_onDocumentMouseUp = () => {
    document.removeEventListener('mousemove', this._onTransDocumentMouseMove, false);
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

  computeBoundingSphere(){
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
    let box = new THREE.Box3().setFromObject(this.globalGroup)
    let sphere = box.getBoundingSphere()
    this.centerPoint = sphere.center
    this.sphereRadius = sphere.radius
  }


	fitAll = () => {
		this.computeBoundingSphere()
    if(this.sphereRadius > 0)
    {
     /* let curPosition = new THREE.Vector3()
      let curX = this.globalGroup.matrix.elements[12]
      let curY = this.globalGroup.matrix.elements[13]
      let curZ = this.globalGroup.matrix.elements[14]
      curPosition.set(curX, curY, curZ)*/
      let goalPosition = this.centerPoint.clone().multiplyScalar(-1)

      let translationM = new THREE.Matrix4()
        .setPosition(goalPosition)

      this.globalGroup.applyMatrix(translationM)
      this.zoom = this.sphereRadius / this.props.height * 2.5

      this.animate()
    }
	}

	fitAllAndAxono = () => {
		let rotationM1 = new THREE.Matrix4(), rotationM2 = new THREE.Matrix4()

		rotationM1.makeRotationY(-Math.PI / 4)
		  //rotationM1.multiply(translationM)
		rotationM2.makeRotationX(Math.PI / 4)
		rotationM2.multiply(rotationM1)
    this.globalGroup.matrix = rotationM2
    this.globalGroup.matrix.decompose(this.globalGroup.position, 
      this.globalGroup.quaternion,
      this.globalGroup.scale
    )
		this.computeBoundingSphere()
    if(this.sphereRadius > 0)
    {
		  let translationM = new THREE.Matrix4().setPosition(this.centerPoint.clone().multiplyScalar(-1))
      this.globalGroup.applyMatrix(translationM)      
      this.zoom = this.sphereRadius / this.props.height * 2.5

      this.animate()
    }
	}

	axonometricView = () => {
		this.computeBoundingSphere()
    this.prevCenter = this.centerPoint.clone()
		let rotationM1 = new THREE.Matrix4(), rotationM2 = new THREE.Matrix4()
		rotationM1.makeRotationY(-Math.PI / 4)
		rotationM2.makeRotationX(Math.PI / 4)
		rotationM2.multiply(rotationM1)
    this.globalGroup.matrix = rotationM2
    this.globalGroup.matrix.decompose(this.globalGroup.position, 
      this.globalGroup.quaternion,
      this.globalGroup.scale
    )

    this.computeBoundingSphere()
    let translationM = new THREE.Matrix4().setPosition(this.prevCenter.sub(this.centerPoint))
    this.globalGroup.applyMatrix(translationM)
    this.animate()
	}

	leftView = () => {
		this.computeBoundingSphere()
    this.prevCenter = this.centerPoint.clone()
		let M = new THREE.Matrix4()
		M.makeRotationY(Math.PI/2)
    this.globalGroup.matrix = M
    this.globalGroup.matrix.decompose(this.globalGroup.position, 
      this.globalGroup.quaternion,
      this.globalGroup.scale
    )
    this.computeBoundingSphere()
    let translationM = new THREE.Matrix4().setPosition(this.prevCenter.sub(this.centerPoint))
    this.globalGroup.applyMatrix(translationM)
    
    this.animate()
	}

	rightView = () => {
		this.computeBoundingSphere()
    this.prevCenter = this.centerPoint.clone()
		let M = new THREE.Matrix4()
		M.makeRotationY(- Math.PI/2)
    this.globalGroup.matrix = M
    this.globalGroup.matrix.decompose(this.globalGroup.position, 
      this.globalGroup.quaternion,
      this.globalGroup.scale
    )
    this.computeBoundingSphere()
    let translationM = new THREE.Matrix4().setPosition(this.prevCenter.sub(this.centerPoint))
    this.globalGroup.applyMatrix(translationM)
    this.animate()
	}

	topView = () => {
		this.computeBoundingSphere()
    this.prevCenter = this.centerPoint.clone()
		let M = new THREE.Matrix4()
		M.makeRotationX( Math.PI/2)
    this.globalGroup.matrix = M
    this.globalGroup.matrix.decompose(this.globalGroup.position, 
      this.globalGroup.quaternion,
      this.globalGroup.scale
    )
    this.computeBoundingSphere()
    let translationM = new THREE.Matrix4().setPosition(this.prevCenter.sub(this.centerPoint))
    this.globalGroup.applyMatrix(translationM)
    this.animate()
	}

	bottomView = () => {
		this.computeBoundingSphere()
    this.prevCenter = this.centerPoint.clone()
		let M = new THREE.Matrix4()
		M.makeRotationX(- Math.PI/2)
    this.globalGroup.matrix = M
    this.globalGroup.matrix.decompose(this.globalGroup.position, 
      this.globalGroup.quaternion,
      this.globalGroup.scale
    )
    this.computeBoundingSphere()
    let translationM = new THREE.Matrix4().setPosition(this.prevCenter.sub(this.centerPoint))
    this.globalGroup.applyMatrix(translationM)
    this.animate()
	}

	frontView = () => {
		this.computeBoundingSphere()
    this.prevCenter = this.centerPoint.clone()
		let M = new THREE.Matrix4()
    this.globalGroup.matrix = M
    this.globalGroup.matrix.decompose(this.globalGroup.position, 
      this.globalGroup.quaternion,
      this.globalGroup.scale
    )
    this.computeBoundingSphere()
    let translationM = new THREE.Matrix4().setPosition(this.prevCenter.sub(this.centerPoint))
    this.globalGroup.applyMatrix(translationM)
    this.animate()
	}

	rearView = () => {
		this.computeBoundingSphere()
    this.prevCenter = this.centerPoint.clone()
		let M = new THREE.Matrix4()
		M.makeRotationY( Math.PI)
    this.globalGroup.matrix = M
    this.globalGroup.matrix.decompose(this.globalGroup.position, 
      this.globalGroup.quaternion,
      this.globalGroup.scale
    )
    this.computeBoundingSphere()
    let translationM = new THREE.Matrix4().setPosition(this.prevCenter.sub(this.centerPoint))
    this.globalGroup.applyMatrix(translationM)
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
