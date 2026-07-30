export function homePage(balance = 1000) {
  return `
    <div class="container">
      <div class="card">

        <h1 class="title">💎 CASINO X</h1>
        <div class="subtitle">Telegram Mini App</div>

        <div class="balance">
          💰 Баланс:
          <span id="balance">${balance}</span> ₽
        </div>

        <button id="slotsBtn">🎰 Слоты</button>
        <button id="diceBtn">🎲 Dice</button>
        <button id="crashBtn">🚀 Crash</button>
        <button id="minesBtn">💣 Mines</button>

      </div>
    </div>
  `
}
