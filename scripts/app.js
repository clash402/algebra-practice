const problemText = document.getElementById("problem-text");
const answerBtn1 = document.getElementById("answers-btn-1");
const answerBtn2 = document.getElementById("answers-btn-2");
const answerBtn3 = document.getElementById("answers-btn-3");
const answerBtn4 = document.getElementById("answers-btn-4");

let currentCorrectAnswer;

function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

function getRandomBool() {
  const bools = [true, false];
  const randomBool = bools[Math.round(Math.random())];
  return randomBool;
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function getRandomProblemAndAnswer() {
  const term1 = getRandomInt(12).toString();
  const term2 = getRandomInt(12).toString();
  const problemString = term1 + " ⋅ " + term2;
  const answerInt = term1 * term2;

  return [problemString, answerInt];
}

function getProblemSet() {
  const [problemString, correctAnswer] = getRandomProblemAndAnswer();
  let possibleAnswers = [correctAnswer];
  let i = 0;

  while (i < 3) {
    const randomBool = getRandomBool();
    const randomInt = getRandomInt(7);
    let falseAnswer;

    if (randomBool) {
      falseAnswer = correctAnswer + randomInt;
    } else {
      falseAnswer = correctAnswer - randomInt;
    }

    if (possibleAnswers.includes(falseAnswer)) {
      continue;
    }

    possibleAnswers.push(falseAnswer);
    i++;
  }

  shuffle(possibleAnswers);
  return [problemString, correctAnswer, possibleAnswers];
}

function setCurrentCorrectAnswer(answer) {
  currentCorrectAnswer = answer.toString();
}

function updateProblemSetUI(set) {
  const [problemString, correctAnswer, possibleAnswers] = set;

  problemText.innerHTML = problemString;
  answerBtn1.innerHTML = possibleAnswers[0];
  answerBtn2.innerHTML = possibleAnswers[1];
  answerBtn3.innerHTML = possibleAnswers[2];
  answerBtn4.innerHTML = possibleAnswers[3];
}

function onLoad() {
  const problemSet = getProblemSet();

  setCurrentCorrectAnswer(problemSet[1]);
  updateProblemSetUI(problemSet);
}

function onAnswerBtnClicked(btn) {
  if (currentCorrectAnswer === btn.innerHTML) {
    alert("Yes");
  } else {
    alert("No");
  }

  const problemSet = getProblemSet();

  setCurrentCorrectAnswer(problemSet[1]);
  updateProblemSetUI(problemSet);
}
