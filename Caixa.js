"use strict";

import * as THREE from "three";

export class MyBox extends THREE.Object3D {
    constructor(lc, ac, ec, cc) {
        super();

        const textureLoader = new THREE.TextureLoader();

        const texturaCartao = textureLoader.load("imgs/cardboard.jpg");
        const texturaTopo = textureLoader.load("imgs/alternador.png");

        const canvasTexto = document.createElement("canvas");
        canvasTexto.width = 512;
        canvasTexto.height = 128;
        const ctx = canvasTexto.getContext("2d");

        const imagemDeFundo = new Image();
        imagemDeFundo.src = "imgs/cardboard.jpg";

        imagemDeFundo.onload = () => {
            // desenhar fundo
            ctx.drawImage(
                imagemDeFundo,
                0,
                0,
                canvasTexto.width,
                canvasTexto.height
            );

            // desenhar texto
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

            // Criar materiais para cada face
            const materiais = [
                new THREE.MeshStandardMaterial({ map: texturaTexto }), // Right face (X+)
                new THREE.MeshStandardMaterial({ map: texturaTexto }), // Left face (X-)
                new THREE.MeshStandardMaterial({ map: texturaTopo }), // Top face (Y+)
                new THREE.MeshStandardMaterial({ map: texturaCartao }), // Bottom face (Y-)
                new THREE.MeshStandardMaterial({ map: texturaCartao }), // Front face (Z+)
                new THREE.MeshStandardMaterial({ map: texturaCartao }), // Back face (Z-)
            ];

            const caixa = new THREE.Mesh(
                new THREE.BoxGeometry(lc, ac, cc),
                materiais
            );

            caixa.castShadow = true;
            caixa.receiveShadow = true;

            this.add(caixa);
        };
    }
}
