// Правильные данные для авторизации
const correctUsername = "Fantom";
const correctPassword = "1230543321";

// Список допустимых СМС кодов
const validSmsCodes = [
    '989339', '387301', '010375', '111561', '379911', '338229', '781019',
    '390093', '679982', '309301', '119118', '199891', '333932', '839000',
    '391392', '801130', '192192', '890399', '289970', '491492'
];

// Список допустимых номеров счёта
const validAccountNumbers = [
    '40817810000000000001',
    '40817810000000000002',
    '40817810000000000003',
    '40817810000000000004',
    '40817810000000000005'
];

// Функция для проверки валидности номера счёта
function isValidAccountNumber(accountNumber) {
    return validAccountNumbers.includes(accountNumber);
}

// Функция для форматирования чисел с разделением на точки
function formatNumber(number) {
    return number.toLocaleString('ru-RU');
}

// При загрузке страницы сохраняем текущий баланс из localStorage или устанавливаем дефолтное значение
window.onload = function() {
    let balance = parseFloat(localStorage.getItem("balance")); // Получаем баланс из localStorage
    if (isNaN(balance)) { // Проверяем, есть ли баланс
        balance = 47000000000000; // Устанавливаем начальный баланс, если его нет
        localStorage.setItem("balance", balance);
    }
    document.getElementById("balance").innerText = formatNumber(balance); // Отображаем баланс
};

// Функция для авторизации пользователя
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");
    const loginForm = document.getElementById("login-form");
    const accountPage = document.getElementById("account-page");

    if (username === correctUsername && password === correctPassword) {
        loginForm.classList.add("hidden");
        accountPage.classList.remove("hidden");
    } else {
        errorMessage.style.display = "block";
        setTimeout(() => {
            errorMessage.style.display = "none";
        }, 3000); // Error message disappears after 3 seconds
    }
}

// Функция для перехода на страницу перевода
function openTransferPage() {
    const accountPage = document.getElementById("account-page");
    const transferPage = document.getElementById("transfer-page");
    accountPage.classList.add("hidden");
    transferPage.classList.remove("hidden");
}

// Функция для перевода средств
function transfer() {
    const amount = document.getElementById("amount").value;
    const recipient = document.getElementById("recipient").value;
    const smsCode = document.getElementById("sms-code").value;

    // Проверка на правильность номера счёта
    if (!isValidAccountNumber(recipient)) {
        alert("Неверный номер счёта. Попробуйте снова.");
        return;
    }

    // Проверка на правильность введённого СМС-кода
    if (!validSmsCodes.includes(smsCode)) {
        alert("Неверный СМС код. Попробуйте снова.");
        return;
    }

    if (amount && recipient && smsCode) {
        let balance = parseFloat(localStorage.getItem("balance"));
        balance -= parseFloat(amount); // Вычитаем сумму перевода из баланса
        if (balance < 0) {
            alert("Недостаточно средств.");
            return;
        }
        // Сохраняем новый баланс в localStorage
        localStorage.setItem("balance", balance);

        alert(`Перевод на сумму ${amount} ₽ на счёт ${recipient} подтвержден. СМС код: ${smsCode}`);
        
        // Обновляем баланс на странице
        document.getElementById("balance").innerText = formatNumber(balance);

        // После перевода возвращаемся на страницу с балансом
        const transferPage = document.getElementById("transfer-page");
        const accountPage = document.getElementById("account-page");
        transferPage.classList.add("hidden");
        accountPage.classList.remove("hidden");
    } else {
        alert("Пожалуйста, заполните все поля.");
    }
}