# AGV Logistics 3D Visualization

Visualização Interativa de uma Área Logística em 3D baseada em dados reais de um AGV.

---

## Descrição

Este projeto foi desenvolvido para a unidade curricular de **Computação Gráfica** (Engenharia Informática) e consiste na criação de um modelo 3D interativo de uma área logística, a partir de uma imagem raster captada por um AGV (robot móvel).  
O objetivo é representar fielmente o ambiente, incluindo paletes com texturas realistas, e permitir a navegação livre pelo utilizador.

---

## Objetivos do Projeto

-   Visualizar em 3D a área logística a partir da imagem do AGV.
-   Representar duas paletes 3D nas posições e dimensões indicadas no enunciado.
-   Aplicar textura de cartão com o texto “ALTERNATORS XPTO MY COMPANY INC” nas faces laterais das paletes.
-   Preencher o topo das paletes com várias imagens de alternadores, conforme necessário.
-   Permitir navegação e interação com a cena usando **TrackballControls**.
-   Utilizar **Three.js** e programação orientada a objetos.

---

## Funcionalidades

-   **Paletes 3D realistas**: Faces laterais com textura de cartão e texto, topo preenchido com imagens de alternadores.
-   **Base da cena**: Imagem do mapa logístico como textura do chão.
-   **Interatividade**: Zoom, rotação e pan com TrackballControls.
-   **Câmaras**: Alternância entre perspetiva e ortográfica.

---

## Tecnologias

-   [Three.js](https://threejs.org/) (WebGL)
-   JavaScript ES6
-   HTML5 / CSS3
-   Canvas 2D (para texturas com texto)
-   lil-gui (opcional, para interface gráfica)

---

## Estrutura do Projeto

```
CG-project-2/
│
├── Caixa.js         # Classe da palete (MyBox)
├── Scene.js         # Classe do cenário logístico (MyScene)
├── Webgl.js         # Inicialização de renderer, câmara, luzes, controlos
├── MyGui.js         # Interface gráfica (opcional)
├── projeto.html     # HTML principal
├── imgs/            # Imagens: mapa, cartão, alternador
└── README.md
```

---

## Como Executar

1. **Clona o repositório:**
    ```bash
    git clone https://github.com/Pelinho03/CG-project-2.git
    ```
2. **Abre o diretório do projeto:**
    ```bash
    cd CG-project-2
    ```
3. **Abre o `projeto.html` no browser** (Chrome, Edge ou Firefox).
    > Não é necessário servidor local.

---

## Imagens Utilizadas

-   `imgs/mapa_area_logistica.png` — Mapa do AGV (base do cenário)
-   `imgs/cardboard.jpg` — Textura de cartão (faces laterais das paletes)
-   `imgs/alternador.png` — Alternador (topo das paletes)

---

## Notas Técnicas

-   O número de imagens de alternadores no topo das paletes é ajustado automaticamente para preencher toda a superfície.
-   O texto nas faces laterais é desenhado dinamicamente sobre a textura de cartão.
-   As paletes são posicionadas e orientadas conforme o enunciado.
-   A iluminação foi ajustada para garantir contraste e realismo sem saturar as texturas.

---

## Autor

**Paulo Guimarães**  
[GitHub](https://github.com/Pelinho03)

---

> Projeto académico — Computação Gráfica, 2025
