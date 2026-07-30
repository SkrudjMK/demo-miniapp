import './style.css'

let balance = 1000

const app = document.querySelector('#app')

app.innerHTML = `
<div class="container">
  <div class="card">

    <div class="title">💎 КАЗИНО X</div>
    <div class="subtitle">Мини-приложение Telegram</div>

    <div class="balance">
      💰 Баланс:
      <span id="balance">${balance}</span> ₽
    </div>

    <div class="result" id="result">
      Выберите игру
    </div>

    <button id="slotsBtn">🎰 Слоты</button>
    <button id="diceBtn">🎲 Игральные кости</button>
    <button id="crashBtn">🚀 Авария</button>
    <button id="minesBtn">💣 Мины</button>

  </div>
</div>
`

const balanceEl = document.querySelector('#balance')
const resultEl = document.querySelector('#result')

function update() {
  balanceEl.textContent = balance
}

document.querySelector('#slotsBtn').onclick = () => {
  if (Math.random() < 0.4) {
    balance += 200
    resultEl.textContent = "🎰 Джекпот! +200 ₽"
  } else {
    balance -= 100
    resultEl.textContent = "😢 Проигрыш -100 ₽"
  }
  update()
}

document.querySelector('#diceBtn').onclick = () => {
  const roll = Math.floor(Math.random() * 6) + 1

  if (roll >= 5) {
    balance += 300
    resultEl.textContent = `🎲 Выпало ${roll}. Победа +300 ₽`
  } else {
    balance -= 100
    resultEl.textContent = `🎲 Выпало ${roll}. Проигрыш -100 ₽`
  }

  update()
}

document.querySelector('#crashBtn').onclick = () => {
  const x = (Math.random() * 4 + 1).toFixed(2)

  if (Math.random() < 0.5) {
    const win = Math.floor(x * 100)
    balance += win
    resultEl.textContent = `🚀 x${x} +${win} ₽`
  } else {
    balance -= 100
    resultEl.textContent = "💥 Краш! -100 ₽"
  }

  update()
}

document.querySelector('#minesBtn').onclick = () => {
  if (Math.random() < 0.3) {
    balance += 600
    resultEl.textContent = "💎 Нашёл алмаз! +600 ₽"
  } else {
    balance -= 100
    resultEl.textContent = "💣 Бомба! -100 ₽"
  }

  update()
}

update()
