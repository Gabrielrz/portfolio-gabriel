import EventEmitter from '../utils/eventEmitter';
import Background from './background';
import PortfolioGTLF from './portfolio';
import gltf_bin from  '/src/assets/models/museum8optimized.bin?url';
import glt_url from  '/src/assets/models/museum8optimized.gltf?url';
export default class Importer extends EventEmitter{


//en esta clase iran los loaders
    constructor(scene){
        super()
        this.resources = {
            "portfolio":this.portfolio =  new PortfolioGTLF(scene,glt_url,gltf_bin),
            "background":this.background = new Background(scene),
        }
        this.countResources = Object.keys(this.resources).length;

        this.load();
    }


    load(){
        var counterLoads = 0;
        Object.entries(this.resources).forEach(element => {
                element[1].on('onLoad',(e)=>{
                    counterLoads++
                    if(counterLoads == this.countResources){
                        this.trigger('onComplete');
                    }
                });
        });
        
        
    }


}