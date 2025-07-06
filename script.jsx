const amount = document.querySelector(".amount");
const term = document.querySelector(".term");
const rate = document.querySelector(".rate");
const errorAmount = document.querySelector("#error-amount");
const errorTerm = document.querySelector("#error-term");
const errorRate = document.querySelector("#error-rate");
const errorRadio = document.querySelector("#error-radio");
const resulRadio = document.querySelectorAll(".radio");
const submit = document.querySelector(".calculate-btn");
const resulEmpty = document.querySelector(".results-empty");
const resulActive = document.querySelector(".results-container-active");
const amountRepayments = document.querySelector(".mont-repayments");
const totalRepay = document.querySelector(".total-repay");
const clearAll = document.querySelector(".clear-all");

const clear = () => {
    resulRadio.forEach(radio => (radio.checked = false));
    amount.value = '';
    term.value = '';
    rate.value = '';
    errorAmount.textContent = "";
    errorTerm.textContent = "";
    errorRate.textContent = "";
    errorRadio.textContent = "";
    resulEmpty.style.display = "flex";
    resulActive.style.display = "none";
};

const calculate = (e) => {
    if (e) e.preventDefault();

    const termNum = Number(term.value);
    const amountNum = Number(amount.value);
    const rateN = Number(rate.value);
    let selectecRadio = Array.from(resulRadio).find(radio => radio.checked);

    if (amount.value.trim() === "") {
        errorAmount.textContent = "This field is required";
    } else {
        errorAmount.textContent = "";
    }

    if (term.value.trim() === "") {
        errorTerm.textContent = "This field is required";
    } else {
        errorTerm.textContent = "";
    }

    if (rate.value.trim() === "") {
        errorRate.textContent = "This field is required";
    } else {
        errorRate.textContent = "";
    }

    if (!selectecRadio) {
        errorRadio.textContent = "This field is required";
    } else {
        errorRadio.textContent = "";
    }

    if (
        amount.value.trim() === "" ||
        term.value.trim() === "" ||
        rate.value.trim() === "" ||
        !selectecRadio
    ) {
        resulEmpty.style.display = "flex";
        resulActive.style.display = "none";
        return;
    }

    if (selectecRadio.value === "a") {
        resulEmpty.style.display = "none";
        resulActive.style.display = "flex";

        const monthlyRate = rateN / 100 / 12;
        const totalPayments = termNum * 12;

        const monthlyRepayment = (amountNum * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);

        const totalRepayment = monthlyRepayment * totalPayments;

        amountRepayments.innerHTML = `£ ${monthlyRepayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        totalRepay.innerHTML = `£ ${totalRepayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else if (selectecRadio.value === "b") {
        resulEmpty.style.display = "none";
        resulActive.style.display = "flex";

        const monthlyRate = rateN / 100 / 12;
        const totalPayments = termNum * 12;

        const monthlyRepayment = amountNum * monthlyRate;
        const totalRepayment = monthlyRepayment * totalPayments;

        amountRepayments.innerHTML = `£ ${monthlyRepayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        totalRepay.innerHTML = `£ ${totalRepayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
};

clearAll.addEventListener("click", clear);

if (submit.form) {
    submit.form.addEventListener("submit", calculate);
} else {
    submit.addEventListener("click", calculate);
}