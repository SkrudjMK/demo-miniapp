import './style.css'

const app = document.querySelector('#app')

let balance = 1000

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
    resultEl.textContent = "🎉 Слоты: +200 ₽"
  } else {
    balance -= 100
    resultEl.textContent = "😢 Слоты: -100 ₽"
  }
  update()
}

document.querySelector('#diceBtn').onclick = () => {
  const dice = Math.floor(Math.random() * 6) + 1

  if (dice >= 5) {
    balance += 300
    resultEl.textContent = `🎲 Выпало ${dice}. +300 ₽`
  } else {
    balance -= 100
    resultEl.textContent = `🎲 Выпало ${dice}. -100 ₽`
  }
  update()
}

document.querySelector('#crashBtn').onclick = () => {
  const x = (Math.random() * 5).toFixed(2)

  if (x > 2) {
    balance += 500
    resultEl.textContent = `🚀 x${x} — выигрыш +500 ₽`
  } else {
    balance -= 100
    resultEl.textContent = `💥 x${x} — проигрыш`
  }
  update()
}

document.querySelector('#minesBtn').onclick = () => {
  if (Math.random() < 0.3) {
    balance += 600
    resultEl.textContent = "💎 Нашёл алмаз! +600 ₽"
  } else {
    balance -= 100
    resultEl.textContent = "💣 Бомба!"
  }
  update()
}
