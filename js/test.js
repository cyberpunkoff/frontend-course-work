const DATA = [
    {
        question: "Какой из следующих терминов обозначает нереляционные базы данных?",
        answers: [
            { id: "1", value: "SQL", correct: false },
            { id: "2", value: "NoSQL", correct: true },
            { id: "3", value: "ORM", correct: false },
            { id: "4", value: "ACID", correct: false },
        ],
    },
    {
        question: "Какая из следующих СУБД является документоориентированной?",
        answers: [
            { id: "5", value: "MongoDB", correct: true },
            { id: "6", value: "MySQL", correct: false },
            { id: "7", value: "PostgreSQL", correct: false },
            { id: "8", value: "SQLite", correct: false },
        ],
    },
    {
        question: "Какой принцип лежит в основе графовых баз данных?",
        answers: [
            { id: "9", value: "Транзакции", correct: false },
            { id: "10", value: "Схема", correct: false },
            { id: "11", value: "Отношения", correct: false },
            { id: "12", value: "Связи", correct: true },
        ],
    },
    {
        question: "Какая из нижеперечисленных СУБД предназначена для обработки временных рядов и событий?",
        answers: [
            { id: "13", value: "Cassandra", correct: false },
            { id: "14", value: "Redis", correct: false },
            { id: "15", value: "InfluxDB", correct: true },
            { id: "16", value: "Neo4j", correct: false },
        ],
    },
    {
        question: "В какой категории СУБД можно выделить ключ-значение (key-value) хранилища?",
        answers: [
            { id: "17", value: "Графовые базы данных", correct: false },
            {
                id: "18",
                value: "Документоориентированные базы данных",
                correct: false,
            },
            { id: "19", value: "Ключ-значение базы данных", correct: true },
            { id: "20", value: "Реляционные базы данных", correct: false },
        ],
    },
    {
        question: "Какая из следующих СУБД часто используется для кэширования данных?",
        answers: [
            { id: "21", value: "Redis", correct: true },
            { id: "22", value: "MongoDB", correct: false },
            { id: "23", value: "Cassandra", correct: false },
            { id: "24", value: "Neo4j", correct: false },
        ],
    },
    {
        question: "Какой тип нереляционных СУБД ориентирован на обработку больших объемов данных в распределенной среде?",
        answers: [
            { id: "25", value: "Key-Value", correct: false },
            { id: "26", value: "Column-Family", correct: true },
            { id: "27", value: "Document-Oriented", correct: false },
            { id: "28", value: "Wide-Column Store", correct: false },
        ],
    },
    {
        question: "Какая из нижеперечисленных СУБД предоставляет язык запросов Gremlin для работы с графовыми данными?",
        answers: [
            { id: "29", value: "CouchDB", correct: false },
            { id: "30", value: "ArangoDB", correct: false },
            { id: "31", value: "OrientDB", correct: false },
            { id: "32", value: "Apache TinkerPop", correct: true },
        ],
    },
    {
        question: "Какая из следующих СУБД поддерживает ACID-транзакции?",
        answers: [
            { id: "33", value: "Cassandra", correct: false },
            { id: "34", value: "MongoDB", correct: false },
            { id: "35", value: "Redis", correct: false },
            { id: "36", value: "Couchbase", correct: true },
        ],
    },
    {
        question: "Какое из утверждений характеризует преимущества нереляционных СУБД?",
        answers: [
            { id: "37", value: "Структурированный язык запросов", correct: false },
            { id: "38", value: "Гибкая схема данных", correct: true },
            { id: "39", value: "Сложные JOIN-операции", correct: false },
            { id: "40", value: "Таблицы и внешние ключи", correct: false },
        ],
    },
];
let answerResults = {};

const quiz = document.getElementById("quiz");
const questions = document.getElementById("questions");
const indicator = document.getElementById("indicator");
const results = document.getElementById("results");
const btnNext = document.getElementById("btn-next");
const btnRestart = document.getElementById("btn-restart");
const btnStart = document.getElementById("btn-start");

const renderQuestions = (index) => {
    renderIndicator(index + 1);

    quiz.classList.remove("quiz--results");
    questions.dataset.currentStep = index;

    const renderAnswers = () =>
        DATA[index].answers
            .map(
                (answer) =>
                    `
        <li>
            <label>
            <input class="answer-input" type="radio" name="${index}" value="${answer.id}" />
            ${answer.value}
            </label>
        </li>
        `
            )
            .join("");

    questions.innerHTML = `
    <div class="quiz-questions-item">
    <div class="quiz-questions-item__question">${DATA[index].question}</div>
    <ul class="quiz-questions-item__answers">${renderAnswers()}</ul>
  </div>
    `;
};

const renderResults = () => {
    let content = "";

    const getClassName = (answer, questionIndex) => {
        let className = "";

        if (!answer.correct && answer.id === answerResults[questionIndex]) {
            className = "answer--invalid";
        } else if (answer.correct) {
            className = "answer--valid";
        }

        return className;
    };

    const getAnswers = (questionIndex) => DATA[questionIndex].answers.map((answer) => `<li class=${getClassName(answer, questionIndex)}>${answer.value}</li>`).join("");

    DATA.forEach((question, index) => {
        content += `
        <div class="quiz-results-item">
          <div class="quiz-results-item__question">${question.question}</div>
          <ul class="quiz-results-item__answers">${getAnswers(index)}
        </div>
        `;
    });

    results.innerHTML = content;
    quiz.classList.add("quiz--results");
};

const renderIndicator = (currentStep) => {
    indicator.innerHTML = `${currentStep}/${DATA.length}`;
};

quiz.addEventListener("change", (event) => {
    if (event.target.classList.contains("answer-input")) {
        console.log("input");
        answerResults[event.target.name] = event.target.value;
        btnNext.disabled = false;

        console.log(answerResults);
    }
});

quiz.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-next")) {
        const nextQuestionIndex = Number(questions.dataset.currentStep) + 1;

        if (DATA.length === nextQuestionIndex) {
            // переход к результатам
            questions.classList.add("questions--hidden");
            indicator.classList.add("indicator--hidden");
            results.classList.add("indicator--visible");
            btnNext.classList.add("btn-next--hidden");
            btnRestart.classList.add("btn-restart--visible");
            renderResults();
        } else {
            // переход к следующему вопросу
            renderQuestions(nextQuestionIndex);
        }

        btnNext.disabled = true;
    }

    if (event.target.classList.contains("btn-restart")) {
        results.innerHTML = "";
        answerResults = {};

        questions.classList.remove("questions--hidden");
        indicator.classList.remove("indicator--hidden");
        results.classList.remove("indicator--visible");
        btnNext.classList.remove("btn-next--hidden");
        btnRestart.classList.remove("btn-restart--visible");

        renderQuestions(0);
    }
});

renderQuestions(0)

btnStart.addEventListener("click", () => {
    document.querySelector(".quiz-container").classList.remove("start");
    document.querySelector(".start-container").remove();
    quiz.classList.remove("quiz--hidden");
    renderQuestions(0);
});
