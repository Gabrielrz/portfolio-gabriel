/**
 * DEscripcion: clase NO EN USO
 * falta completar, para construir el render y controls para organizar codigo
 * 
 * 
*/
import * as THREE from 'three';
export class Rendering{


    constructor(canvas,sizeW,sizeH,){
        this.renderer = new THREE.WebGLRenderer({canvas:this.c,antialias:true});
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        
        this.renderer.setSize( this.sizes.width, this.sizes.height );
      
    }


    get getRender(){
        return this.renderer;
    }
    animate() {
        requestAnimationFrame( this.animate.bind(this) );
      
        this.render();
        /*console.log('rotacion camara:', this.camera.rotation);
        console.log('posicion camara:',this.camera.position);
        console.log('ADSA0',this.controls.target);*/
        this.time = - performance.now() * 0.0003;
       
    }


    render(){
        this.controls.update();
        this.interactionManager.update();
        this.renderer.render( this.scene, this.camera );
    }

}