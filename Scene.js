"use strict";

import * as THREE from "three";
import { MyBox } from "./Caixa.js";

export class MyScene extends THREE.Object3D {
    constructor(la, aa, ca) {
        super();

        //-----------------------------------//
        // Carregar o mapa
        //-----------------------------------//
        const textureLoader = new THREE.TextureLoader();

        const mapaLogistico = textureLoader.load(
            "imgs/mapa_area_logistica.png"
        );
        //-----------------------------------//

        //-----------------------------------//
        // Criar a base
        //-----------------------------------//
        const base = this.createMesh(
            new THREE.BoxGeometry(la, aa, ca), // (56300, 10, 53800);
            mapaLogistico
        );
        // base.add(new THREE.AxesHelper(10000));
        base.position.set(0, 0, 0);
        base.castShadow = true;
        base.receiveShadow = true;
        this.add(base);
        //-----------------------------------//

        //-----------------------------------//
        // Criar as paletes
        //-----------------------------------//
        const lc = 1410;
        const ac = 1000;
        const ec = 10;
        const cc = 1400;

        const caixa1 = new MyBox(lc, ac, ec, cc);
        // caixa1.add(new THREE.AxesHelper(1000));
        caixa1.position.set(-lc * 7 + ac / 5, ac / 2, -ac / 2); // x y z
        caixa1.rotation.y = -0.5678;

        const caixa2 = new MyBox(lc - 200, ac, ec, cc);
        // caixa2.add(new THREE.AxesHelper(1000));
        caixa2.position.set(-cc * 2 + ec * 20, ac / 2, cc * 3 - ec * 10); // x y z
        caixa2.rotation.y = -0.5678;

        this.add(caixa1);
        this.add(caixa2);
        //-----------------------------------//
    }

    //-----------------------------------//
    // Método para criar um mesh com material normal e wireframe
    //-----------------------------------//
    createMesh(geom, texture) {
        const meshMaterial = new THREE.MeshStandardMaterial({
            map: texture, // Aplica a imagem como textura
            roughness: 0.5,
            metalness: 0.1,
        });

        const mesh = new THREE.Mesh(geom, meshMaterial);
        return mesh;
    }
    //-----------------------------------//
}
