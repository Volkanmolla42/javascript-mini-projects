function calculate() {
  const totalAmount = document.getElementById("total-amount");
  const PrincipalInput = document.getElementById("Principal");
  const rateInput = document.getElementById("Interest");
  const yearsInput = document.getElementById("Years");

  let principal = Number(PrincipalInput.value);
  let rate = Number(rateInput.value / 100);
  let years = Number(yearsInput.value);

  if (principal < 0 || isNaN(principal)) {
    principal = 0;
    PrincipalInput.value = 0;
  }
  if (rate < 0 || isNaN(rate)) {
    rate = 0;
    rateInput.value = 0;
  }
  if (years < 0 || isNaN(rate)) {
    years = 0;

    yearsInput.value = 0;
  }

  const result = principal * Math.pow(1 + rate / 1, 1 * years);

  totalAmount.textContent = result.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
}
