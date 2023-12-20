export class Matrix{
  rows:number;
  columns:number
  matrix:Array<Array<number>>
  constructor(rows:number, columns:number){
    this.rows = rows;
    this.columns = columns
    this.matrix = Array(rows).fill(Array(columns).fill(0))
  }

  static fromArray(arr:Array<Array<number>>){
    const rows = arr.length;
    const columns = arr[0].length;
    const matrix = new Matrix(rows, columns)
    for (let rowIndex = 0; rowIndex<arr.length; rowIndex++) {
      matrix.matrix[rowIndex] = arr[rowIndex]
    }
    return matrix;
  }
  print(){
    console.table(this.matrix);
  }
  addWith(other:Matrix){
    // check if able to add
    if(this.rows !== other.rows || this.columns !== other.columns){
      console.error('shape error, matrix mismatch');
      return null
    }
    // actual adding
    const newArr:Array<Array<number>> = []
    for (let rowIndex = 0; rowIndex < this.rows; rowIndex++) { // every row
      const newRow:Array<number> = []
      for (let columnIndex = 0; columnIndex < this.columns; columnIndex++) { // every spot in row
        const a = this.matrix[rowIndex][columnIndex] + other.matrix[rowIndex][columnIndex]
        newRow.push(a)
      }
      newArr.push(newRow);
    }
    return Matrix.fromArray(newArr)
  }
  dotProductWith(other:Matrix){
    // check compatibility
    if(this.columns !== other.rows){console.error('shape error'); return}
    if(!(other instanceof Matrix)){console.error('not a matrix'); return}
    const otherMat:Matrix = other
    // actual operation
    const newArr:Array<Array<number>> = []
    for (let rowIndex = 0; rowIndex < this.rows; rowIndex++) { // every row
      const newRow:Array<number> = []
      for (let columnIndex = 0; columnIndex < otherMat.columns; columnIndex++) { // every spot in row
        console.log(`calcing spot ${rowIndex}, ${columnIndex}`)
        let sum = 0
        for (let spotIndex = 0; spotIndex < otherMat.rows; spotIndex++) { // for every row
          const a = this.matrix[rowIndex][spotIndex]
          const b = otherMat.matrix[spotIndex][columnIndex];
          console.log(`multiplying ${a} and ${b}`)
          sum+=a*b
        }
        newRow.push(sum)
      }
      newArr.push(newRow);
    }
    console.log(newArr)
    return Matrix.fromArray(newArr)
  }
  scalarWith(num:number){
    // actual adding
    const newArr:Array<Array<number>> = []
    for (let rowIndex = 0; rowIndex < this.rows; rowIndex++) { // every row
      const newRow:Array<number> = []
      for (let columnIndex = 0; columnIndex < this.columns; columnIndex++) { // every spot in row
        const a = this.matrix[rowIndex][columnIndex] * num
        newRow.push(a)
      }
      newArr.push(newRow);
    }
    return Matrix.fromArray(newArr)
  }
  transpose(){
    const newArr = []
    for (let colIndex = 0; colIndex < this.columns; colIndex++) {
      const newRow = []
      for (let rowIndex = 0; rowIndex < this.rows; rowIndex++) {
        newRow.push(this.matrix[rowIndex][colIndex])
      }
      newArr.push(newRow)
    }
    return Matrix.fromArray(newArr)
  }
  randomise(){
  }
}
