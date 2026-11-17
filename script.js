/* ============================================================
   НАЛАШТУВАННЯ — змінюй тільки ці три значення
   ============================================================ */
const CONFIG = {
  label: "Стёпа не выплачивает долг уже:",      // текст зверху (малий шрифт)
  startDate: "2026-09-14",  // дата відліку у форматі РРРР-ММ-ДД
  amount: 1331.98,             // число знизу (покажеться з символом ₽)
};
/* ============================================================ */

/* Список шрифтів для випадкової зміни щосекунди */
const FONTS = [
  "Anton",
  "Barlow Condensed",
  "Bebas Neue",
  "Caveat",
  "Cinzel",
  "Comfortaa",
  "Cormorant Garamond",
  "Fira Sans",
  "Golos Text",
  "Instrument Serif",
  "JetBrains Mono",
  "Kanit",
  "Lobster",
  "Lora",
  "Manrope",
  "Merriweather",
  "Montserrat",
  "Nunito",
  "Onest",
  "Oswald",
  "Pacifico",
  "Playfair Display",
  "Poppins",
  "PT Sans",
  "Raleway",
  "Roboto",
  "Rubik",
  "Space Mono",
  "Syne",
  "Ubuntu",
  "Unbounded",
];

const labelEl = document.getElementById("label");
const daysEl = document.getElementById("days");
const amountEl = document.getElementById("amount");

/* ---------- Підрахунок днів від дати ---------- */
function daysSince(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);

  if (!year || !month || !day) return 0;

  const startUTC = Date.UTC(year, month - 1, day);
  const now = new Date();
  const todayUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

  // +1 — якщо хочеш, щоб день старту рахувався як перший
  return Math.max(0, Math.floor((todayUTC - startUTC) / 86_400_000));
}

/* ---------- Форматування суми: 1 500 ₽ ---------- */
function formatAmount(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "0 ₽";

  return (
    number.toLocaleString("ru-RU", {
      maximumFractionDigits: 2,
    }) + " ₽"
  );
}

/* ---------- Оновлення вмісту ---------- */
function render() {
  daysEl.textContent = String(daysSince(CONFIG.startDate));
}

labelEl.textContent = CONFIG.label;
amountEl.textContent = formatAmount(CONFIG.amount);
render();

/* ---------- Випадковий шрифт щосекунди ---------- */
let currentFont = null;

function randomFont() {
  if (FONTS.length === 0) return;

  let next = currentFont;
  while (next === currentFont && FONTS.length > 1) {
    next = FONTS[Math.floor(Math.random() * FONTS.length)];
  }
  currentFont = next;

  document.documentElement.style.setProperty(
    "--font",
    `"${next}", system-ui, sans-serif`
  );
}

/* Попередньо завантажуємо шрифти, щоб не було "стрибків" */
if (document.fonts && document.fonts.load) {
  FONTS.forEach((font) => {
    document.fonts.load(`700 16px "${font}"`).catch(() => {});
    document.fonts.load(`400 16px "${font}"`).catch(() => {});
  });
}

randomFont();
setInterval(randomFont, 1000);

/* Дні оновлюємо теж щосекунди, щоб число змінилось опівночі */
setInterval(render, 1000);
