




import * as THREE from 'three';


import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import PortfolioGTLF from './importAsset/portfolio';
import Sizes from './sizes';
import data from "../assets/json/data_portafolio.json";
import { gsap } from "gsap";
import Positions from './importAsset/positions';
import Background from './background';
import { InteractionManager } from 'three.interactive';

//imagenes textura screen
import info_default from '/src/images/info_default.png';
import info_screen1 from '/src/images/info_screen1.png';
import info_screen2 from '/src/images/info_screen2.png';
import glt_url from  '/src/assets/museum4_current.gltf?url'
export default class Experience{

    constructor(canvas){
            this.positionMarker = 0;//se utiliza como referencia para los eventos eventsFocusElement y btnNextBackDescription
            this.rotationSpeed = 0.001;
            this.sizes = new Sizes();
            this.positions  = new Positions();
            this.c= canvas;
            this.scene = new THREE.Scene();
            //this.camera = new THREE.PerspectiveCamera( 50, this.sizes.aspect, 1, 1000 );
			//this.camera.position.set( -32, 8, -30 );
            this.clock = new THREE.Clock();
           
            this.renderer = new THREE.WebGLRenderer({canvas:this.c,antialias:true});
            this.renderer.outputEncoding = THREE.sRGBEncoding;
            
            this.renderer.setSize( this.sizes.width, this.sizes.height );
          

            this.background = new Background(this.scene);
           
          
            //this.particulas(); creado con chatgpt
            
            this.btnActiveMenu();
            this.btnWelcomeContinue();
            this.btnNextBackDescription();
            //this.btnNexBackAuxiliary();
            this.model =  new PortfolioGTLF(this.scene,glt_url);
            
            this.model.prom.then((gltf)=>{
                this.camera = gltf.cameras[0];
                this.camera.aspect = this.sizes.aspect;
                this.screenMesh =  gltf.scene.getObjectByName('screen');
                this.improveRotulo();
                this.loadInteractionRotulo(this.screenMesh);

                this.elements = this.buscarObjetosPorUserData(gltf.scene,'focus',true);
                
                this.eventsFocusElement(this.elements);

                this.camera.position.set( -32, 8, -30 );
                this.builControls();
                this.sizes.onResize(this.renderer,this.camera);
                this.helper = new THREE.CameraHelper( gltf.cameras[0] );
                //this.scene.add( this.helper );
                
                //this.helper.update();
                const axesHelper = new THREE.AxesHelper( 5 );
                this.scene.add( axesHelper );
                this.animate();
                
            });

            
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
            // Si solo deseas encontrar un objeto, puedes detener el recorrido estableciendo el objetoEncontrado y retornando false
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

    loadInteractionRotulo(object){/*interacion para rotulo */
        this.interactionManager = new InteractionManager(
            this.renderer,
            this.camera,
            this.renderer.domElement
          );
          this.interactionManager.add(object);
          this.eventsRotulo()
    }


    eventsRotulo(){
        let i = 1;//en lugar de hacer click para cambiar screen, lo utilizare para links y demas segun combenga
        this.screenMesh.addEventListener('mouseover',()=>{
            document.body.style.cursor = 'pointer';
        });
        this.screenMesh.addEventListener('mouseout', (event) => {
            event.target.material.color.set(0xffffff);
            document.body.style.cursor = 'default';
          });
        this.screenMesh.addEventListener('click',(e)=>{
            console.log(this.materials.length);
            //i empieza en 1
            //(i>=3)? window.open('https://google.com',i=0) : console.log('menor');
            (i < this.materials.length) ? (this.screenMesh.material = this.materials[i], i++) : console.log('stopscreen');
            
        });
    }


    /**
     * @description: controla los eventos cuando se presiona en un determinado objeto seleccionable.
     */
    eventsFocusElement(elements){
        
        let positions = this.positions.positionsAll;
        let keys = Object.keys(positions);
        elements.forEach(element => {
            this.interactionManager.add(element);
            element.addEventListener('click',(event)=>{
                this.positionMarker = keys.indexOf(element.name);
                this.routeAnimation(this.positionMarker,element)
                //this.movePosition(positions[element.name].camera,positions[element.name].control);
                //this.setDescriptions(data.descripciones.find(e => e.titulo==positions[element.name]));
            });
        });
       
        
        
        //

    }


    builControls(){
        //controls
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.controls.target.set( 4, 7.5,-1);
        this.controls.listenToKeyEvents( window ); // optional
        this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
		this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;

	    //this.controls.minDistance = 100;
		//this.controls.maxDistance = 500;


		this.controls.maxPolarAngle = Math.PI / 2;
        this.controls.update();
    }


    improveRotulo(){
        this.materials = new Array();
        var tz = new THREE.TextureLoader().load( info_default );
        let tx = new THREE.TextureLoader().load( info_screen1 );
        let ts = new THREE.TextureLoader().load( info_screen2 );
        
				
        tx.flipY=false; ts.flipY=false; tz.flipY=false;
        this.materials.push(new THREE.MeshBasicMaterial( {map:tz }));
        this.materials.push(new THREE.MeshBasicMaterial( { map: tx } ));
        this.materials.push(new THREE.MeshBasicMaterial( {map:ts }));
        this.screenMesh.material = this.materials[0];


   
        
 
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


    animationInitial(positions){
        var tl = gsap.timeline({ repeatDelay: 1});
        
        tl.to(this.controls.object.position,{
            x:positions.positionA.x, y:positions.positionA.y, z: positions.positionA.z,duration:1.5,
            ease: 'power2.inOut',
            onUpdate:()=>{
               
                //this.camera.lookAt(positions.positionA.x, positions.positionA.y,positions.positionA.z);
               // this.controls.update();
            },
        })
        tl.to(this.controls.object.position,{
        x:positions.positionB.x, y:positions.positionB.y, z: positions.positionB.z,duration:1.5,
        ease:'power2.inOut',
            onUpdate:()=>{

                this.camera.lookAt(0,0,0);
                this.controls.update();

            },
        });

        tl.to(this.controls.object.position,{
            x:positions.positionC.x, y:positions.positionC.y, z: positions.positionC.z,duration:1.5,
            ease: 'power2.inOut',
                onUpdate:()=>{
                    this.camera.lookAt(0,0,0);
                    this.controls.update();
                },
                onComplete:()=>{
                    this.rotateCamera();
                    
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
        movePosition(pCamera,pControls){
            gsap.to(this.controls.object.position,{
                x:pCamera.x,
                y:pCamera.y,
                z:pCamera.z,
                duration:1,
                ease: 'linear',
                    onUpdate:()=>{
                        this.camera.lookAt(pControls.x,pControls.y,pControls.z);     
                    }
            });
            gsap.to(this.controls.target,{
                x:pControls.x,
                y:pControls.y,
                z:pControls.z,
                duration:1,
                ease: 'linear',
                    onUpdate:()=>{
                        this.controls.update();
                    },
                    onComplete:()=>{
                    }
            });
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
                ease:"linear",
                duration:1.5,
                onUpdate:()=>{
                    this.camera.lookAt( this.scene.position );
                    this.controls.update();
                },
                onComplete:()=>{
                    //posicion inicial Fiatec
                    /*this.movePosition(
                        Object.values(this.positions.positionsAll)[0].camera,
                        Object.values(this.positions.positionsAll)[0].control);
                    this.setDescriptions(data.descripciones.find(e => e.titulo=='Fiatec'));*/
                    this.routeAnimation(0,null);
                }
            });
        }



        /**
         * descripcion: despliega el cuadro de descripciones
         * y busca en el html las etiquetas y reescribe la informacion.
         * @param descripcion : es un objeto de datos de data_portafolio.json 
         */
        setDescriptions(descripcion){
                document.querySelector('.panel_Descripcion').style.display = 'block';
                document.querySelector('.wondererContainer').style.display = 'block';
                let d = document.querySelector(".body_description");
                let children = d.children;
                let titleLabel = children[0];
                let descripcionLabel = children[1];
                let tecnologiasList  = children[3];
                
                titleLabel.innerHTML = descripcion.titulo;
                descripcionLabel.innerHTML = descripcion.descripcion;
                tecnologiasList.innerHTML = '';
                descripcion.tecnologias.forEach(element => {
                    let li = document.createElement('li'); li.textContent = element;
                    tecnologiasList.appendChild(li);
                });
                
                
                
        }


        btnActiveMenu(){
           let btn = document.querySelector("#navButton");
           let nav = document.querySelector("nav");
           btn.addEventListener("click",(e)=>{
                  btn.classList.toggle('navButtonClose'); 
                  document.querySelector('.box_btn').classList.toggle('active');//aplica estilo a parent
                  nav.style.display = (nav.style.display === 'none')? 'block' : 'none';
            });
        }

        btnWelcomeContinue(){
            let btn = document.querySelector('.btn_continue');
            btn.addEventListener('click',()=>{
                document.querySelector('.panel_Bienvenida').style.display = 'none';
                
                this.animationInitial(this.positions.getPositionAnimationPuerta);
               
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
        btnNextBackDescription(){
            
            document.querySelector('#btnBack')
            .addEventListener('click',()=>{
                (this.positionMarker>0)?this.positionMarker--:console.log('tope');
                this.routeAnimation(this.positionMarker,null);
            });
            document.querySelector('#btnNext')
            .addEventListener('click',()=>{
                console.log(data.descripciones.length);
                (this.positionMarker==0||this.positionMarker<(Object.keys( this.positions.positionsAll).length-1))?this.positionMarker++:console.log('tope');
                this.routeAnimation(this.positionMarker,null); 
                
            });
        }

        routeAnimation(i=null,element=null){
            let positions = this.positions.positionsAll;
            let positionValues = Object.values(positions);
            let positionsKeys = Object.keys(positions);
            let panelDescripcion = document.querySelector('.panel_Descripcion');
            let panelAndante = document.querySelector('.wondererContainer');
            let contenedorBtns = document.querySelector('.btn_directions');
            let panelBienvenida = document.querySelector('.panel_Bienvenida');
            panelBienvenida.style.display  = 'none';            
            
            let posCamera =  positionValues[i].camera;
            let posControl =  positionValues[i].control; 
            let name =  positionsKeys[i];

            if(positionsKeys[i]==this.nombres.PANTALLA){
                panelDescripcion.style.display = 'none';
                panelAndante.classList.replace('posA','posB');
                contenedorBtns.classList.replace('posBtnA','posBtnB');
                this.movePosition(posCamera,posControl);
                //play animations pantalla 
               
            }else if(positionsKeys[i]==this.nombres.REDES){
                panelDescripcion.style.display = 'none';
                panelAndante.classList.replace('posA','posB');
                contenedorBtns.classList.replace('posBtnA','posBtnB');
                this.movePosition(posCamera,posControl);
                console.log("Redes"); 

            } else{
                panelAndante.classList.replace('posB','posA');
                contenedorBtns.classList.replace('posBtnB','posBtnA');
                
                this.movePosition(posCamera,posControl);
                this.setDescriptions(data.descripciones.find(e => e.titulo==name));
            }
        }


       
        

        

}