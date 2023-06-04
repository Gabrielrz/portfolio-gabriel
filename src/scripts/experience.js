




import * as THREE from 'three';

import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import PortfolioGTLF from './importAsset/portfolio';
import Sizes from './sizes';
import data from '/src/data/data_portafolio.json';
import { gsap } from "gsap";
import Positions from './positions';
import Background from './background';
import { InteractionManager } from 'three.interactive';
//imagenes textura screen
import info_default from '/src/assets/images/info_default.png';
import info_screen1 from '/src/assets/images/info_screen1.png';
import info_screen2 from '/src/assets/images/info_screen2.png';

import info_screen1_movil from '/src/assets/images/info_screen1_movil.png';
import info_screen2_movil from '/src/assets/images/info_screen2_movil.png';
import info_screen3_movil from '/src/assets/images/info_screen3_movil.png';
import glt_url from  '/src/assets/models/museumOptimized7.gltf?url';
import gltf_bin from  '/src/assets/models/museumOptimized7.bin?url';

export default class Experience{

    constructor(canvas){
            this.positionMarker = 0;//se utiliza como referencia para los eventos eventsFocusElement y eventsBtnsAuxiliar
            this.rotationSpeed = 0.001;
            this.sizes = new Sizes();
            this.positions  = new Positions();
            this.c= canvas;
            this.scene = new THREE.Scene();

            this.clock = new THREE.Clock();
           
            this.renderer = new THREE.WebGLRenderer({canvas:this.c,antialias:true, powerPreference: 'high-performance'});
            this.renderer.outputEncoding = THREE.sRGBEncoding;
            
            this.renderer.setSize( this.sizes.width, this.sizes.height );
          

            this.background = new Background(this.scene);
           
            this.camera = new THREE.PerspectiveCamera( this.sizes.getFov , this.sizes.aspect, 1, 1000 );
            const initPosC = this.positions.positionInitialMuseum.camera;
            this.camera.position.set(initPosC.x,initPosC.y,initPosC.z );


            //interaction manager
            this.interactionManager = new InteractionManager(this.renderer,this.camera,this.renderer.domElement);
            this.sizes.onResize(this.renderer,this.camera);
            this.setMenu();
            this.btnWelcomeContinue();
            this.eventsBtnsAuxiliar();
            this.model =  new PortfolioGTLF(this.scene,glt_url,gltf_bin);
            

            this.stats = new Stats()
            document.body.appendChild(this.stats.dom)

            this.model.prom.then((gltf)=>{
                this.lodL = this.model.lodL;
                //this.exchangetLod(this.lodL);(no en uso por mejora)
               this.insteadOfLod(gltf.scene);
               
                
               
                
                this.buildControls();
                
                
                this.animate();
                
        
            });

            
    }
    /**NO EN USO
     * @description este metodo busca los objetos contenidos dentro 
     * de el objeto LOD y re-aplica los eventos a todos ellos a la vez.
     * @warning al llamara a un evento, se llamaran a todos los eventos
     *  de todos los niveles del lod por que tienen la misma referencia
     * (solucionar en el futuro(en lugar stopPropagation))
     * @method on es llamado cada vez que el nivel de detalle cambia.
     * @param {*} lodL recibe un objeto de la clase Lodl
     */
    exchangetLod(lodL){
       
        lodL.on('level_changed',(e)=>{
            
            this.interactionManager.dispose();
            this.interactionManager = new InteractionManager(this.renderer,this.camera,this.renderer.domElement);

            let distance = this.lodL.levels[lodL.lod.getCurrentLevel()];
            let currentObject = this.lodL.lod.getObjectForDistance(distance);
            
            this.screenMesh =  currentObject.getObjectByName('mesh_30');
            this.improveRotulo(this.screenMesh);
            this.eventsRotulo(this.screenMesh);

            this.elements = this.buscarObjetosPorUserData(currentObject,'focus',true);    
            this.eventsFocusElement(this.elements);
            
            
            console.log('cambio de LOD');
        });
    }

    /**
     * @description : metodo que llama a los mismo metodos de 
     * la funcion exchangeLod pero aplicados al objeto gltf original sin lod
     *  en sustitucion de exchangeLod
     * */
    insteadOfLod(currentObject){
            this.interactionManager.dispose();
            this.interactionManager = new InteractionManager(this.renderer,this.camera,this.renderer.domElement);

            //pantalla de rotulo
            this.screenMesh =  currentObject.getObjectByName('mesh_30');
            this.improveRotulo(this.screenMesh);
            this.eventsRotulo(this.screenMesh);

            //objetos clickables
            this.elements = this.buscarObjetosPorUserData(currentObject,'focus',true);    
            this.eventsFocusElement(this.elements);

            //botones de redes sociales
            this.buttons = [];
            this.buttons.push(currentObject.getObjectByName('buttton1'));
            this.buttons.push(currentObject.getObjectByName('button2'));
            this.buttons.push(currentObject.getObjectByName('button3'));
            this.eventsSocialNetwork(this.buttons);
            
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
        //this.lodL.checkLODLevel(this.camera);
        this.renderer.render( this.scene, this.camera );
        this.stats.update();
        
    }




    /**
     * @description: busca en el objeto gltf los objetos coinsidentes por la propiedad userData
     * @author:chatGPT.
     */
    buscarObjetosPorUserData(objeto, userDataPropiedad, userDataValor) {
        let objetosEncontrados = [];
      
        objeto.traverse(function(objetoActual) {
          if (objetoActual.userData[userDataPropiedad] === userDataValor) {
            objetosEncontrados.push(objetoActual);
            return false;
          }
        });
        
        return objetosEncontrados;
    }

    get nombres(){
        return {
            FIATEC:'Fiatec',
            DUALAD:'Dualad',
            GLAPP:'Glapp',
            SANDFIRG:'Sandfirg',
            REDES:'Redes',
            PANTALLA:'Pantalla'
        };
    }

    get redirect(){
        return {
            gitgub:'',
            instagram:'',
            linkedin:'',
        }
    }

   


    eventsRotulo(screenMesh){
        let i = 1;
        this.interactionManager.add(screenMesh);
        
       screenMesh.addEventListener('mouseover',()=>{
            document.body.style.cursor = 'pointer';
        });
        screenMesh.addEventListener('mouseout', (event) => {
            event.target.material.color.set(0xffffff);
            document.body.style.cursor = 'default';
          });
        screenMesh.addEventListener('click',(event)=>{
            //event.stopPropagation();
           
            //i empieza en 1
            (i>=this.materials.length)? window.open('https://github.com/Gabrielrz/portfolio-gabriel',i=0) : console.log('menor');//cambiar por mesh
            (i < this.materials.length) ? (screenMesh.material = this.materials[i], i++) : console.log('stopscreen');
        });
    }


    /**
     * @description: controla los eventos cuando se presiona en un determinado objeto seleccionable.
     */
    eventsFocusElement(elements){
        
        let positions = this.positions.getPositions;
        let keys = Object.keys(positions);
        
        elements.forEach(element => {
            this.interactionManager.add(element);
            element.addEventListener('click',(event)=>{
                event.target = 'focusEvent';
                event.stopPropagation();
                this.positionMarker = keys.indexOf(element.name);
                this.routeAnimation(this.positionMarker)
                console.log("llamada");
            });
        });
       
    }


    eventsSocialNetwork(buttons){
        console.log(buttons);
        buttons.forEach(button => {
            this.interactionManager.add(button);    
            button.addEventListener('click',(event)=>{
                event.stopPropagation();
                
                if(button.name =='buttton1'){
                    window.open(data.socialNetworks.urlInstagram);
                }
                if(button.name == 'button2'){
                    window.open(data.socialNetworks.urlGithub);

                }
                if(button.name == 'button3'){
                    window.open(data.socialNetworks.urlLinkeddin);

                }
            });
        });
       
    }


    buildControls(){
        //controls
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        const initPos = this.positions.positionInitialMuseum.control;
        this.controls.target.set( initPos.x,initPos.y,initPos.z);
        this.controls.listenToKeyEvents( window ); // optional
        this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
		this.controls.dampingFactor = 0.05;
        //this.controls.enableZoom = false;
		this.controls.enablePan = false;
        
        this.controls.screenSpacePanning = false;

	   // this.controls.minDistance = 100;
		this.controls.maxDistance = 200;


		this.controls.maxPolarAngle = Math.PI / 2;
        this.controls.update();
    }


    improveRotulo(screenMesh){
        this.materials = [];
        const textureLoader = new THREE.TextureLoader();
        const textures = {
            default: textureLoader.load(info_default),
            tx: this.sizes.isMovil ? textureLoader.load(info_screen1_movil) : textureLoader.load(info_screen1),
            ts: this.sizes.isMovil ? textureLoader.load(info_screen2_movil) : textureLoader.load(info_screen2)
        };

        textures.default.flipY = false;
        textures.tx.flipY = false;
        textures.ts.flipY = false;

        this.materials.push(new THREE.MeshBasicMaterial({ map: textures.default }));
        this.materials.push(new THREE.MeshBasicMaterial({ map: textures.tx }));
        this.materials.push(new THREE.MeshBasicMaterial({ map: textures.ts }));

        if (this.sizes.isMovil) {
            const tc = textureLoader.load(info_screen3_movil);
            tc.flipY = false;
            this.materials.push(new THREE.MeshBasicMaterial({ map: tc }));
        }
            
        this.materials.forEach(element => {//replica posiciones gltf comprimido
            element.map.repeat.copy(screenMesh.material.map.repeat);
            element.map.offset.copy(screenMesh.material.map.offset);
            element.map.needsUpdate = true;
        });
      
       screenMesh.material = this.materials[0];
       screenMesh.material.needsUpdate = true;

        

 
        //mallas de eventos
        this.signHitBoxes = new THREE.Group()
        this.hitBoxMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true} )
        this.aboutMeHitBox = new THREE.Mesh(
            new THREE.BoxGeometry( 0.4, 0.43, 1.7 ),
            this.hitBoxMaterial
        )
        this.aboutMeHitBox.position.set(-4,-1.83,-5.1);
        this.signHitBoxes.add(this.aboutMeHitBox);
            this.signHitBoxes.visible = true;
    }



    animationInitial(positions){
       
        let master = gsap.timeline({repeatDelay: 1,onComplete:()=>{this.rotateCamera()}});
        master.add(this.movePositionAnim(positions.pA.camera,positions.pA.control))     
        .add(this.movePositionAnim(positions.pB.camera,positions.pB.control),'-=1')
        .add(this.movePositionAnim(positions.pC.camera,positions.pC.control),'-=2')
    }

    rotateCamera(){
        this.time = - performance.now() * 0.0003;
        gsap.to(this.camera.position,{
            x:()=>{
                return 10 * Math.cos(-performance.now() * 0.0003);
            },
            z:()=>{
                return 10 * Math.sin(-performance.now() * 0.0003);
            },
            repeatRefresh:true,
            ease:"sine.out",
            duration:1.5,
            onUpdate:()=>{
                this.camera.lookAt( this.scene.position );
                this.controls.update();
            },
            onComplete:()=>{
                this.routeAnimation(0);
            }
        });
    }
                
        /**
         * @description : aplica una animacion a la posicion 
         * de un objeto con la posicion de camara y 
         * controles manuales se aplica una animacion 
         * para la camara (@param this.controls.object.position)
         * y otra para controles (@param this.controls.target)
         */
        movePosition(pCamera,pControls,ease='back.out(1.7)'){
            gsap.to(this.controls.object.position,{
                x:pCamera.x,
                y:pCamera.y,
                z:pCamera.z,
                duration:1,
                ease: ease,
                    onUpdate:()=>{
                        this.camera.lookAt(pControls.x,pControls.y,pControls.z);     
                    }
            });
            gsap.to(this.controls.target,{
                x:pControls.x,
                y:pControls.y,
                z:pControls.z,
                duration:1,
                ease: ease,
                    onUpdate:()=>{
                        this.controls.update();
                    },
                    onComplete:()=>{
                    }
            });
        }

        /**
         * @description aplica una animacion y devuelve el timeline gsap
         * @param {*} pCamera 
         * @param {*} pControls 
         * @returns tl gsap timeline
         */
        movePositionAnim(pCamera,pControls){
        let tl = gsap.timeline();
            tl.to(this.controls.object.position,{
                x:pCamera.x,
                y:pCamera.y,
                z:pCamera.z,
                duration:1,
                ease:'sine.out',
                    onUpdate:()=>{
                        this.lodL.lod.update(this.camera);
                        this.camera.lookAt(pControls.x,pControls.y,pControls.z);
                        
                    }
            });
            tl.to(this.controls.target,{
                x:pControls.x,
                y:pControls.y,
                z:pControls.z,
                duration:2,
                ease:'sine.out',
                    onUpdate:()=>{
                        
                        this.lodL.lod.update(this.camera);
                        this.controls.update();
                    },
                    onComplete:()=>{
                    }
            });
            return tl;
        }



        /**
         * @description: despliega el cuadro de descripciones
         * y busca en el html las etiquetas y reescribe la informacion.
         * @param data : es un objeto de datos de data_portafolio.json 
         */
        setDescriptions(data){
                document.querySelector('.panel_Descripcion').style.display = 'block';
                document.querySelector('.wondererContainer').style.display = 'block';
                let d = document.querySelector(".body_description");
                let children = d.children;
                let titleLabel = children[0];
                let descripcionLabel = children[1];
                let tecnologiasList  = children[3];
                let btnGit = document.querySelector('#link_github');
                let btnWeb = document.querySelector('#link_web');
                let btnInfo = document.querySelector('#link_info');
                
                titleLabel.innerHTML = data.titulo;
                descripcionLabel.innerHTML = data.descripcion;
                tecnologiasList.innerHTML = '';
                data.tecnologias.forEach(element => {
                    let li = document.createElement('li'); li.textContent = element;
                    tecnologiasList.appendChild(li);
                });


                btnGit.style.display = 'none';
                btnWeb.style.display = 'none';
                btnInfo.style.display = 'none';

                if (data.urlGit != "") {
                    btnGit.style.display = 'inline';
                    btnGit.href = data.urlGit;
                }
                if (data.urlButton != "") {
                    btnWeb.style.display = 'inline';
                    btnWeb.href = data.urlButton;
                }
                if (data.urlInfo != "") {
                    btnInfo.style.display = 'inline';
                    btnInfo.href = data.urlInfo;
                }
               
                
                
                
        }


        setMenu(){
           let btn = document.querySelector("#navButton");
           let nav = document.querySelector("nav");
           let btnInicio =  document.querySelector('#inicio');
           let btnSobreMi = document.querySelector('#sobreMi');
           let btnContacto  = document.querySelector('#contacto');
           let keys = Object.keys(this.positions.getPositions);
            function toggleMenu(){//funcion anonima
                btn.classList.toggle('navButtonClose'); 
                document.querySelector('.box_btn').classList.toggle('active');//aplica estilo a btn close
                nav.style.display = (nav.style.display === 'none')? 'block' : 'none';
            }

           btn.addEventListener("click",(e)=>{
                toggleMenu();
            });
            btnInicio.addEventListener('click',()=>{
                  //reposiciona a la posicion inicial bienvenida
                  let positions = this.positions;
                  let pCamera = positions.positionInitialMuseum.camera;
                  let pControl = positions.positionInitialMuseum.control;
                  this.movePosition(pCamera,pControl);
                  this.switchDecoration('D');
                  toggleMenu();
            });
            btnSobreMi.addEventListener('click',()=>{
                this.routeAnimation(keys.indexOf('Pantalla'));//pantalla
                toggleMenu();
            }); 
            btnContacto.addEventListener('click',()=>{
                let mail = data.socialNetworks.contacto;
                document.location = "mailto:"+mail;
            });
        }

        btnWelcomeContinue(){
            let btn = document.querySelector('.btn_continue');
            btn.addEventListener('click',()=>{
                document.querySelector('.panel_Bienvenida').style.display = 'none';
                
                this.animationInitial(this.positions.mainAnimation);
               
            });
        }



        /**
         * @description: busca en el array de datos y posiciones y aumenta o disminuye para buscar
         * @var data (data.descripciones): se importa desde data_portafolio.json
         * data.descripciones.find(e => e.titulo==positionsKeys[i]) 
         * busca en el data_portafolio.json en base a la clave de la posicion en positions.js
         * asi no es necesario tener un orden especifico de los datos en data_portafolio.json
         * (distinge entre mayusculas y minusc)
         */
        eventsBtnsAuxiliar(){
           
            document.querySelector('#btnBack')
            .addEventListener('click',()=>{
                (this.positionMarker>0)?this.positionMarker--:console.log('tope');
                this.routeAnimation(this.positionMarker);
            });
            document.querySelector('#btnNext')
            .addEventListener('click',()=>{
                console.log(data.descripciones.length);
                (this.positionMarker==0||this.positionMarker<(Object.keys( this.positions.getPositions).length-1))?this.positionMarker++:console.log('tope');
                this.routeAnimation(this.positionMarker); 
                
            });
            document.querySelector('#btnClose')
            .addEventListener('click',()=>{
                //cerrar descripcion y reposicionar camara
                this.movePosition(this.positions.positionDefault.camera,this.positions.positionDefault.control,'back.out(1)');
                this.switchDecoration('C');
                document.querySelector('.modal_shadow').classList.replace('modalB','modalA');
                
            });
            //events modal view
            document.querySelector('.modal_shadow')
            .addEventListener('click',()=>{
                
                this.movePosition(this.positions.positionDefault.camera,this.positions.positionDefault.control);
                this.switchDecoration('C');
            });
        }

        routeAnimation(i){
            let positions = this.positions.getPositions;
            let positionValues = Object.values(positions);
            let positionsKeys = Object.keys(positions);
            
                 
            
            let posCamera =  positionValues[i].camera;
            let posControl =  positionValues[i].control; 
            let name =  positionsKeys[i];
            //switch default
            if(positionsKeys[i]==this.nombres.PANTALLA){
                //switch b
                this.switchDecoration('B');
                this.movePosition(posCamera,posControl);
                //play animations pantalla 
               
            }else if(positionsKeys[i]==this.nombres.REDES){
                //switch b
                this.switchDecoration('B');
                this.movePosition(posCamera,posControl);
                console.log("Redes"); 

            }else{
                //switch A
                this.switchDecoration('A');
                this.movePosition(posCamera,posControl);
                this.setDescriptions(data.descripciones.find(e => e.titulo==name));
            }
        }

        switchDecoration(pos='B'){
            let panelDescripcion = document.querySelector('.panel_Descripcion');
            let panelAndante = document.querySelector('.wondererContainer');
            let boxBtnDirections = document.querySelector('.btn_directions');
            let panelBienvenida = document.querySelector('.panel_Bienvenida');
            let boxAuxBtns = document.querySelector('.aux_btns');
            let modal_shadow = document.querySelector('.modal_shadow');
            modal_shadow.classList.replace('modalA','modalB');
            switch (pos) {
                case 'A':
                    panelAndante.classList.replace('posB','posA');
                    boxBtnDirections.classList.replace('posBtnB','posBtnA');
                    boxAuxBtns.classList.replace('auxB','auxA');
                    modal_shadow.classList.replace('modalA','modalB');
                    panelBienvenida.style.display  = 'none'; 
                    break;
                case 'B': 
                    panelAndante.style.display = 'block';
                    panelDescripcion.style.display = 'none';
                    panelAndante.classList.replace('posA','posB');
                    boxBtnDirections.classList.replace('posBtnA','posBtnB');
                    boxAuxBtns.classList.replace('auxA','auxB');
                    modal_shadow.classList.replace('modalB','modalA');
                    panelBienvenida.style.display  = 'none';

                    break;
                case 'C':
                    panelDescripcion.style.display = 'none';
                    panelAndante.style.display = 'none';
                    modal_shadow.classList.replace('modalB','modalA');
                    panelBienvenida.style.display  = 'none';
                    break;
                case 'D'://panel bienvenida
                    panelBienvenida.style.display  = 'block'; 
                    panelDescripcion.style.display = 'none';
                    panelDescripcion.style.display = 'none';
                    panelAndante.style.display = 'none';
                    modal_shadow.classList.replace('modalB','modalA');
                    break;
                default:
                    panelBienvenida.style.display  = 'none'; 
                    modal_shadow.classList.replace('modalB','modalA');      
                    break;
            }
        }


       
        

        

}