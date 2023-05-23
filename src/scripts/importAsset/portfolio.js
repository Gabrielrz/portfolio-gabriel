import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
export default class PortfolioGTLF{

    constructor(scene,url){
			this.lod = new THREE.LOD();
			this.loadingManager = new THREE.LoadingManager()
			this.url = url;
			this.scene = scene;
			this.position = new THREE.Vector3();
       		this.dracoLoader = new DRACOLoader();

			this.dracoLoader.setDecoderPath('jsm/libs/draco/');
			
			this.loader = new GLTFLoader(this.loadingManager);
			this.loader.setDRACOLoader( this.dracoLoader );
			this.mixer;
			this.load();
			
    }

	load(){
		this.prom = new Promise((resolve)=>{

		
			this.loader.load(this.url, (gltf) => {

				this.model =  gltf.scene;
				//this.initLod(gltf,this.scene);
				this.scene.add(this.model);
				this.position.copy(this.model.position);
				this.camera = gltf.cameras[0];

				const directionalLight =  this.model.children[0].children[0];
				directionalLight.layers.toggle(1);
				directionalLight.intensity =1.0;

			
				//this.clip = THREE.AnimationClip.findByName( gltf.animations, "CameraAction" ) 

				resolve(gltf);
				console.log(gltf.scene);
		

			});
		});	
	}
	setMixer(mixer){
		this.mixer = mixer;
	}

	update() {
		//this.position.copy(this.model.position);
	  }


	initLod(gltf,scene){
		// Distancia en la que se activa el nivel de detalle 
		const distanceMedio = 10; 
		const distanceBajo = 20; 

		

		// Nivel de detalle más alto (alta calidad)
		const highQualityModel = gltf.scene.clone();
		this.lod.addLevel(highQualityModel, 0);

		// Nivel de detalle medio (calidad media)
		const mediumQualityModel = highQualityModel.clone();
		mediumQualityModel.traverse((child) => {
		if (child.isMesh) {
			// Ajusta los materiales, geometrías, etc., para reducir la calidad
		}
		});
		this.lod.addLevel(mediumQualityModel, distanceMedio);

		// Nivel de detalle más bajo (baja calidad)
		const lowQualityModel = highQualityModel.clone();
		lowQualityModel.traverse((child) => {
		if (child.isMesh) {
			// Ajusta los materiales, geometrías, etc., para reducir la calidad aún más
		}
		});
		this.lod.addLevel(lowQualityModel, distanceBajo);

		scene.add(this.lod);
	}

}