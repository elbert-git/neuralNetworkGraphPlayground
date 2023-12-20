import { Line, Point } from "../data";

let m = 0
let b = 0
const learningRate = 0.00001
export function gradientDescentLoop(points:Array<Point>):Line{
  if(points.length < 2){return {m, b}}
  for (let index = 0; index < points.length; index++) {
    const point = points[index]
    const guess = m*point.x+b;
    const error = point.y - guess;
    m += error *point.x * learningRate
    b += error 
  }
  console.log({m, b})
  return {m, b}
}