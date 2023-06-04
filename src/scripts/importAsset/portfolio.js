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
				
				urls = (urls.search('museumOptimized7.bin')!=-1)?  url_bin: urls;
				
				
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
				this.scene.add(this.model);//add scene normal object without lod
				//this.lodL.initLod(gltf,this.scene);//add scene through LOD
				this.position.copy(this.model.position);
				this.camera = gltf.cameras[0];

				const directionalLight =  this.model.children[0].children[0];
				directionalLight.layers.toggle(1);
				directionalLight.intensity =1.0;

				resolve(gltf);
				console.log(gltf);
		

			});
		});	
	}
	setMixer(mixer){
		this.mixer = mixer;
	}


}