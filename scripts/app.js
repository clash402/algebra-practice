// Props

const problemText = document.getElementById("problem-text");
const answerBtn1 = document.getElementById("answers-btn-1");
const answerBtn2 = document.getElementById("answers-btn-2");
const answerBtn3 = document.getElementById("answers-btn-3");
const answerBtn4 = document.getElementById("answers-btn-4");

let currentCorrectAnswer;

// Problem Sets

function getRandomProblemAndAnswer() {
  const term1 = getRandomInt(12).toString();
  const term2 = getRandomInt(12).toString();
  const problemString = term1 + " ⋅ " + term2;
  const answerInt = term1 * term2;

  return [problemString, answerInt];
}

function getRandomEquation() {
  const letters = ["x", "y", "z"];
  const randomLetter = letters[Math.round(Math.random() * 2)];
  const constantIsPositive = getRandomBool();
  const coefficientIsPositive = getRandomBool();
  const constantIsLeading = getRandomBool();
  const vinculum = "\u2044";

  const coefficient = getRandomInt(10);
  const variable = getRandomInt(10);
  const constant1 = getRandomInt(10);

  let constant2;
  let constantSign;
  let coefficientSign;
  let equation;

  if (constantIsPositive) {
    constant2 = coefficient * variable + constant1;
    constantSign = "+";
  } else {
    constant2 = coefficient * variable - constant1;
    constantSign = "-";
  }

  if (constantIsLeading) {
    if (constantSign === "+") {
      equation = `${constant1} + ${coefficient}${randomLetter} = ${constant2}`;
    } else {
      equation = `${constantSign}${constant1} + ${coefficient}${randomLetter} = ${constant2}`;
    }
  } else {
    equation = `${coefficient}${randomLetter} ${constantSign} ${constant1} = ${constant2}`;
  }

  return [equation, variable];
}

function getProblemSet() {
  const [problemString, correctAnswer] = getRandomEquation();
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

// UI

function updateProblemSetUI(set) {
  const [problemString, correctAnswer, possibleAnswers] = set;

  problemText.innerHTML = problemString;
  answerBtn1.innerHTML = possibleAnswers[0];
  answerBtn2.innerHTML = possibleAnswers[1];
  answerBtn3.innerHTML = possibleAnswers[2];
  answerBtn4.innerHTML = possibleAnswers[3];
}

// Events

function onLoad() {
  const problemSet = getProblemSet();

  setCurrentCorrectAnswer(problemSet[1]);
  updateProblemSetUI(problemSet);
}

function onAnswerBtnClicked(btn) {
  if (currentCorrectAnswer === btn.innerHTML) {
    alert("That's right! Good job");
  } else {
    alert("Incorrect. The answer is " + currentCorrectAnswer);
  }

  const problemSet = getProblemSet();

  setCurrentCorrectAnswer(problemSet[1]);
  updateProblemSetUI(problemSet);
}

// Helpers

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
