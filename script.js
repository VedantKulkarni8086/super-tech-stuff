// ----------------- Utilities -----------------
function $(id) {
  return document.getElementById(id);
}

// Number to words (supports up to 999,999,999)
function numberToWords(num) {
  if (num === 0) return "zero";
  if (num > 999999999) return "number too large";
  const a = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const b = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  function inHundreds(n) {
    let str = "";
    if (n > 99) {
      str += a[Math.floor(n / 100)] + " hundred";
      n = n % 100;
      if (n) str += " and ";
    }
    if (n < 20) {
      if (n) str += a[n];
    } else {
      str += b[Math.floor(n / 10)];
      if (n % 10) str += "-" + a[n % 10];
    }
    return str;
  }
  let out = "";
  const crore = Math.floor(num / 10000000);
  if (crore) {
    out += inHundreds(crore) + " crore ";
    num = num % 10000000;
  }
  const lakh = Math.floor(num / 100000);
  if (lakh) {
    out += inHundreds(lakh) + " lakh ";
    num = num % 100000;
  }
  const thousand = Math.floor(num / 1000);
  if (thousand) {
    out += inHundreds(thousand) + " thousand ";
    num = num % 1000;
  }
  if (num) out += inHundreds(num);
  return out.trim();
}

// ----------------- Validation rules -----------------
function validateFullName(value) {
  const errorEl = $("fullnameError");
  errorEl.textContent = "";
  if (!value) {
    errorEl.textContent = "Full name is required.";
    return false;
  }
  if (!/^[A-Za-z ]+$/.test(value)) {
    errorEl.textContent = "Only alphabets and spaces allowed.";
    return false;
  }
  const words = value.trim().split(/\s+/);
  if (words.length < 2) {
    errorEl.textContent = "Enter at least two names.";
    return false;
  }
  for (const w of words) {
    if (w.length < 4) {
      errorEl.textContent =
        "Each part of the name must be at least 4 characters.";
      return false;
    }
  }
  return true;
}

function validateEmail(value) {
  const errorEl = $("emailError");
  errorEl.textContent = "";
  if (!value) {
    errorEl.textContent = "Email required.";
    return false;
  }
  // simple email regex
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!re.test(value)) {
    errorEl.textContent = "Enter a valid email.";
    return false;
  }
  return true;
}

function validatePAN(value) {
  const errorEl = $("panError");
  errorEl.textContent = "";
  if (!value) {
    errorEl.textContent = "PAN required.";
    return false;
  }
  const v = value.toUpperCase();
  if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(v)) {
    errorEl.textContent = "PAN must match pattern ABCDE1234F.";
    return false;
  }
  return true;
}

function validateAmount(value) {
  const errorEl = $("amountError");
  errorEl.textContent = "";
  if (!value) {
    errorEl.textContent = "Loan amount required.";
    return false;
  }
  // remove commas
  const v = value.replace(/,/g, "");
  if (!/^[0-9]+$/.test(v)) {
    errorEl.textContent = "Amount must be numeric.";
    return false;
  }
  if (v.length > 9) {
    errorEl.textContent = "Maximum 9 digits allowed.";
    return false;
  }
  if (Number(v) === 0) {
    errorEl.textContent = "Amount must be greater than 0.";
    return false;
  }
  return true;
}

// ----------------- Captcha -----------------
let currentCaptchaAnswer = null;
function genCaptcha() {
  // generate simple arithmetic captcha
  const a = Math.floor(Math.random() * 50) + 1; // 1-50
  const b = Math.floor(Math.random() * 50) + 1;
  const ops = ["+", "-", "*"];
  const op = ops[Math.floor(Math.random() * ops.length)];
  let expr = a + " " + op + " " + b;
  let ans;
  if (op === "+") ans = a + b;
  if (op === "-") ans = a - b;
  if (op === "*") ans = a * b;
  // ensure answer displayed not obvious sign; we store numerical value
  currentCaptchaAnswer = ans;
  $("captchaText").textContent = expr;
}

function validateCaptcha(value) {
  const errorEl = $("captchaError");
  errorEl.textContent = "";
  if (value === "" || value === null || value === undefined) {
    errorEl.textContent = "Captcha answer required.";
    return false;
  }
  if (Number(value) !== currentCaptchaAnswer) {
    errorEl.textContent = "Captcha answer incorrect.";
    return false;
  }
  return true;
}

// ----------------- Form flow -----------------
const form = $("loanForm");
$("newCaptcha").addEventListener("click", (e) => {
  e.preventDefault();
  genCaptcha();
  $("captchaInput").value = "";
  $("captchaError").textContent = "";
});

// Live amount to words
$("amount").addEventListener("input", () => {
  const v = $("amount").value.replace(/,/g, "");
  if (/^[0-9]*$/.test(v) && v.length > 0) {
    const words = numberToWords(Number(v));
    $("amountWords").textContent = words + " rupees";
  } else $("amountWords").textContent = "";
});

// basic live validation on blur
$("fullname").addEventListener("blur", () =>
  validateFullName($("fullname").value),
);
$("email").addEventListener("blur", () => validateEmail($("email").value));
$("pan").addEventListener("blur", () => validatePAN($("pan").value));
$("amount").addEventListener("blur", () => validateAmount($("amount").value));

form.addEventListener("submit", function (ev) {
  ev.preventDefault();
  const full = $("fullname").value.trim();
  const email = $("email").value.trim();
  const pan = $("pan").value.trim();
  const amount = $("amount").value.replace(/,/g, "").trim();
  const captcha = $("captchaInput").value.trim();

  const ok1 = validateFullName(full);
  const ok2 = validateEmail(email);
  const ok3 = validatePAN(pan);
  const ok4 = validateAmount(amount);
  const ok5 = validateCaptcha(captcha);

  if (!(ok1 && ok2 && ok3 && ok4 && ok5)) {
    return;
  }

  // all good -> prepare data and show thank you page
  const formData = {
    fullname: full,
    email: email,
    pan: pan.toUpperCase(),
    amount: amount,
  };
  sessionStorage.setItem("loanForm", JSON.stringify(formData));

  // generate 4-digit verification number and show in console only
  const verification = Math.floor(1000 + Math.random() * 9000);
  sessionStorage.setItem("loanVerification", String(verification));
  console.log(
    "Verification code sent to email (for demo, console only):",
    verification,
  );

  // reset OTP attempts
  sessionStorage.setItem("otpAttemptsLeft", "3");

  showThankYouView();
});

function showThankYouView() {
  const formData = JSON.parse(sessionStorage.getItem("loanForm") || "{}");
  const firstName = (formData.fullname || "").trim().split(/\s+/)[0] || "";
  $("form-view").classList.add("hidden");
  $("404-view").classList.add("hidden");
  $("thankyou-view").classList.remove("hidden");
  $("thankyouMessage").textContent =
    `Dear ${firstName}, thank you for your inquiry, a 4 digit verification number has been sent to your email. Please enter it below and submit for confirmation.`;
  updateAttemptsDisplay();
}

function updateAttemptsDisplay() {
  const left = Number(sessionStorage.getItem("otpAttemptsLeft") || "3");
  $("otpAttempts").textContent = "Attempts left: " + left;
}

// OTP validation
$("validateOtpBtn").addEventListener("click", () => {
  const input = $("otp").value.trim();
  const stored = sessionStorage.getItem("loanVerification");
  const attemptsLeft = Number(sessionStorage.getItem("otpAttemptsLeft") || "3");
  $("otpError").textContent = "";
  if (!/^[0-9]{4}$/.test(input)) {
    $("otpError").textContent = "Enter a 4-digit numeric code.";
    return;
  }
  if (input === stored) {
    // success
    $("otp-section").innerHTML =
      '<p class="success">Validation successful. Redirecting to home page...</p>';
    setTimeout(() => {
      window.location.href = "https://pixel6.co/";
      resetAllAndGoHome();
    }, 1800);
  } else {
    const newLeft = attemptsLeft - 1;
    sessionStorage.setItem("otpAttemptsLeft", String(newLeft));
    if (newLeft <= 0) {
      show404();
    } else {
      $("otpError").textContent = "Code incorrect. Please try again.";
      $("otp").value = "";
      updateAttemptsDisplay();
    }
  }
});

function show404() {
  $("form-view").classList.add("hidden");
  $("thankyou-view").classList.add("hidden");
  $("404-view").classList.remove("hidden");
}

$("goHome").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "https://spclinfotech.com/";
  resetAllAndGoHome();
});

function resetAllAndGoHome() {
  sessionStorage.removeItem("loanForm");
  sessionStorage.removeItem("loanVerification");
  sessionStorage.removeItem("otpAttemptsLeft");
  // reset form fields
  form.reset();
  $("amountWords").textContent = "";
  $("captchaError").textContent = "";
  genCaptcha();
  $("thankyou-view").classList.add("hidden");
  $("404-view").classList.add("hidden");
  $("form-view").classList.remove("hidden");
}

// Initialize
window.addEventListener("load", () => {
  genCaptcha();
  // if user navigated back to page with stored form and verification, auto-show thankyou
  if (
    sessionStorage.getItem("loanForm") &&
    sessionStorage.getItem("loanVerification")
  ) {
    showThankYouView();
  }
});
