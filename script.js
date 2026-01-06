let lang = "ar";

function toggleDark() {
  document.body.classList.toggle("dark");
}

function toggleLang() {
  lang = lang === "ar" ? "en" : "ar";

  document.documentElement.lang = lang;
  document.body.style.direction = lang === "ar" ? "rtl" : "ltr";

  document.getElementById("title").innerText =
    lang === "ar" ? "💰 حاسبة الليرة الجديدة" : "💰 New Lira Calculator";

  document.getElementById("subtitle").innerText =
    lang === "ar"
      ? "حط مبلغ الفاتورة، ونحن منحسبها عنك 😌"
      : "Enter the bill amount and we’ll calculate it for you";

  document.getElementById("amount").placeholder =
    lang === "ar" ? "مثال: 12345" : "Example: 12345";

  document.getElementById("calcBtn").innerText =
    lang === "ar" ? "احسبلي" : "Calculate";

  document.getElementById("langBtn").innerText =
    lang === "ar" ? "EN" : "AR";

  document.getElementById("result").innerHTML = "";
}

function calculate() {
  const amount = Number(document.getElementById("amount").value);
  const result = document.getElementById("result");
  result.innerHTML = "";

  if (!amount || amount <= 0) {
    result.innerHTML = lang === "ar"
      ? "❌ دخيلك دخل رقم صحيح"
      : "❌ Please enter a valid number";
    return;
  }

  let value = Math.floor(amount / 100);

  const bills = [
    { v: 500, img: "images/500.png", c: "bill-500", e: "🌾" },
    { v: 200, img: "images/200.png", c: "bill-200", e: "🫒" },
    { v: 100, img: "images/100.png", c: "bill-100", e: "🌺" },
    { v: 50,  img: "images/50.png",  c: "bill-50",  e: "🍊" },
    { v: 25,  img: "images/25.png",  c: "bill-25",  e: "🫐" },
    { v: 10,  img: "images/10.png",  c: "bill-10",  e: "🌸" }
  ];

  result.innerHTML += `
    <div class="result-box">
      ${lang === "ar" ? "المبلغ بعد حذف صفرين:" : "Amount after removing two zeros:"}
      <strong>${value}</strong>
    </div>
  `;

  bills.forEach(b => {
    let count = Math.floor(value / b.v);
    if (count > 0) {
      result.innerHTML += `
        <div class="bill ${b.c}">
          <img src="${b.img}" alt="${b.v}">
          <div class="bill-text">${b.e} ${b.v} × ${count}</div>
        </div>
      `;
      value %= b.v;
    }
  });

  if (value > 0) {
    result.innerHTML += `
      <div class="note">
        ${lang === "ar"
          ? `الباقي ${value} (يدفع بالعملة القديمة: ${value * 100})`
          : `Remaining ${value} (pay ${value * 100} in old currency)`}
      </div>
    `;
  }
}
