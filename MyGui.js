"use strict";

import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { Webgl } from "./Webgl.js";
import { MyBox } from "./Caixa.js";
import { MyScene } from "./Scene.js";

export class MyGui {
    webgl;

    constructor(webgl) {
        this.webgl = webgl;

        //-----------------------------------//
        // dimensões e opções
        //-----------------------------------//
        const guiVars = {
            trackballControls: true,
            limparCena: () => {
                for (
                    let i = this.webgl.scene.children.length - 1;
                    i >= 0;
                    i--
                ) {
                    const child = this.webgl.scene.children[i];
                    if (!(child instanceof THREE.Light)) {
                        this.webgl.scene.remove(child);
                    }
                }
            },
            verCaixa: () => {
                // this.webgl.scene.add(new THREE.AxesHelper(50));
                const caixa1 = new MyBox(1410, 1000, 10, 1400); //lc, ac, ec, cc
                this.webgl.scene.add(caixa1);
            },
            verCena: () => {
                // this.webgl.scene.add(new THREE.AxesHelper(50));
                const cena = new MyScene(56300, 20, 53800); //lc, ac, cc
                this.webgl.scene.add(cena);
            },
        };
        //-----------------------------------//

        //-----------------------------------//
        // Menu
        //-----------------------------------//
        const gui = new GUI();
        const trackballControls = gui
            .add(guiVars, "trackballControls")
            .name("Trackball");
        const limparCena = gui.add(guiVars, "limparCena").name("Limpar Cena");
        const verCaixa = gui.add(guiVars, "verCaixa").name("Ver Caixa");
        const verCena = gui.add(guiVars, "verCena").name("Ver Cena");

        trackballControls.onChange((value) => {
            this.webgl.trackballControls.enabled =
                !this.webgl.trackballControls.enabled;
        });
        //-----------------------------------//
    }
}
