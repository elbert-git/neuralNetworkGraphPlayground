import { Line, Point } from "../data";


const avg = (nums:Array<number>)=>{
  let total = 0
  nums.forEach((num)=>{total+=num;})
  return total/nums.length
}

export function produceLineByLeastSquares(points:Array<Point>):Line{
  const avgX = avg(points.map((point)=>{return point.x}))
  const avgY = avg(points.map((point)=>{return point.y}))
  let topM = 0
  let botM = 0
  points.forEach((point)=>{
    topM+=(point.x - avgX) * (point.y - avgY)
    botM+=(point.x - avgX) * (point.x - avgX)
  })
  const m = topM/botM
  return {
    m: m,
    b: avgY - (m*avgX)
  }
}