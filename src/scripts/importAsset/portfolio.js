import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
export default class PortfolioGTLF{

    constructor(scene,url){
			this.loadingManager = new THREE.LoadingManager()
			this.url = url;
			this.scene = scene;
			this.position = new THREE.Vector3();
       		this.dracoLoader = new DRACOLoader();

			this.dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
			
			this.loader = new GLTFLoader(this.loadingManager);
			this.loader.setDRACOLoader( this.dracoLoader );
			this.mixer;
			this.load();
			
    }

	load(){
		this.prom = new Promise((resolve)=>{

		
			this.loader.load(this.url, (gltf) => {

				this.model =  gltf.scene;
				
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
}