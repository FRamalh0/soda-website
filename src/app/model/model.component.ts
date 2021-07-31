import { Component, OnInit } from '@angular/core';

import * as THREE from 'three';
import * as dat from 'dat.gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  constructor() { 

    

  }

  ngOnInit(): void {
    // Debug
    //const gui = new dat.GUI()

    // Canvas
    //const canvas = document.querySelector('canvas.webgl')

    // Scene
    const scene = new THREE.Scene()

    //Background color
    scene.background = new THREE.Color( 0xf5f5f3 );

    // Objects
    //const geometry = new THREE.BoxGeometry( 5, 5, 1 );


    // Materials
    //const material = new THREE.MeshBasicMaterial()
    //material.color = new THREE.Color(0xffffff)

    var isoda;
    const objLoader = new GLTFLoader();
    objLoader.load('assets/isoda.glb', function(obj) { 
      obj.scene.scale.set(0.2, 0.2, 0.2);
      isoda = obj.scene;
      isoda.rotation.z = -0.2;
      scene.add(isoda);
    });

    //const sphere = new THREE.Mesh(geometry,material)
    //sphere.position.z = -3
    //scene.add(sphere)

    // Lights

    //const pointLight = new THREE.PointLight(0xffffff, 0.1)
    //pointLight.position.x = 20
    //pointLight.position.y = 30
    //pointLight.position.z = 40
    //scene.add(pointLight)

    let ambientLight = new THREE.AmbientLight(new THREE.Color('hsl(0, 0%, 100%)'), 1);
    scene.add(ambientLight);

    let directionalLightBack = new THREE.DirectionalLight(new THREE.Color('hsl(0, 0%, 100%)'), 0.25);
    directionalLightBack.position.set(30, 100, 100);
    scene.add(directionalLightBack);

    let directionalLightFront = new THREE.DirectionalLight(new THREE.Color('hsl(0, 0%, 100%)'), 0.55);
    directionalLightFront.position.set(-30, 100, -100);
    scene.add(directionalLightFront);

    
    


    /**
     * Sizes
     */
    const sizes = {
        //width: window.innerWidth,
        //height: window.innerHeight
        width: window.document.getElementById("modelSpace").clientWidth,
        height: window.document.getElementById("modelSpace").clientHeight
    }

    window.addEventListener('resize', () =>
    {
        // Update sizes
        //sizes.width = window.innerWidth;
        //sizes.height = window.innerHeight;
        sizes.width = window.document.getElementById("modelSpace").clientWidth;
        sizes.height = window.document.getElementById("modelSpace").clientHeight;

        // Update camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        // Update renderer
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    })

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 10)
    camera.position.x = 0
    camera.position.y = 0.3
    camera.position.z = 1.8
    scene.add(camera)

    // Controls
    //const controls = new OrbitControls(camera, canvas)
    //controls.enableDamping = true

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      antialias: true, 
      autoSize: true,
      ssao: true
    })
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    window.document.getElementById("modelSpace").appendChild(renderer.domElement)
    

    const composer = new EffectComposer( renderer );
    const renderPass = new RenderPass( scene, camera );
    composer.addPass( renderPass );
    /*const saoPass = new SSAOPass( scene, camera, true, true );
    composer.addPass( saoPass );

    const xaaPass = new ShaderPass( FXAAShader );
    composer.addPass(xaaPass);*/





    /**
     * Animate
     */

    const clock = new THREE.Clock()

    var mouseX = 0, mouseY = 0;

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    document.onmousemove = onDocumentMouseMove;
    function onDocumentMouseMove( event ) {

        mouseX = ( event.clientX - windowHalfX );
        mouseY = ( event.clientY - windowHalfY );

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    }

    const tick = () =>
    {

        const elapsedTime = clock.getElapsedTime();

        // Update objects
        //sphere.rotation.y = .5 * elapsedTime
        //sphere.rotation.x = ( mouseY / windowHalfY) * .1;
        //sphere.rotation.y = ( mouseX / windowHalfX) * .4;

        if(isoda){
          isoda.rotation.x = ( mouseY / windowHalfY) * .4 + 0.2;
          isoda.rotation.y = ( mouseX / windowHalfX) * .6 + .05 * elapsedTime;
        }
        
        
        //console.log(sphere.rotation.y + " | " + mouseX + " " + mouseY);

        // Update Orbital Controls
        //controls.update()

        // Render
        //renderer.render(scene, camera)
        composer.render();

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

    tick()
  }

}
