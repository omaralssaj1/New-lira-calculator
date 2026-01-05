let currentLang = "ar";

const texts = {
  ar: {
    title: "💰 حاسبة الليرة الجديدة",
    subtitle: "حط مبلغ الفاتورة، ونحن منحسبها عنك 😌",
    placeholder: "مثال: 12345",
    calcBtn: "احسبلي",
    give: "أعطي البائع هالفئات 👇",
    after: "👉 المبلغ بعد إزالة صفرين:",
    invalid: "❌ دخيلك حط رقم مظبوط",
    remain: "⚠️ ضل",
    oldPay: "👉 هاد بيندفع بالعملة القديمة:",
    extra: "🔁 كمان في باقي:"
  },
  en: {
    title: "💰 New Lira Calculator",
    subtitle: "Enter the bill amount and we’ll calculate it for you 😊",
    placeholder: "Example: 12345",
    calcBtn: "Calculate",
    give: "Give the seller these bills 👇",
    after: "👉 Amount after removing two zeros:",
    invalid: "❌ Please enter a valid number",
    remain: "⚠️ Remaining",
    oldPay: "👉 Pay this in old currency:",
    extra: "🔁 Extra remainder:"
  }
};

function toggleLang() {
  currentLang = currentLang === "ar" ? "en" : "ar";

  document.getElementById("title").innerText = texts[currentLang].title;
  document.getElementById("subtitle").innerText = texts[currentLang].subtitle;
  document.getElementById("amount").placeholder = texts[currentLang].placeholder;
  document.getElementById("calcBtn").innerText = texts[currentLang].calcBtn;
  document.getElementById("langBtn").innerText =
    currentLang === "ar" ? "EN" : "AR";

  document.getElementById("result").innerHTML = "";
}

function calculate() {
  const amount = Number(document.getElementById("amount").value.trim());
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  if (!Number.isFinite(amount) || amount <= 0) {
    resultDiv.innerHTML = texts[currentLang].invalid;
    return;
  }

  let newAmount = Math.floor(amount / 100);
  let remainderOld = amount % 100;

  const bills = [
    { value: 500, emoji: "🌾", class: "bill-500" },
    { value: 200, emoji: "🫒", class: "bill-200" },
    { value: 100, emoji: "🌺", class: "bill-100" },
    { value: 50, emoji: "🍊", class: "bill-50" },
    { value: 25, emoji: "🫐", class: "bill-25" },
    { value: 10, emoji: "🌸", class: "bill-10" }
  ];

  resultDiv.innerHTML += `
    <div class="result-box">
      ${texts[currentLang].after} <strong>${newAmount}</strong>
    </div>
    <h3>${texts[currentLang].give}</h3>
  `;

  bills.forEach(bill => {
    let count = Math.floor(newAmount / bill.value);
    if (count > 0) {
      resultDiv.innerHTML += `
        <div class="bill ${bill.class}">
          ${bill.emoji} ${bill.value} × ${count}
        </div>
      `;
      newAmount %= bill.value;
    }
  });

  if (newAmount > 0) {
    resultDiv.innerHTML += `
      <div class="note">
        ${texts[currentLang].remain} ${newAmount}<br>
        ${texts[currentLang].oldPay} ${newAmount * 100}
      </div>
    `;
  }

  if (remainderOld > 0) {
    resultDiv.innerHTML += `
      <div class="note">
        ${texts[currentLang].extra} ${remainderOld}
      </div>
    `;
  }
}

function toggleDark() {
  document.body.classList.toggle("dark");
}
