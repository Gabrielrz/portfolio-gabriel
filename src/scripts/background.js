
import * as THREE from 'three';

import { gsap } from "gsap";
import base from "/src/images/base.png";
export default class Background{//creado con chatGPT


    constructor(scene){
        this.scene = scene;
        const texture = new THREE.TextureLoader().load( base );
        this.scene.background = texture;
        //this.particulas();
    }

    particulas(){
        // Creamos la geometría
        this.particleGeometry = new THREE.BufferGeometry();

        // Creamos los arrays de vértices y colores
        const vertices = [];
        const colors = [];
        // Añadimos 1000 partículas
        for (let i = 0; i < 1000; i++) {
        // Generamos una posición aleatoria
        const x = Math.random() * 1000 - 500;
        const y = Math.random() * 1000 - 500;
        const z = Math.random() * 1000 - 500;
        vertices.push(x, y, z);

        // Generamos un color violeta aleatorio
        const r = 0;
        const g = Math.random();
        const b = 249;
        colors.push(r, g, b);

        }

        // Añadimos los arrays a la geometría
        this.particleGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
        );
        this.particleGeometry.setAttribute(
        "customColor",
        new THREE.Float32BufferAttribute(colors, 3)
        );


        // Creamos el material
        const particleMaterial = new THREE.ShaderMaterial({
            vertexShader: `
            attribute vec3 customColor;
            varying vec3 vColor;
        
            void main() {
                vColor = customColor;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 2.0);
                gl_PointSize  = 4.0;
                
            }
            `,
            fragmentShader: `
            varying vec3 vColor;
        
            void main() {
                gl_FragColor = vec4(vColor, 1.0);
            }
            `,
            vertexColors: true,
            depthTest: true,
            transparent: true,
        });
        // Creamos el objeto Points
        const particles = new THREE.Points(this.particleGeometry, particleMaterial);

        // Añadimos el objeto Points a la escena
        this.scene.add(particles);
        this.animateParticulas();
    }
    
    animateParticulas() {
        const positions = this.particleGeometry.attributes.position.array;
        const particles = [];
        for (let i = 0; i < 1000; i++) {
            particles.push({ x: positions[i * 3], y: positions[i * 3 + 1], z: positions[i * 3 + 2] })
        }
        // Animar las partículas con GSAP
        gsap.to(particles, {
            x: ()=>{
                return Math.random()*1000-500;
            }, // Mueve las partículas en la dirección x
            y: ()=>{
                return Math.random()*1000-500;
            }, // Mueve las partículas en la dirección y
            z: ()=>{
                return Math.random()*1000-500;
            }, // Mueve las partículas en la dirección z
            ease: "linear", // Efecto de animación
            duration:100,
            repeat: -1, // Repetir la animación infinitamente
            onUpdate: () => {
            // Actualizar la posición de cada partícula con la posición animada
            for (let i = 0; i < 1000; i++) {
                positions[i * 3] = particles[i].x;
                positions[i * 3 + 1] = particles[i].y;
                positions[i * 3 + 2] = particles[i].z;
            }
            // Marcar la geometría como actualizada
            this.particleGeometry.attributes.position.needsUpdate = true;
            },
        });
      }
}