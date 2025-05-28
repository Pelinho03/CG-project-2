"use strict";

import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { Webgl } from "./Webgl.js";
import { MyBox } from "./Caixa.js";

export class MyGui {
    webgl;

    constructor(webgl) {
        this.webgl = webgl;

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

                const caixa1 = new MyBox(1400, 1000, 10, 1400); //lc, ac, ec, cc
                this.webgl.scene.add(caixa1);
            },
            Perspectiva: "Perspectiva",
            switchCamera: () => {
                this.webgl.switchCamera();
                guiVars.Perspectiva =
                    this.webgl.camera instanceof THREE.PerspectiveCamera
                        ? "Perspectiva"
                        : "Orthographic";
            },
        };

        const gui = new GUI();
        const trackballControls = gui
            .add(guiVars, "trackballControls")
            .name("Trackball");
        const limparCena = gui.add(guiVars, "limparCena").name("Limpar Cena");
        const verCaixa = gui.add(guiVars, "verCaixa").name("Ver Caixa");
        const camTrocar = gui
            .add(guiVars, "switchCamera")
            .name("Trocar Camera");
        const camPerspetiva = gui.add(guiVars, "Perspectiva").listen();
        // camera.lookAt(scene.position);
        // render();

        trackballControls.onChange((value) => {
            this.webgl.trackballControls.enabled =
                !this.webgl.trackballControls.enabled;
        });
    }
}
