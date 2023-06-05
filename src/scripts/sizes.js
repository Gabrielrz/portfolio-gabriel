export default class Sizes{
    constructor(){
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspect = this.width/this.height;
        this.pixelRatio = Math.min(window.devicePixelRatio *0.75 ,2);
        this.fov = this.getFov;
        this.isMovil = (window.innerWidth<=767)? true:false;
        this.far = this.getFar;
    }
    onResize(render,camera){
        render.setPixelRatio(this.pixelRatio);
        render.setSize( this.width, this.height );
        camera.aspect = this.aspect;
        console.log("pixelRatio",this.pixelRatio);
        window.addEventListener("resize",()=>{
            
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.aspect = this.width/this.height;
            this.pixelRatio =  Math.min(window.devicePixelRatio,2);
            render.setPixelRatio(this.pixelRatio);
            render.setSize( this.width, this.height );
            camera.aspect = this.aspect;
            camera.updateProjectionMatrix();
           
        })
    }

    get getFov(){
        return (this.isMovil)? 75 : 45;
    }
    
    get getFar(){
        return (this.isMovil)? 150 : 100;
    }
}