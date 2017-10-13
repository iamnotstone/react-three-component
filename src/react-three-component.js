import React from 'react'
import * as THREE from 'three'
import {} from './TrackballControls'
/*
 *  props{
 *    height,
 *    width,
 *    appendObjects, [THREE.Object3D]
 *    dropObjects, [THREE.Object3D]
 *  }
 *
 */
export class ReactThreeComponent extends React.Component{
  constructor(props){
    super(props)
	  this.container = null
	  //this.initThree = initThree().bind(this)
	}

	updateObjects(){
	  this.props.dropObjects.forEach(obj => {
		  this.scene.remove(obj)
		})
		this.props.appendObjects.forEach(obj => {
		  this.scene.add(obj)
		})
		this.renderer.render(this.scene, this.camera)
	}

  initThree(){
    this.scene = new THREE.Scene()
		this.scene.background = new THREE.Color(0xb39c9c)
		this.camera = new THREE.PerspectiveCamera(75, this.props.width /
		  this.props.height, 0.1, 1000)
		//this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / 
		//window.innerHeight,1,1000)
		this.scene.add(this.camera)
		this.camera.position.set(0, 0, 50)


		this.light = new THREE.PointLight(0x505050,0.8)
		this.camera.add(this.light)
	  this.renderer = new THREE.WebGLRenderer({antialias: true})
		this.renderer.setPixelRatio(window.devicePixelRatio)
		this.renderer.setSize(this.props.width, this.props.height)
		//this.renderer.setSize(window.innerWidth, window.innerHeight)
		this.container.appendChild(this.renderer.domElement)
		this.controls = new THREE.TrackballControls( this.camera, 
			this.renderer.domElement );
		this.controls.minDistance = 0;
		this.controls.maxDistance = 1000;

		console.log('controls', this.controls)
		//for test

		var animate = function(){
			requestAnimationFrame(animate)
			this.controls.update()
			this.renderer.render(this.scene, this.camera)
		}.bind(this)

		animate()

		this.updateObjects()
	}

  componentDidMount(){
	  this.initThree()
		this.setState({})
	}

  componentWillMount(){
	  console.log('component will mount')
	}

  componentWillUpdate(nextProps, nextState){
	  console.log('component will update')
	}

	shouldComponentUpdate(nextProps, nextState){
		console.log('should component update')
		return true
	}
  componentWillReceiveProps(nextProps){
	  console.log('component will receive props')
	}

  componentDidUpdate(prevProps, prevState){
		console.log('component did update')
	}
	componentWillUnmount(){
	  console.log('component will unmount')
  }

  render(){
		return (<div ref = {node => {
			this.container = node}}></div>)
  }
}
