const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')

const score = document.querySelector(".score--value")

const start = document.querySelector('.start')
const gameOver = document.querySelector('.game-over')

audioStart = new Audio('./assets/audio.mp3')
audioGameOver = new Audio('./assets/audio_gameover.mp3')
alert("Aperte 'ENTER' para iniciar o jogo.")


const startGame = () => {
  pipe.classList.add('pipe-animation')
  start.style.display = 'none'


  audioStart.play()
}

const incrementScore = () => {
  score.innerText = +score.innerText + 10
}

const restartGame = () => {
  gameOver.style.display = 'none'
  pipe.style.left = ''
  pipe.style.right = '0'
  mario.src = './imagens/mario.gif'
  mario.style.width = '150px'
  mario.style.bottom = '0'
  score.innerText = "00"

  start.style.display = 'none'

  audioGameOver.pause()
  audioGameOver.currentTime = 0;

  audioStart.play()
  audioStart.currentTime = 0;

}

const jump = () => {
  mario.classList.add('jump')

  setTimeout(() => {
    mario.classList.remove('jump', incrementScore())
  }, 800)
}

const loop = () => {
  setInterval(() => {
    const pipePosition = pipe.offsetLeft
    const marioPosition = window
      .getComputedStyle(mario)
      .bottom.replace('px', ' ')

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      pipe.classList.remove('.pipe-animation')
      pipe.style.left = `${pipePosition}px`

      mario.classList.remove('.jump')
      mario.style.bottom = `${marioPosition}px`

      mario.src = './imagens/game-over.png'
      mario.style.width = '80px'
      mario.style.marginLeft = '50px'


      function stopAudioStart() {
        audioStart.pause()
      }
      stopAudioStart()

      audioGameOver.play()

      function stopAudio() {
        audioGameOver.pause()
      }
      setTimeout(stopAudio, 7000)

      gameOver.style.display = 'flex'
      finalScore.innerText = score.innerText
      score.classList.remove('.incrementScore')

      clearInterval(loop)
    }
  }, 10)
}

loop()

document.addEventListener('keypress', e => {
  const tecla = e.key
  if (tecla == ' ') {
    jump()
  }
})

document.addEventListener('touchstart', e => {
  if (e.touches.length) {
    jump()
  }
})

document.addEventListener('keypress', e => {
  const tecla = e.key
  if (tecla == 'Enter') {
    startGame()
  }
})