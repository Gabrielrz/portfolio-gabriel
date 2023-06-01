import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import LodL from '../performance/levelOfDetail';

//import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';//mobile

export default class PortfolioGTLF{

    constructor(scene,url,url_bin){
			
			this.lodL = new LodL();
			this.loadingManager = new THREE.LoadingManager()
			this.url = url;
			this.scene = scene;
			this.position = new THREE.Vector3();
       		this.dracoLoader = new DRACOLoader();

			this.dracoLoader.setDecoderPath('jsm/libs/draco/');
			
			this.loader = new GLTFLoader(this.loadingManager);
			this.loadingManager.setURLModifier((urls) => {
				
				console.log("urlsbin",url_bin);
				urls = (urls.search('museumOptimized7.bin')!=-1)?  url_bin: urls;
				
				console.log("urls",urls);
				return urls;
			  });
			//this.loader.setMeshoptDecoder(MeshoptDecoder);
			this.loader.setDRACOLoader( this.dracoLoader );
			this.mixer;
			this.load();
			
    }

	load(){
		this.prom = new Promise((resolve)=>{

		
			this.loader.load(this.url, (gltf) => {

				this.model =  gltf.scene;
				this.lodL.initLod(gltf,this.scene);
				//this.scene.add(this.model);
				this.position.copy(this.model.position);
				this.camera = gltf.cameras[0];

				const directionalLight =  this.model.children[0].children[0];
				directionalLight.layers.toggle(1);
				directionalLight.intensity =1.0;

			
				//this.clip = THREE.AnimationClip.findByName( gltf.animations, "CameraAction" ) 

				resolve(gltf);
				console.log(gltf);
		

			});
		});	
	}
	setMixer(mixer){
		this.mixer = mixer;
	}


}