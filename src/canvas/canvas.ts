//! ----------------------------------------------
//! all data should always been graph space
//! ----------------------------------------------

import { Line, Point } from "../data";

const canvasConfigs = {
  xSize:500,
  ySize:500
}

export default class Canvas{
  elCanvas:HTMLCanvasElement;
  ctx:CanvasRenderingContext2D;
  constructor(el:HTMLCanvasElement){
    this.elCanvas = el;
    this.elCanvas.width = 500;this.elCanvas.height = 500;
    this.ctx = this.elCanvas.getContext('2d')!;
  }

  drawGraph(){
    const ctx = this.ctx;
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(250, 0);ctx.lineTo(250, 500);ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 250);ctx.lineTo(500, 250);ctx.stroke();
  }

  clearScreen(){
    const ctx = this.ctx;
    this.ctx.beginPath()
    ctx.rect(0, 0, canvasConfigs.xSize, canvasConfigs.ySize);
    ctx.fillStyle = 'white'
    ctx.fill()
  }

  drawDot(_point:Point, color="black"){
    const ctx = this.ctx;
    const point = Canvas.mapPointToScreenSpace(_point);
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.lineWidth = 2;
    ctx.arc(point.x, point.y, 5, 0, Math.PI*2)
    ctx.fill();
  }

  drawRing(_point:Point, color="black"){
    const ctx = this.ctx;
    const point = Canvas.mapPointToScreenSpace(_point);
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.arc(point.x, point.y, 6, 0, Math.PI*2)
    ctx.stroke();
  }
  
  drawLine(line:Line, color="black"){
    // construct 2 graphs space points
    const gpp1:Point = {x: -250, y: (line.m*-250)+line.b}
    const gpp2:Point = {x: 250, y: (line.m*250)+line.b}
    // map to screenspace
    const spp = [gpp1, gpp2].map(p=>Canvas.mapPointToScreenSpace(p))
    // draw
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(spp[0].x, spp[0].y);
    ctx.lineTo(spp[1].x, spp[1].y);
    ctx.strokeStyle = color;
    ctx.stroke();
  }

  drawLineBy2Dots(points:Array<Point>, color="black"){
    const spp = points.map(p=>Canvas.mapPointToScreenSpace(p))
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(spp[0].x, spp[0].y);
    ctx.lineTo(spp[1].x, spp[1].y);
    ctx.strokeStyle = color;
    ctx.stroke();
    
  }

  static mapPointToScreenSpace(point:Point):Point{
    return {
      x: point.x + 250,
      y: -point.y + 250
    }
  }

  static mapPointToGraphSpace(point:Point):Point{
    return {
      x: -250 + point.x,
      y: -point.y + 250
    }
  }
}