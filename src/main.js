import "./style.css";

const tg = window.Telegram?.WebApp;

if (tg) {
  try {
    tg.ready();
    tg.expand();
  } catch (e) {
    console.error(e);
  }
}

const API = window.location.origin;

const userId = tg?.initDataUnsafe?.user?.id || 1;
const username = tg?.initDataUnsafe?.user?.username || "";
const firstName = tg?.initDataUnsafe?.user?.first_name || "";

let balance = 1000;

const app = document.querySelector("#app");

app.innerHTML = `
<div class="container">
  <div class="card">

    <div class="title">💎 КАЗИНО X</div>

    <div class="subtitle">
      Мини-приложение Telegram
    </div>

    <div class="balance">
      💰 Баланс:
      <span id="balance">...</span> ₽
    </div>

    <div id="result" class="result">
      Загрузка...
    </div>

    <button id="slotsBtn">🎰 Слоты</button>
    <button id="diceBtn">🎲 Игральные кости</button>
    <button id="crashBtn">🚀 Crash</button>
    <button id="minesBtn">💣 Mines</button>

  </div>
</div>
`;

const balanceEl = document.getElementById("balance");
const resultEl = document.getElementById("result");

function updateBalanceView() {
  balanceEl.textContent = balance;
}

async function loadProfile() {
  try {
    const res = await fetch(
      `${API}/api/profile/${userId}?username=${encodeURIComponent(username)}&firstName=${encodeURIComponent(firstName)}`
    );

    const data = await res.json();

    if (data.success) {
      balance = data.user.balance;
      updateBalanceView();
      resultEl.textContent = `Добро пожаловать, ${data.user.firstName || "Игрок"}!`;
    }
  } catch (e) {
    console.error(e);
    resultEl.textContent = "Ошибка соединения";
  }
}

async function saveBalance() {
  try {
    await fetch(`${API}/api/profile/balance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: userId,
        balance
      })
    });
  } catch (e) {
    console.error(e);
  }
}

document.getElementById("slotsBtn").onclick = async () => {

  if (Math.random() < 0.4) {
    balance += 200;
    resultEl.textContent = "🎰 Джекпот! +200 ₽";
  } else {
    balance -= 100;
    resultEl.textContent = "😢 Проигрыш -100 ₽";
  }

  updateBalanceView();
  await saveBalance();
};

document.getElementById("diceBtn").onclick = async () => {

  const roll = Math.floor(Math.random() * 6) + 1;

  if (roll >= 5) {
    balance += 300;
    resultEl.textContent = `🎲 Выпало ${roll}. +300 ₽`;
  } else {
    balance -= 100;
    resultEl.textContent = `🎲 Выпало ${roll}. -100 ₽`;
  }

  updateBalanceView();
  await saveBalance();
};

document.getElementById("crashBtn").onclick = async () => {

  const x = (Math.random() * 4 + 1).toFixed(2);

  if (Math.random() < 0.5) {
    const win = Math.floor(Number(x) * 100);
    balance += win;
    resultEl.textContent = `🚀 x${x} +${win} ₽`;
  } else {
    balance -= 100;
    resultEl.textContent = "💥 Краш! -100 ₽";
  }

  updateBalanceView();
  await saveBalance();
};

document.getElementById("minesBtn").onclick = async () => {

  if (Math.random() < 0.3) {
    balance += 600;
    resultEl.textContent = "💎 Алмаз! +600 ₽";
  } else {
    balance -= 100;
    resultEl.textContent = "💣 Бомба! -100 ₽";
  }

  updateBalanceView();
  await saveBalance();
};

loadProfile();
