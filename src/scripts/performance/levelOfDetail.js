import * as THREE from 'three';
import EventEmitter from "../utils/eventEmitter";
/** LOD NO EN USO, (implementar en el futuro para cada objeto del gtld en lugar de el gltf entero) */
export default class LodL extends EventEmitter{
    constructor(){
        super();
        this.lod = new THREE.LOD();
        
        this.levels = {0:0,1:30,2:50};
        this.objects = new Array();
        this.currentLevel =  this.lod.getCurrentLevel();
    }
    
    initLod(gltf,scene){
	
		
		

		// Nivel de detalle más alto (alta calidad)
		//const highQualityModel = gltf.scene.clone();
        const highQualityModel = gltf.scene.clone();
		this.lod.addLevel(highQualityModel, this.levels[0]);

		// Nivel de detalle medio (calidad media)
		const mediumQualityModel = highQualityModel.clone();
		mediumQualityModel.traverse((child) => {
		if (child.isMesh) {
			// Ajusta los materiales, geometrías, etc., para reducir la calidad
            console.log(child);
            
		}
		});
		this.lod.addLevel(mediumQualityModel, this.levels[1]);

		// Nivel de detalle más bajo (baja calidad)
		const lowQualityModel = highQualityModel.clone();
		lowQualityModel.traverse((child) => {
		if (child.isMesh) {
			// Ajusta los materiales, geometrías, etc., para reducir la calidad aún más
            child.castShadow = false;
		}
		});
		this.lod.addLevel(lowQualityModel, this.levels[2]);

		scene.add(this.lod);
        
        this.objects.push(highQualityModel);
        this.objects.push(mediumQualityModel);
        this.objects.push(lowQualityModel);
       
	}

    
    checkLODLevel(camera) {
        const cameraDistance = camera.position.distanceTo(this.lod.position);
        if(this.currentLevel!=this.lod.getCurrentLevel()){
            this.currentLevel = this.lod.getCurrentLevel();
            this.trigger('level_changed');
            console.log(cameraDistance);
            console.log(this.lod.getCurrentLevel());
        }
    }
}