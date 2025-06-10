"use strict";

import * as THREE from "three";
import { MyBox } from "./Caixa.js";

export class MyScene extends THREE.Object3D {
    constructor(larguraCena, alturaCena, comprimentoCena) {
        //Largura da cena; altura da cena, comprimento da cena
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
            new THREE.BoxGeometry(larguraCena, alturaCena, comprimentoCena), // (56300, 10, 53800);
            mapaLogistico
        );
        // base.add(new THREE.AxesHelper(1000));
        base.rotation.y = 0.5678;

        base.castShadow = true;
        base.receiveShadow = true;

        this.add(base);
        //-----------------------------------//

        //-----------------------------------//
        // Criar as paletes
        //-----------------------------------//
        const larguraCaixa = 1410;
        const alturaCaixa = 1000;
        const expessuraCaixa = 10;
        const comprimentoCaixa = 1400;

        const caixa1 = new MyBox(
            larguraCaixa,
            alturaCaixa,
            expessuraCaixa,
            comprimentoCaixa
        );
        // caixa1.add(new THREE.AxesHelper(1000));
        caixa1.position.set(
            -larguraCaixa * 6 + expessuraCaixa,
            alturaCaixa / 2,
            larguraCaixa * 3.37
        ); // x y z
        // caixa1.rotation.y = -0.5678;

        const caixa2 = new MyBox(
            larguraCaixa - 200,
            alturaCaixa,
            expessuraCaixa,
            comprimentoCaixa
        );
        // caixa2.add(new THREE.AxesHelper(1000));
        caixa2.position.set(
            -expessuraCaixa * 3,
            alturaCaixa / 2,
            larguraCaixa * 3.426
        ); // x y z
        // caixa2.rotation.y = -0.5678;

        this.add(caixa1);
        this.add(caixa2);
        //-----------------------------------//

        //-----------------------------------//
        // Grupo pai para rotacionar tudo junto
        //-----------------------------------//
        const grupoLogistica = new THREE.Group();

        grupoLogistica.add(base);
        grupoLogistica.add(caixa1);
        grupoLogistica.add(caixa2);

        grupoLogistica.rotation.y = -0.5678;

        this.add(grupoLogistica);
        //-----------------------------------//
    }

    //-----------------------------------//
    // Método para criar um mesh com material normal e wireframe
    //-----------------------------------//
    createMesh(geom, texture) {
        const meshMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.5,
            metalness: 0.1,
        });

        const mesh = new THREE.Mesh(geom, meshMaterial);
        return mesh;
    }
    //-----------------------------------//
}
