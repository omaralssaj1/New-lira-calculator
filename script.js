function toggleDark() {
  document.body.classList.toggle("dark");
}

function toggleLang() {
  alert("تبديل اللغة لاحقًا 😄");
}

function calculate() {
  const amount = Number(document.getElementById("amount").value);
  const result = document.getElementById("result");
  result.innerHTML = "";

  if (!amount || amount <= 0) {
    result.innerHTML = "❌ دخل رقم صحيح";
    return;
  }

  let value = Math.floor(amount / 100);

  const bills = [
    { v: 500, img: "images/500.png", c: "bill-500" },
    { v: 200, img: "images/200.png", c: "bill-200" },
    { v: 100, img: "images/100.png", c: "bill-100" },
    { v: 50,  img: "images/50.png",  c: "bill-50" },
    { v: 25,  img: "images/25.png",  c: "bill-25" },
    { v: 10,  img: "images/10.png",  c: "bill-10" }
  ];

  result.innerHTML += `
    <div class="result-box">
      المبلغ بعد حذف صفرين: <strong>${value}</strong>
    </div>
  `;

  bills.forEach(b => {
    let count = Math.floor(value / b.v);
    if (count > 0) {
      result.innerHTML += `
        <div class="bill ${b.c}">
          <img src="${b.img}">
          <div class="bill-text">${b.v} × ${count}</div>
        </div>
      `;
      value %= b.v;
    }
  });
}
