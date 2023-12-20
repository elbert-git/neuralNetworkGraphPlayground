import './style.css'
import Canvas from './canvas/canvas'
import { Point } from './data';
import NeuralNetwork from './NeuralNetwork/neuralNetwork';

const c = new Canvas(document.getElementById('canvas') as HTMLCanvasElement);

let points:Array<Point> = [];

const resolution = 50
for (let yIndex = 0; yIndex < resolution; yIndex++) {
  const rowOfPoints = []
  const incrementY = 500/resolution
  for (let xIndex = 0; xIndex < resolution; xIndex++) {
    const incrementX = 500/resolution
    const point:Point = {
      x: (incrementX*xIndex)-250,
      y: (incrementY*yIndex)-250
    }
    points = [...points, point]
  }
}

const nn = new NeuralNetwork([2,2,1]);

const loop = ()=>{
  // clear screen
  c.clearScreen();
  c.drawGraph();
  // draw points and dots
  points.forEach((point)=>{
    // draw points and teh correct answer
    let col = 'green'
    let correctOutput = 1
    // color in correct ansers
    const xIsPos = point.x >= 0
    const yIsPos = point.y >= 0
    if((xIsPos && yIsPos)||(!xIsPos&&!yIsPos)){
      col = 'red'
      correctOutput = -1
    }
    // get correct value 
    // draw correct answer
    c.drawRing(point, col);

    // draw in guesses
    col = 'red'
    const nnOutput = nn.feedForward([point.x, point.y]);
    if(nnOutput[0]>0){
      col='green'
    } 
    c.drawDot(point, col)
    // back prop
    const errors = nnOutput.map((guess)=>{return correctOutput - guess}) // get error
    nn.backProp(errors)
  })
}

setInterval(loop, 1000/10);

c.elCanvas.addEventListener('pointerdown', (e)=>{
  const point = {x:e.clientX, y:e.clientY}
  points.push(Canvas.mapPointToGraphSpace(point))
})

