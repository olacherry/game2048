document.addEventListener('DOMContentLoaded', () =>  {
  const gridDisplay = document.querySelector('.grid')
  const scoreDisplay = document.getElementById('score')
  const resultDisplay = document.getElementById('result')
  var squares = []
  const width = 4
  var score = 0
  let isAbleToMove
  let yes
  let rowChecker = function(arr){
    let ar1 = []
    let k = 0
    for(let i = 0; i < 4; i++){
      for(let j = k; j < k+4;j++){
        if(j+1>=k+4) continue
        if(arr[j] != arr[j+1]) ar1.push(false)
      }
      k+=4
    }
    let n = 0
    ar1.forEach(elem => {
      if(elem!=true){
        n++
      }
    })
    if(n == 12){
      yes = 'lose'
      return true
    }else return false
  }
  let colChecker = function(arr){
  let ar1 = []
  let k = 0
  for(let i = 0; i < 4; i++){
    for(let j = k; j < k+12; j+=4){
      if(j+4>k+12) continue
      if(arr[j] !== arr[j+4]) ar1.push(false)
    }
    k+=1
  }
  let n = 0
  ar1.forEach(elem => {
    if(elem!=true){
      n++
    }
  })
  if(n == 12){
    yes = 'lose'
    return true
  }else return false
}

  //создание игровой доски
  function createBoard() {   
    for (var i=0; i < width*width; i++) {
      square = document.createElement('div')
      square.innerHTML = 0
      gridDisplay.appendChild(square)
      squares.push(square)
    }
    generate()
    generate()
  }
  createBoard()


  //генерация чисел
  function generate() {

    randomNumber = Math.floor(Math.random() * squares.length)
    if (squares[randomNumber].innerHTML == 0) {
      var random  = Math.random()
      if (random < 0.75) {
        squares[randomNumber].innerHTML = 2
      }
      else squares[randomNumber].innerHTML = 4
      checkForGameOver()
    } else generate()

  }


  // перемещение вправо
  function moveRight() {
    for (var i=0; i < width*width; i++) {
      if (i % 4 === 0) {
        var totalOne = squares[i].innerHTML
        var totalTwo = squares[i+1].innerHTML
        var totalThree = squares[i+2].innerHTML
        var totalFour = squares[i+3].innerHTML
        var row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

        var filteredRow = row.filter(num => num)
        var missing = 4 - filteredRow.length
        var zeros = Array(missing).fill(0)
        var newRow = zeros.concat(filteredRow)

        squares[i].innerHTML = newRow[0]
        squares[i +1].innerHTML = newRow[1]
        squares[i +2].innerHTML = newRow[2]
        squares[i +3].innerHTML = newRow[3]
      }
    }
  }
  //перемещение влево
  function moveLeft() {
    for (let i=0; i < width*width; i++) {
      if (i % 4 === 0) {
        var totalOne = squares[i].innerHTML
        var totalTwo = squares[i+1].innerHTML
        var totalThree = squares[i+2].innerHTML
        var totalFour = squares[i+3].innerHTML
        var row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

        var filteredRow = row.filter(num => num)
        var missing = 4 - filteredRow.length
        var zeros = Array(missing).fill(0)
        var newRow = filteredRow.concat(zeros)

        squares[i].innerHTML = newRow[0]
        squares[i +1].innerHTML = newRow[1]
        squares[i +2].innerHTML = newRow[2]
        squares[i +3].innerHTML = newRow[3]
      }
    }
  }

  //перемещение вверх
  function moveUp() {
    for (var i=0; i < width; i++) {
      var totalOne = squares[i].innerHTML
      var totalTwo = squares[i+width].innerHTML
      var totalThree = squares[i+(width*2)].innerHTML
      var totalFour = squares[i+(width*3)].innerHTML
      var column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

      var filteredColumn = column.filter(num => num)
      var missing = 4 - filteredColumn.length
      var zeros = Array(missing).fill(0)
      var newColumn = filteredColumn.concat(zeros)

      squares[i].innerHTML = newColumn[0]
      squares[i +width].innerHTML = newColumn[1]
      squares[i+(width*2)].innerHTML = newColumn[2]
      squares[i+(width*3)].innerHTML = newColumn[3]
    }
  }
  //перемещение вниз
  function moveDown() {
    for (var i=0; i < width; i++) {
      var totalOne = squares[i].innerHTML
      var totalTwo = squares[i+width].innerHTML
      var totalThree = squares[i+(width*2)].innerHTML
      var totalFour = squares[i+(width*3)].innerHTML
      var column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

      var filteredColumn = column.filter(num => num)
      var missing = 4 - filteredColumn.length
      var zeros = Array(missing).fill(0)
      var newColumn = zeros.concat(filteredColumn)

      squares[i].innerHTML = newColumn[0]
      squares[i +width].innerHTML = newColumn[1]
      squares[i+(width*2)].innerHTML = newColumn[2]
      squares[i+(width*3)].innerHTML = newColumn[3]
    }
  }
  // собрание строк
  function combineRow() {
    for (var i =0; i < 15; i++) {
      if (squares[i].innerHTML === squares[i + 1].innerHTML) {
       var combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML)
        squares[i].innerHTML = combinedTotal
        squares[i +1].innerHTML = 0
        score += combinedTotal
        scoreDisplay.innerHTML = score
      }
    }
    checkForWin()
  }
  //собирание столбцов
  function combineColumn() {
    for (var i =0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i + width].innerHTML) {
        var combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML)
        squares[i].innerHTML = combinedTotal
        squares[i + width].innerHTML = 0
        score += combinedTotal
        scoreDisplay.innerHTML = score
      }
    }
    checkForWin()
  }

  //функции для клавиш
  function control(e) {
    if(e.keyCode === 37) {
      isAbleToMove = false
      keyLeft()
    } else if (e.keyCode === 38) {
      isAbleToMove = false
      keyUp()
    } else if (e.keyCode === 39) {
      isAbleToMove = false
      keyRight()
    } else if (e.keyCode === 40) {
      isAbleToMove = false
      keyDown()
    }
  }
  document.addEventListener('keyup', control)

  //функции для клавиш 
  function keyRight() {
    moveRight()
    combineRow()
    moveRight()
    generate()
    checkForGameOver()
    isAbleToMove = true
  }

  function keyLeft() {
    moveLeft()
    combineRow()
    moveLeft()
    generate()
    checkForGameOver()
    isAbleToMove = true
  }

  function keyUp() {
    moveUp()
    combineColumn()
    moveUp()
    generate()
    checkForGameOver()
    isAbleToMove = true
  }

  function keyDown() {
    moveDown()
    combineColumn()
    moveDown()
    generate()
    checkForGameOver()
    isAbleToMove = true
  }

  //проверка наличия 2048 и победы
  function checkForWin() {
    for (var i=0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        resultDisplay.innerHTML = 'You WIN'
        document.removeEventListener('keyup', control)
        setTimeout(() => clear(), 3000)
      }
    }
  }

  
  function checkForGameOver() {
    var zeros = 0
    for (var i=0; i < width*width; i++) {
      if (squares[i].innerHTML == 0) {
        zeros++
      }
    }
    let temp = []
    for(let i = 0; i<16;i++){
      temp.push(parseInt(squares[i].innerHTML))
    }
    if(zeros===0){
      if(colChecker(temp)){
        if(rowChecker(temp)){
          resultDisplay.innerHTML = 'You lose'
          document.removeEventListener('keyup', control)
          setTimeout(() => clear(), 3000)
        }
      }  
    }
    
  }

 
  function clear() {
   clearInterval(myTimer)
  }


  //цвета
  function addColours() {
    for (var i=0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#ffffff'
      else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = '#6c9a8b'
      else if (squares[i].innerHTML  == 4) squares[i].style.backgroundColor = '#504B43' 
      else if (squares[i].innerHTML  == 8) squares[i].style.backgroundColor = '#b56576' 
      else if (squares[i].innerHTML  == 16) squares[i].style.backgroundColor = '#eed2cc' 
      else if (squares[i].innerHTML  == 32) squares[i].style.backgroundColor = '#6c698d' 
      else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = '#6a5d7b' 
      else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = '#5d4e6d' 
      else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = '#4f345a' 
      else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = '#571f4e' 
      else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = '#3b1c32' 
      else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor = '#fcfc62' 
    }
}
addColours()

var myTimer = setInterval(addColours, 50)

/////////////////////////////



//////////////////////


})
