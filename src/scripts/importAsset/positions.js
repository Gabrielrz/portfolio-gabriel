

import * as THREE from 'three';
export default class Positions{



constructor(){
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

    get positionsAll(){
        return {
            Fiatec:{
                camera:{
                    x: -3.582812128204559, y: 2.9432650000000002, z: -10.60583925959132
                },
                control:{
                    x:3.206183692779136,y: 2.9432653546638448,z:-12.111850226020714
                    
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
                    x: -12.47536873533032, y: 3.596488901640873, z: -0.4257710414732957
                },
                control:{
                    x: -14.322781602421575, y: 3.639016390359339, z: 0.6482899617137626
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

    get getPositionAnimationPuerta(){
        return {
            positionA:{
                x: -6.644028133552617,
                y: 4.919397648836947,
                z: -45.914309040631046
            },
            positionB:{
                x : -3.4902975078738496,
                y : 2.620853063094791,
                z : -22.150615326588
            },
            positionC:{
                x : -13.710827954581813,
                y : 18.258628769152367,
                z : -1.1853559920480
            }
        }
    }

}