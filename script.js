/* =========================
   ДОЖДЬ
========================= */

const canvas = document.getElementById("rain");
const ctx = canvas.getContext("2d");

let width;
let height;
let drops = [];

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    drops = [];

    const amount = Math.floor(width * 0.20);

    for (let i = 0; i < amount; i++) {
        drops.push({
            x: Math.random() * width,
            y: Math.random() * height,
            length: Math.random() * 14 + 8,
            speed: Math.random() * 4 + 5,
            opacity: Math.random() * 0.18 + 0.12
        });
    }
}

function drawRain() {
    ctx.clearRect(0, 0, width, height);

    drops.forEach(drop => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - 1.5, drop.y + drop.length);

        ctx.strokeStyle =
            `rgba(190, 190, 190, ${drop.opacity})`;

        ctx.lineWidth = 0.8;
        ctx.stroke();

        drop.y += drop.speed;
        drop.x -= 0.7;

        if (drop.y > height) {
            drop.y = -drop.length;
            drop.x = Math.random() * width;
        }

        if (drop.x < 0) {
            drop.x = width;
        }
    });

    requestAnimationFrame(drawRain);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawRain();


/* =========================
   ВИКТОРИНА «КАКОЙ ТЫ МИНЬОН?»
========================= */

const questions = [
    {
        question: "Твой друг пишет: «У меня всё плохо». Что ты делаешь?",
        answers: [
            ["Иду спасать его. Я герой.", "kind"],
            ["Отправляю банан. Банан лечит всё.", "chaos"],
            ["Пишу «держись» и исчезаю.", "sad"],
            ["Сначала спрашиваю, что случилось.", "smart"]
        ]
    },
    {
        question: "Ты случайно сломал вещь. Твоя реакция?",
        answers: [
            ["Я ничего не видел.", "chaos"],
            ["Пытаюсь починить.", "smart"],
            ["Грустно смотрю на последствия.", "sad"],
            ["Признаюсь и извиняюсь.", "kind"]
        ]
    },
    {
        question: "Тебе дали полностью свободный день. Что будешь делать?",
        answers: [
            ["Спать 14 часов.", "sad"],
            ["Играть до утра.", "chaos"],
            ["Гулять и искать приключения.", "kind"],
            ["Составлю план идеального дня.", "smart"]
        ]
    },
    {
        question: "В компании стало слишком тихо. Твои действия?",
        answers: [
            ["Начинаю рассказывать истории.", "kind"],
            ["Издаю максимально странный звук.", "chaos"],
            ["Сижу в углу и наблюдаю.", "sad"],
            ["Предлагаю нормальную тему для разговора.", "smart"]
        ]
    },
    {
        question: "Тебе подарили огромную коробку бананов.",
        answers: [
            ["Съем всё.", "chaos"],
            ["Разделю с друзьями.", "kind"],
            ["Поставлю рядом и буду грустно смотреть.", "sad"],
            ["Посчитаю, на сколько дней хватит.", "smart"]
        ]
    },
    {
        question: "Кто-то обидел твоего друга.",
        answers: [
            ["Я уже бегу разбираться.", "kind"],
            ["Планирую месть с 47 пунктами.", "smart"],
            ["Кидаю в виновника бананом.", "chaos"],
            ["Мне самому становится грустно.", "sad"]
        ]
    },
    {
        question: "Как выглядит твой идеальный вечер?",
        answers: [
            ["Музыка, плед и немного грусти.", "sad"],
            ["Друзья, смех и хаос.", "chaos"],
            ["Фильм и вкусная еда.", "kind"],
            ["Компьютер, порядок и никаких людей.", "smart"]
        ]
    },
    {
        question: "Ты увидел подозрительную кнопку с надписью «НЕ НАЖИМАТЬ».",
        answers: [
            ["Нажму. Конечно.", "chaos"],
            ["Сначала изучу инструкцию.", "smart"],
            ["Позову друга и нажму вместе.", "kind"],
            ["Не нажму. Мне уже тревожно.", "sad"]
        ]
    },
    {
        question: "Твой главный жизненный принцип?",
        answers: [
            ["Помогать своим.", "kind"],
            ["Не усложнять.", "chaos"],
            ["Сначала подумать.", "smart"],
            ["Ну... когда-нибудь станет лучше.", "sad"]
        ]
    },
    {
        question: "Выбери одну фразу:",
        answers: [
            ["БАНАН!!!", "chaos"],
            ["Я всё продумал.", "smart"],
            ["Всё будет хорошо.", "kind"],
            ["Мне просто нужен сон.", "sad"]
        ]
    }
];

const results = {
    chaos: {
        title: "ТЫ — СТЮАРТ ХАОСА",
        image: "images/minion5.gif",
        description:
            "Ты — ходячая катастрофа, но именно поэтому рядом с тобой никогда не скучно. Ты можешь случайно сломать половину комнаты, а потом искренне спросить: «А что случилось?» Твой главный ресурс — энергия и абсолютная непредсказуемость."
    },

    kind: {
        title: "ТЫ — БОБ С БОЛЬШИМ СЕРДЦЕМ",
        image: "images/minion6.jpg",
        description:
            "Ты добрый миньон. Ты переживаешь за своих, умеешь поддержать и скорее отдашь последний банан другу, чем съешь его сам. Правда, иногда тебя легко уговорить на очередную сомнительную авантюру."
    },

    smart: {
        title: "ТЫ — КЕВИН, ГЛАВНЫЙ СТРАТЕГ",
        image: "images/minion9.jpg",
        description:
            "Ты пытаешься сохранить порядок в этом цирке. Пока остальные бегают и кричат, ты уже понял, что происходит. Ты умеешь думать наперёд, но иногда слишком долго анализируешь ситуацию, пока остальные уже убежали."
    },

    sad: {
        title: "ТЫ — МИНЬОН В РЕЖИМЕ ДОЖДЯ",
        image: "images/minion7.jpg",
        description:
            "Ты немного грустный, немного уставший и очень атмосферный. Тебе нужен плед, музыка и что-нибудь вкусное. Но не переживай: даже самый дождливый миньон иногда внезапно начинает танцевать."
    }
};

let currentQuestion = 0;

let scores = {
    chaos: 0,
    kind: 0,
    smart: 0,
    sad: 0
};

const startScreen = document.getElementById("quiz-start-screen");
const quizGame = document.getElementById("quiz-game");
const quizResult = document.getElementById("quiz-result");

const questionNumber = document.getElementById("questionNumber");
const progressFill = document.getElementById("progressFill");
const questionText = document.getElementById("questionText");
const answersBox = document.getElementById("answers");

const resultTitle = document.getElementById("resultTitle");
const resultImage = document.getElementById("resultImage");
const resultDescription = document.getElementById("resultDescription");

document.getElementById("startQuiz").addEventListener("click", startQuiz);
document.getElementById("restartQuiz").addEventListener("click", startQuiz);

function startQuiz() {
    currentQuestion = 0;

    scores = {
        chaos: 0,
        kind: 0,
        smart: 0,
        sad: 0
    };

    startScreen.classList.add("hidden");
    quizResult.classList.add("hidden");
    quizGame.classList.remove("hidden");

    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestion];

    questionNumber.textContent =
        `ВОПРОС ${currentQuestion + 1} / ${questions.length}`;

    progressFill.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    questionText.textContent = question.question;
    answersBox.innerHTML = "";

    question.answers.forEach(answer => {
        const button = document.createElement("button");

        button.className = "answer-button";
        button.textContent = answer[0];

        button.addEventListener("click", () => {
            scores[answer[1]]++;
            nextQuestion();
        });

        answersBox.appendChild(button);
    });
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion >= questions.length) {
        showResult();
        return;
    }

    showQuestion();
}

function showResult() {
    quizGame.classList.add("hidden");
    quizResult.classList.remove("hidden");

    progressFill.style.width = "100%";

    let resultType = "chaos";
    let highest = -1;

    for (const type in scores) {
        if (scores[type] > highest) {
            highest = scores[type];
            resultType = type;
        }
    }

    const result = results[resultType];

    resultTitle.textContent = result.title;
    resultImage.src = result.image;
    resultDescription.textContent = result.description;
}


/* =========================
   ЛАБОРАТОРИЯ ХАОСА
========================= */

let bananas = 0;
let bananaRainRunning = false;

const bananaRain = document.getElementById("bananaRain");

document.getElementById("bananaButton").addEventListener("click", () => {
    bananas++;

    document.getElementById("bananaCounter").textContent =
        `ВЫПУЩЕНО БАНАНОВ: ${bananas}`;

    startBananaRain();

    if (bananas >= 10) {
        document.getElementById("bananaCounter").textContent =
            "БАНАНОВЫЙ АПОКАЛИПСИС НАЧАЛСЯ.";
    }
});

function startBananaRain() {
    if (bananaRainRunning) return;

    bananaRainRunning = true;
    bananaRain.innerHTML = "";

    const amount = 75;

    for (let i = 0; i < amount; i++) {
        const banana = document.createElement("span");

        banana.className = "banana-drop";
        banana.textContent = "🍌";

        banana.style.left = `${Math.random() * 100}%`;
        banana.style.animationDuration = `${2.1 + Math.random() * 2.2}s`;
        banana.style.animationDelay = `${Math.random() * 1.7}s`;
        banana.style.setProperty("--drift", `${-140 + Math.random() * 280}px`);
        banana.style.setProperty("--rotation", `${-360 + Math.random() * 720}deg`);

        bananaRain.appendChild(banana);
    }

    setTimeout(() => {
        bananaRain.innerHTML = "";
        bananaRainRunning = false;
    }, 5000);
}


const moods = [
    "87% БАНАН",
    "СЛИШКОМ МНОГО ХАОСА",
    "ПОДОЗРИТЕЛЬНО СЧАСТЛИВ",
    "СРОЧНО НУЖЕН СОН",
    "ОПАСНО ГЛУПЫЙ",
    "ЭМОЦИОНАЛЬНО — БАНАН"
];

document.getElementById("moodButton").addEventListener("click", () => {
    const randomMood =
        moods[Math.floor(Math.random() * moods.length)];

    document.getElementById("moodResult").textContent =
        randomMood;
});


let summons = 0;

document.getElementById("summonButton").addEventListener("click", () => {
    summons++;

    const area = document.getElementById("summonArea");

    if (summons >= 5) {
        area.innerHTML = `
            <img
                class="summoned-minion"
                src="images/minion11.gif"
                alt="Вызванный миньон"
            >
        `;
    } else {
        area.textContent =
            `МИНЬОН ПРОСЫПАЕТСЯ... ${summons}/5`;
    }
});


/* =========================
   ФОНОВАЯ МУЗЫКА
========================= */

const backgroundMusic =
    document.getElementById("backgroundMusic");

let musicStarted = false;

function startBackgroundMusic() {
    if (musicStarted) return;

    backgroundMusic.volume = 0.35;

    backgroundMusic.play()
        .then(() => {
            musicStarted = true;
        })
        .catch(() => {
            // Браузер может запретить автозапуск.
            // После клика пользователя музыка попробует запуститься снова.
        });
}

document.addEventListener("click", startBackgroundMusic, {
    once: false
});


/* =========================
   ЦВЕТОЧЕК → СКРИМЕР
========================= */

const minionTrigger =
    document.getElementById("minionTrigger");

const flowerPopup =
    document.getElementById("flowerPopup");

const closePopup =
    document.getElementById("closePopup");

const flowerVideo =
    document.getElementById("flowerVideo");

const screamer =
    document.getElementById("screamer");

const screamerSound =
    document.getElementById("screamerSound");

let flowerTimer;

minionTrigger.addEventListener("click", () => {

    startBackgroundMusic();

    flowerPopup.classList.remove("hidden");

    flowerVideo.currentTime = 0;
    flowerVideo.play().catch(() => {});

    clearTimeout(flowerTimer);

    flowerTimer = setTimeout(triggerScreamer, 7000);
});


function triggerScreamer() {

    flowerPopup.classList.add("hidden");

    flowerVideo.pause();

    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;

    screamer.classList.remove("hidden");

    screamerSound.currentTime = 0;
    screamerSound.volume = 1;

    screamerSound.play().catch(() => {});
}


closePopup.addEventListener("click", () => {

    flowerPopup.classList.add("hidden");

    flowerVideo.pause();

    clearTimeout(flowerTimer);

});


document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        !screamer.classList.contains("hidden")
    ) {
        screamer.classList.add("hidden");

        screamerSound.pause();
        screamerSound.currentTime = 0;
    }

});
