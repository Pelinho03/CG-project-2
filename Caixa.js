"use strict";

import * as THREE from "three";

export class MyBox extends THREE.Object3D {
    constructor(lc, ac, ec, cc) {
        super();

        //-----------------------------------//
        // Carregar a imagens
        //-----------------------------------//
        const textureLoader = new THREE.TextureLoader();

        const texturaCartao = textureLoader.load("imgs/cardboard.jpg");
        const texturaTopo = textureLoader.load("imgs/alternador.png");
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
                new THREE.MeshStandardMaterial({ map: texturaTexto }), // Right face (X+)
                new THREE.MeshStandardMaterial({ map: texturaTexto }), // Left face (X-)
                new THREE.MeshStandardMaterial({ map: texturaTopo }), // Top face (Y+)
                new THREE.MeshStandardMaterial({ map: texturaCartao }), // Bottom face (Y-)
                new THREE.MeshStandardMaterial({ map: texturaTexto }), // Front face (Z+)
                new THREE.MeshStandardMaterial({ map: texturaTexto }), // Back face (Z-)
            ];
            //-----------------------------------//

            //-----------------------------------//
            // Criar a caixa
            //-----------------------------------//
            const caixa = new THREE.Mesh(
                new THREE.BoxGeometry(lc, ac, cc),
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
