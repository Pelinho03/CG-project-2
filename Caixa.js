"use strict";

import * as THREE from "three";

export class MyBox extends THREE.Object3D {
    constructor(larguraCaixa, alturaCaixa, expessuraCaixa, comprimentoCaixa) {
        super();

        //-----------------------------------//
        // Carregar a imagens
        //-----------------------------------//
        const textureLoader = new THREE.TextureLoader();

        const texturaCartao = textureLoader.load("imgs/cardboard.jpg");
        const texturaTopo = textureLoader.load(
            "imgs/alternador.png",
            (texture) => {
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(2, 3); // 2  horizontal,3 vertical
            }
        );
        //-----------------------------------//

        //-----------------------------------//
        // Criar o texto com textura de fundo
        //-----------------------------------//
        const canvasTexto = document.createElement("canvas");
        canvasTexto.width = 512;
        canvasTexto.height = 128;
        const ctx = canvasTexto.getContext("2d");

        const imagemDeFundo = new Image();
        imagemDeFundo.src = "imgs/cardboard.jpg";

        imagemDeFundo.onload = () => {
            ctx.drawImage(
                imagemDeFundo,
                0,
                0,
                canvasTexto.width,
                canvasTexto.height
            );

            ctx.font = "bold 20px Arial";
            ctx.fillStyle = "#222";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(
                "ALTERNATORS XPTO MY COMPANY INC",
                canvasTexto.width / 2,
                canvasTexto.height / 2
            );

            const texturaTexto = new THREE.CanvasTexture(canvasTexto);
            //-----------------------------------//

            //-----------------------------------//
            // criar os materiais
            //-----------------------------------//
            const materiais = [
                new THREE.MeshStandardMaterial({ map: texturaTexto }), // lado direito (X+)
                new THREE.MeshStandardMaterial({ map: texturaTexto }), // lado esquerdo (X-)
                new THREE.MeshStandardMaterial({ map: texturaTopo }), // cima (Y+)
                new THREE.MeshStandardMaterial({ map: texturaCartao }), // baixo (Y-)
                new THREE.MeshStandardMaterial({ map: texturaTexto }), // frente (Z+)
                new THREE.MeshStandardMaterial({ map: texturaTexto }), // trás (Z-)
            ];
            //-----------------------------------//

            //-----------------------------------//
            // Criar a caixa
            //-----------------------------------//
            const caixa = new THREE.Mesh(
                new THREE.BoxGeometry(
                    larguraCaixa,
                    alturaCaixa,
                    comprimentoCaixa
                ),
                materiais
            );
            caixa.castShadow = true;
            caixa.receiveShadow = true;

            this.add(caixa);
            //-----------------------------------//
        };
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
