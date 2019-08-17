'use strict';


// global variables
let questionNum = 0;
let score = 0;

// start quiz on page load
// handle submit button to start quiz
function startQuiz() {
  $('.js-start-quiz').on('click', event => {
    generateQuestion(event, questionNum);
    $('.js-question-number').text(1);
  });
}

// track progress
function quizProgress() {
  $('.js-question-number').text(++questionNum + 1);
}

// record score
function tallyScore() {
  $('.js-score').text(++score);
}

// generate html for the questions and answers
function generateQuestion(event, num) {

  // event.currentTarget is the submit button (start quiz) on home page
  const questionHTML = `
    <h2>${STORE[num].question}</h2>
    <form id='js-form'>
        <label for='answer1'>
            <input name='answerGroup' id='answer1' type="radio" value = "0">${STORE[num].answers[0]}</input>
        </label>
        <label for='answer2'>
            <input name='answerGroup' id='answer2' type="radio" value = "1">${STORE[num].answers[1]}</input>
        </label>
        <label for='answer3'>
            <input name='answerGroup' id='answer3' type="radio" value = "2">${STORE[num].answers[2]}</input>
        </label>
        <label for='answer4'>
            <input name='answerGroup' id='answer4' type="radio" value = "3">${STORE[num].answers[3]}</input>
        </label>
        <input type = "submit" class="js-submitButton"></input>
    </form>`;
  
  $('.js-output').html(questionHTML);
  $(event.currentTarget).remove(); 
}

// record user answer 
function handleAnswerSubmission() {
  $('body').on('submit','#js-form', function(event) {
    event.preventDefault();
    const userAnswer = $('input:checked').val();

    if (userAnswer==STORE[questionNum].correctAnswer) {
      tallyScore();
      correctAnswer();
    } else {
      wrongAnswer();
    }
  });
}

// print 'you are right'
// and add 'next question' button
function correctAnswer() {

  let output= `
  <p>You are right!</p>
  <button class='js-next-question'>Next question</button>`;
  $('.js-output').html(output);
  nextQuestion();
}

function wrongAnswer() {

  let correctAnswerIndex = STORE[questionNum].correctAnswer;
  let answer = STORE[questionNum].answers[correctAnswerIndex];
  let output= `
  <p>You are wrong!</p>
  <p>The correct answer is ${answer}<p>
  <button class='js-next-question'>Next question</button>`;
  $('.js-output').html(output);
  nextQuestion();
}

function nextQuestion() {
  console.log('next question');
  $('.js-next-question').click(e => {
    quizProgress();
    generateQuestion(e, questionNum);
  });


}


// tell user if answer is right or wrong
// give correct answer if wrong
// also handle next question button
function answerFeedback() {

}

// results page
// see total score
// how many questions right/wrong
// start new quiz from here
function displayFinal() {

}
function main() {
  console.log('loaded');
  startQuiz();
  handleAnswerSubmission();
}

$(main);

