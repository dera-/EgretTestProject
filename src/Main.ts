class Main extends eui.UILayer {

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        console.log("Main");
    }
 
    private addToStage() {
        Game.init(this.stage);
        
        egret.startTick(this.tickLoop, this);
    }

    tickLoop(timeStamp:number):boolean{
        return false;
    }

}

class Game{

    static I : Game;
    static mainStage: egret.Stage;
    static height: number;
    static width: number;

    static init(stage:egret.Stage) {

        Game.I = this;
        Game.height = stage.stageHeight;
        Game.width  = stage.stageWidth;
        Game.mainStage = stage;       
        
        /* メソッドなどを記入*/
        new UILayer();
        new Hello();
        new Chara();
    }


}

class UILayer{

    static display: eui.UILayer = null;

    constructor(){
        this.initial();
    }

    initial(){
        UILayer.display = new eui.UILayer();
        Game.mainStage.addChild(UILayer.display);
    }


}

class UICompornent extends egret.DisplayObjectContainer{

    display: egret.DisplayObjectContainer = null;
    static compornents: UICompornent[] = [];

    constructor(){
        super();
        this.initial();
    }

    initial(){
        this.display = new egret.DisplayObjectContainer();
        UILayer.display.addChild(this.display);
        UICompornent.compornents.push(this);
    }

}

class Hello extends UICompornent{

    constructor(){
        super();
        this.method();
    }

    method(){
        let hello:eui.Label = new eui.Label();
        hello.text = "Hello World";
        this.display.addChild(hello);
        this.drawCircle();
        this.drawLine();
        this.drawRect();
    }

    private drawCircle() {
        // 円の描画
        let shape:egret.Shape = new egret.Shape();
        //lineStyle(枠線の太さ, 色); beginFillよりも先に書く
        shape.graphics.lineStyle(5, 0x008000);
 
        //beginFill ~ endFill の間に書かれた図形を色で塗りつぶす。
        shape.graphics.beginFill(0xff0000);
        shape.graphics.drawCircle(200, 200, 100);//drawCircle(x, y, 半径)
        shape.graphics.endFill();
 
        this.display.addChild(shape);
    }

    private drawRect() {
        let shape:egret.Shape = new egret.Shape();
        shape.graphics.lineStyle(5, 0x0000ff);
        shape.graphics.beginFill(0xff0000);
        shape.graphics.drawRect(200, 300, 200, 100);//drawRect(x, y, width, hight);
        shape.graphics.endFill();
        //四角形へのタッチを有効化
        shape.touchEnabled = true;
        shape.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {console.log("touch rect")}, this);
        this.display.addChild(shape);
    }

    private drawLine() {
        let shape:egret.Shape = new egret.Shape();
        shape.graphics.lineStyle(5, 0xffffff);
 
        //lineTo(始点)からmoveTo(終点)まで線を引く
        shape.graphics.moveTo(200, 300);
        shape.graphics.lineTo(500, 500);
        this.display.addChild(shape);
    }
}

class Chara extends UICompornent {
    constructor(){
        super();
        this.method();
    }

    method() {
        let sources:string[]= ["resource/blue_oni.png", "resource/red_oni.png"];
 
        let karen0 : eui.Image = new eui.Image();
        karen0.source = sources[0];
        this.display.addChild(karen0);
 
        let karen1 : eui.Image = new eui.Image();
        karen1.source = sources[1];
        karen1.x = 500;
        karen1.scaleX = 0.5;
        karen1.scaleY = 0.5;
        this.display.addChild(karen1);
    }
}
