const DATA = [
  {
    question: "Вопрос 1",
    answers: [
      {
        id: "1",
        value: "Ответ 1",
        correct: true,
      },
      {
        id: "2",
        value: "Ответ 2",
        correct: false,
      },
      {
        id: "3",
        value: "Ответ 3",
        correct: false,
      },
    ],
  },
  {
    question: "Вопрос 2",
    answers: [
      {
        id: "4",
        value: "Ответ 4",
        correct: false,
      },
      {
        id: "5",
        value: "Ответ 5",
        correct: true,
      },
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

const renderQuestions = (index) => {
  renderIndicator(index + 1);

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
        let className = '';

        if (!answer.correct && answer.id === answerResults[questionIndex]) {
            className = 'answer--invalid'
        } else if (answer.correct) {
            className = 'answer--valid';
        }

        return className;
  }

  const getAnswers = (questionIndex) => DATA[questionIndex].answers
      .map((answer) => `<li class=${getClassName(answer, questionIndex)}>${answer.value}</li>`)
      .join("");

  DATA.forEach((question, index) => {
    content += `
        <div class="quiz-results-item">
          <div class="quiz-results-item__question">${question.question}</div>
          <ul class="quiz-results-item__answers">${getAnswers(index)}
        </div>
        `;
  });

  results.innerHTML = content;
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
      indicator.classList.add('indicator--hidden');
      results.classList.add('indicator--visible');
      btnNext.classList.add('btn-next--hidden');
      btnRestart.classList.add('btn-restart--visible');
      renderResults();
    } else {
      // переход к следующему вопросу
      renderQuestions(nextQuestionIndex);
    }

    btnNext.disabled = true;
  }

  if (event.target.classList.contains("btn-restart")) {
    results.innerHTML = '';
    answerResults = {};
    
    questions.classList.remove("questions--hidden");
      indicator.classList.remove('indicator--hidden');
      results.classList.remove('indicator--visible');
      btnNext.classList.remove('btn-next--hidden');
      btnRestart.classList.remove('btn-restart--visible');

      renderQuestions(0);
  }
});

renderQuestions(0);
