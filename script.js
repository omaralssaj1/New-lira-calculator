let lang = "ar";
let seniorMode = false;

function toggleDark() {
  document.body.classList.toggle("dark");
}

function toggleSenior() {
  seniorMode = !seniorMode;
  document.body.classList.toggle("senior");

  const btn = document.getElementById("seniorBtn");
  btn.classList.toggle("active-senior");

  if (document.getElementById("amount").value) {
    calculate();
  }
}

function resetCalc() {
  document.getElementById("amount").value = "";
  document.getElementById("result").innerHTML = "";
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

  document.getElementById("resetBtn").innerText =
    lang === "ar" ? "🔄 إعادة الحساب" : "🔄 Reset";

  document.getElementById("langBtn").innerText =
    lang === "ar" ? "EN" : "AR";

  document.getElementById("result").innerHTML = "";
}

function calculate() {
  const amount = Number(document.getElementById("amount").value);
  const result = document.getElementById("result");
  result.innerHTML = "";

  if (!amount || amount <= 0) {
    result.innerHTML =
      lang === "ar"
        ? "❌ دخيلك دخل رقم صحيح"
        : "❌ Please enter a valid number";
    return;
  }

  let newAmount = Math.floor(amount / 100);
  let remainderOld = amount % 100;

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
      <strong>${newAmount}</strong>
    </div>
  `;

  bills.forEach(b => {
    let count = Math.floor(newAmount / b.v);
    if (count > 0) {
      result.innerHTML += `
        <div class="bill ${b.c}">
          <img src="${b.img}">
          <div class="bill-text">
            ${seniorMode ? `× ${count}` : `${b.e} ${b.v} × ${count}`}
          </div>
        </div>
      `;
      newAmount %= b.v;
    }
  });

  // باقي الفئات بعد توزيع الفئات الجديدة
  if (newAmount > 0) {
    result.innerHTML += `
      <div class="note">
        ${
          lang === "ar"
            ? `⚠️ الباقي ${newAmount} (يدفع بالعملة القديمة: ${newAmount * 100})`
            : `⚠️ Remaining ${newAmount} (pay ${newAmount * 100} in old currency)`
        }
      </div>
    `;
  }

  // باقي أقل من 100 من المبلغ الأصلي
  if (remainderOld > 0) {
    result.innerHTML += `
      <div class="note">
        ${
          lang === "ar"
            ? `🔁 باقي أقل من 100 بالعملة القديمة: ${remainderOld}`
            : `🔁 Extra old-currency remainder: ${remainderOld}`
        }
      </div>
    `;
  }
}
