"use strict";

import * as THREE from "three";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";

export class Webgl {
    clock;
    renderer;
    scene;
    camera;
    trackballControls;

    constructor() {
        this.clock = new THREE.Clock();

        //-----------------------------------//
        // create a render and set the size
        //-----------------------------------//
        const canvas = document.querySelector("#WebGL-canvas");
        this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
        this.renderer.useLegacyLights = true;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x555555);
        //-----------------------------------//

        //-----------------------------------//
        // create camera, position and point the camera to the center of the scene
        //-----------------------------------//
        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            90000
        );
        this.camera.position.set(0, 50000, 0);
        this.camera.up.set(0, 0, -1);
        this.camera.lookAt(0, 0, 0);

        this.trackballControls = new TrackballControls(
            this.camera,
            this.renderer.domElement
        );
        //-----------------------------------//

        //-----------------------------------//
        // Carregar luz
        //-----------------------------------//
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.4); // intensidade reduzida
        dirLight.position.set(40000, 120000, 40000);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 4096;
        dirLight.shadow.mapSize.height = 4096;
        dirLight.shadow.camera.near = 1000;
        dirLight.shadow.camera.far = 300000;
        dirLight.shadow.camera.left = -80000;
        dirLight.shadow.camera.right = 80000;
        dirLight.shadow.camera.top = 80000;
        dirLight.shadow.camera.bottom = -80000;
        this.scene.add(dirLight);
        //-----------------------------------//

        //-----------------------------------//
        // Carregar luz ambiente
        //-----------------------------------//
        const ambientLight = new THREE.AmbientLight(0xfff2cc, 0.35); // cor suave, intensidade baixa
        this.scene.add(ambientLight);
        //-----------------------------------//

        //-----------------------------------//
        // Trackball
        //-----------------------------------//
        this.trackballControls.rotateSpeed = 10.0;
        this.trackballControls.zoomSpeed = 1.0;
        this.trackballControls.panSpeed = 1.0;
        this.trackballControls.staticMoving = true;
        //-----------------------------------//
    }

    //-----------------------------------//
    // Método para desativar os controlos
    //-----------------------------------//
    disposeCurrentControls() {
        if (this.trackballControls) {
            this.trackballControls.dispose();
            this.trackballControls = null;
        }
    }
    //-----------------------------------//

    //-----------------------------------//
    // Render
    //-----------------------------------//
    render() {
        const delta = this.clock.getDelta();

        if (this.trackballControls) this.trackballControls.update(delta);

        this.renderer.render(this.scene, this.camera);
    }
    //-----------------------------------//
}
