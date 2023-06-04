

import * as THREE from 'three';
export default class Positions{



constructor(){
    this.isMovil = (window.innerWidth<=767)? true : false;
    this.positionCameraFiatec = new THREE.Vector3();
    this.positionCameraGlapp = new THREE.Vector3();
    this.positionCameraSandfirg = new THREE.Vector3();
    this.positionCameraDualad = new THREE.Vector3();
    this.positionCameraPantalla = new THREE.Vector3();
    this.positionCameraPuerta = new THREE.Vector3();
    this.positionCameraRedes = new THREE.Vector3();
    
    this.positionControlsFiatec = new THREE.Vector3();
    this.positionControlsGlapp = new THREE.Vector3();
    this.positionControlsSandfirg = new THREE.Vector3();
    this.positionControlsDualad = new THREE.Vector3();
    this.positionControlsPantalla = new THREE.Vector3();
    this.positionControlsPuerta = new THREE.Vector3();
    this.positionControlsRedes =  new THREE.Vector3();

    this.initPositionPuerta();
    this.initPositionFiatec();
    this.initPositionGlapp();
    this.initPositionDualad();
    this.initPositionPantalla();
    this.initPositionSandfirg();
    this.initPositionRedesSociales();
}


    get getPositions(){
        return (this.isMovil)? this.positionAllMovil : this.positionsAll;
    }

    get positionsAll(){
        return {
            Fiatec:{
                camera:{
                    x: -7.038333446059868, y: 2.9432650000000002, z: -9.89224053190961
                },
                control:{
                    x: 3.1949902199125497, y: 2.943265, z: -12.162310805557553
                    
                },
            },
            Glapp:{
                camera:{
                    x:5.215815041745592, y:1.979653578285198,z:-7.358325160878048
                },
                control:{
                    x:9.42175135941407,y: 2.0084266168931655,z:-8.590386454919361
                },
            },
            Sandfirg:{
                camera:{
                    x:8.026155264484329, y:2.8609683370690173,z: -0.6554761826557427
                },
                control:{
                    x:17.573847198499873, y:1.998031132252285, z:2.038651594657696
                },
            },
            Dualad:{
                camera:{
                    x:7.479435659607898, y:2.781653264560707, z:4.3313986683842
                },
                control:{
                    x:10.293011618689341, y:0.8000634014321759, z:21.496831047313755
                },
            },
            Redes:{
                camera:{
                    x:-2.220265443247304, y:5.098488961909572,  z:8.284183468578718
                },
                control:{
                    x:-1.9663819951559571, y:-1.6672608519176593,  z:16.996494641821972
                },
            },
            Pantalla:{
                camera:{
                    x: -10.533839707178833, y: 3.639016034968549, z: -1.5545561220910207
                },
                control:{
                    x: -14.322788536434675, y: 3.639016, z: 0.6483029578445253
                },
            }
           
        }
    }

    /**
     * @description: retorna posiciones de objeto gltf de ordenador o de movil
     */
    get positionInitialMuseum(){
        return (this.isMovil)?
        {
            camera:{
           
                x: -58.66997689380321, y: 35.203802463231, z: -64.25216396773303
            },
            control:{
                x: 8.467392886100287, y: 7.5, z: 4.176636347739419
            }
            
        } : {    
            camera:{
                x: -39.19049539144472, y:7.5000000000000036,z: -37.552257315714535
            },
            control:{
                x:6.399150639907137,y: 7.5,z: -3.7418137048768547
            } 
        };
    }
    

    get positionDefault(){

        return (this.isMovil)?
        {
            camera:{
                x: -9.491112661872162, y: 5.123831549763967, z: -17.613935912088778
            },
            control:{
                x: 11.648782, y: 1.998031, z: -2.282084
            }
        } : { 
            camera:{
                x: -14.983991681674803, y: 9.874585199056833, z: -15.320982876944957
             },
             control:{
                 x: -0.8500769951997256, y: 2.943265, z: -3.7952346773503307
             } 
        };
    }

    get positionAllMovil(){
        return {
            Fiatec:{
                camera:{
                    x: -7.82146225329732, y: 7.453372451381586, z: -8.384296908944744
                },
                control:{
                    x: -3.41291, y: 2.943265, z: -12.100001
                    
                },
            },
            Glapp:{
                camera:{
                    x: 4.190261328963036, y: 4.560462506262811, z: -8.497256253194209
                },
                control:{
                    x: 7.751666683483975, y: 2.008427, z: -10.59171334736046
                },
            },
            Sandfirg:{
                camera:{
                    x: 7.521181635431068, y: 4.505864116278992, z: -2.788970666037865
                },
                control:{
                    x: 11.64878244209455, y: 1.998031, z: -2.282083768777187
                },
            },
            Dualad:{
                camera:{
                    x: 10.584763865822453, y: 4.8754621497128126, z: 3.31235518998459
                },
                control:{
                    x: 11.878888746471237, y: 0.800063, z: 9.722344343611086
                },
            },
            Redes:{
                camera:{
                    x: -2.147200671964375, y: 6.585483486116932, z: 8.600024633947655
                },
                control:{
                    x: -2.068059827201672, y: -1.667261, z: 13.223781415932034
                },
            },
            Pantalla:{
                camera:{
                    x: -11.179684026325337, y: 3.948693459214053, z: -0.7317550961237069
                },
                control:{
                    x: -21.405861502715073, y: 3.639016, z: 4.766074661150516
                },
            }
        }
    }

    initPositionFiatec(){
        this.positionCameraFiatec.set( -6.024291991615126, 2.6289599215062975, -10.06424284466638);
        this.positionControlsFiatec.set(3.206183692779136, 2.9432653546638448,-12.111850226020714);
        //controls x: -1.0255178480931886, y: 2.77138265104389, z: -11.445149090635786
    }

    initPositionGlapp(){
        this.positionCameraGlapp.set( 5.215815041745592, 1.979653578285198,-7.358325160878048);
        this.positionControlsGlapp.set( 9.42175135941407, 2.0084266168931655,-8.590386454919361);
    }

    initPositionSandfirg(){
        this.positionCameraSandfirg.set( 8.026155264484329, 2.8609683370690173, -0.6554761826557427);
        this.positionControlsSandfirg.set( 17.573847198499873, 1.998031132252285, 2.038651594657696);
    }
    initPositionDualad(){
        this.positionCameraDualad.set( 7.479435659607898, 2.781653264560707, 4.3313986683842);
        this.positionControlsDualad.set( 10.293011618689341, 0.8000634014321759, 21.496831047313755);
    }

    initPositionPantalla(){
        this.positionCameraPantalla.set( -12.132126156869194, 3.3400360304461243,  1.92568282467034);
        this.positionControlsPantalla.set( -13.141929766015526, 3.3838005671179516,  2.3525696026277014);
    }
    
    initPositionRedesSociales(){
        this.positionCameraRedes.set( -2.220265443247304, 5.098488961909572,  8.284183468578718);
        this.positionControlsRedes.set( -1.9663819951559571, -1.6672608519176593,  16.996494641821972);
    }

    initPositionPuerta(){
        this.positionCameraPuerta.set(-5,3,-22);
        this.positionControlsPuerta.set(0,1,1);
    }

    getPositionCameraPuerta(){
        return this.positionCameraPuerta;
    }
    getPositionControlsPuerta(){
        return this.positionControlsPuerta;
    }



    get mainAnimation(){
        return {
            pA:{
                camera:{x: -6.801559180952308, y: 3.7853283547482937, z: -35.34733560275399},
                control:{x: -1.7293485830633455, y: 3.7853283547482923, z: -11.936931657072495}
            },
            pB:{
                camera:{x : -3.4902975078738496,y : 2.620853063094791, z : -22.150615326588},
                control:{x: -0.24078244877407837, y: 4.146375468939455, z: -1.9753731441038642}
            },
            pC:{
                camera:{x : -13.710827954581813,y : 18.258628769152367,z : -1.1853559920480},
                control:{x: -0.24078244877407837, y: 4.146375468939455, z: -1.9753731441038642}
            }
        }
    }

}