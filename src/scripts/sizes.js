export default class Sizes{
    constructor(){
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspect = this.width/this.height;
        this.pixelRatio = Math.min(window.devicePixelRatio,2);
       
    }
    onResize(render,camera){
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
}