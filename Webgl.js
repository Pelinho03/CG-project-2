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

        // create a render and set the size
        const canvas = document.querySelector("#WebGL-canvas");
        this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
        this.renderer.useLegacyLights = true;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x555555);

        // create camera, position and point the camera to the center of the scene
        this.camera = new THREE.PerspectiveCamera(
            40,
            window.innerWidth / window.innerHeight,
            0.1,
            20000
        );
        this.camera.position.set(0, 2000, -4000); // x y z
        this.camera.lookAt(0, 0, 0);

        this.trackballControls = new TrackballControls(
            this.camera,
            this.renderer.domElement
        );

        // Luz direcional
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(500, 1000, 500); // Posição da luz
        light.castShadow = true; // Habilitar sombras
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;
        light.shadow.camera.near = 0.5;
        light.shadow.camera.far = 3000;
        this.scene.add(light);

        // Luz ambiente
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // Cor e intensidade
        this.scene.add(ambientLight);

        this.trackballControls.rotateSpeed = 10.0;
        this.trackballControls.zoomSpeed = 1.0;
        this.trackballControls.panSpeed = 1.0;
        this.trackballControls.staticMoving = true;
    }
    //-----------------------------------//
    // Método para alternar entre câmeras
    //-----------------------------------//
    switchCamera() {
        const aspect = window.innerWidth / window.innerHeight;

        if (this.camera instanceof THREE.PerspectiveCamera) {
            // Alternar para câmera ortográfica
            const viewSize = 1000; // Ajuste o tamanho da visualização
            this.camera = new THREE.OrthographicCamera(
                -aspect * viewSize, // left
                aspect * viewSize, // right
                viewSize, // top
                -viewSize, // bottom
                0.1, // near
                20000 // far
            );
            this.camera.position.set(0, 2000, -4000); // Ajuste a posição da câmera
            this.camera.lookAt(this.scene.position); // Apontar para o centro da cena
        } else {
            // Alternar para câmera perspectiva
            this.camera = new THREE.PerspectiveCamera(
                45,
                window.innerWidth / window.innerHeight,
                0.1,
                20000
            );
            this.camera.position.set(0, 2000, -4000); // Ajuste a posição da câmera
            this.camera.lookAt(this.scene.position); // Apontar para o centro da cena
        }

        // Atualizar os controles para usar a nova câmera
        this.trackballControls.object = this.camera;
    }
    //-----------------------------------//

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
