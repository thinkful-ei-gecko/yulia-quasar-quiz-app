'use strict';

// start quiz on page load
// handle submit button to start quiz
function startQuiz() {
  // hide stats on load
  $('.stats').hide();
  // click 'start quiz'
  $('.js-start-quiz').on('click', event => {
    $('.stats').show();
    generateQuestion(event);
    $('.js-question-number').text(`1 of ${STORE.questions.length}`);
  });
}

// track progress
function quizProgress() {
  $('.js-question-number').text(`${++STORE.questionNum + 1} of ${STORE.questions.length}`);
}

// record score
function tallyScore() {
  $('.js-score').text(++STORE.score);
}

// generate html for the questions and answers
function generateQuestion(event) {
  // event.currentTarget is the submit button (start quiz) on home page
  const questionHTML = `
      <form id='js-form'>
      <fieldset>
        <legend>${STORE.questions[STORE.questionNum].question}</legend>
        <label for='answer1'>
            <input name='answerGroup' id='answer1' type="radio" value = "0">${STORE.questions[STORE.questionNum].answers[0]}</input>
        </label>
        <label for='answer2'>
            <input name='answerGroup' id='answer2' type="radio" value = "1">${STORE.questions[STORE.questionNum].answers[1]}</input>
        </label>
        <label for='answer3'>
            <input name='answerGroup' id='answer3' type="radio" value = "2">${STORE.questions[STORE.questionNum].answers[2]}</input>
        </label>
        <label for='answer4'>
            <input name='answerGroup' id='answer4' type="radio" value = "3">${STORE.questions[STORE.questionNum].answers[3]}</input>
        </label>
        <input type = "submit" class="js-submitButton button" value='Submit'></input>
      </fieldset>
    </form>`;
  
  $('.js-output').html(questionHTML);
  $(event.currentTarget).hide(); 
}

// record user answer 
function handleAnswerSubmission() {
  $('body').on('submit','#js-form', function(event) {
    event.preventDefault();
    if (document.querySelectorAll('input[type="radio"]:checked').length === 0) {
      // alert("Please select an answer");
      if ($('.alert-no-selection').length === 0 ) {
        $('fieldset').append('<p class=\'alert-no-selection\'>Please select an answer</p>');
      }
    }
    else {
      const userAnswer = $('input:checked').val();
      if (userAnswer==STORE.questions[STORE.questionNum].correctAnswer) {
        tallyScore();
        correctAnswer();
      } else {
        wrongAnswer();
      }
    }
  });
}

// print 'you are right'
// and add 'next question' button
function correctAnswer() {
  let buttonText = 'Next question';
  if (STORE.questionNum === STORE.questions.length - 1) {
    buttonText = 'Finish the quiz';
  }
  let output= `
  <section class='feedback'><p>You are right!</p></section>
  <button class='js-next-question button'>${buttonText}</button>`;
  $('.js-output').html(output);
  nextQuestion();
}

//give user's feedback if answer is incorrect
function wrongAnswer() {
  let buttonText = 'Next question';
  if (STORE.questionNum === STORE.questions.length - 1) {
    buttonText = 'Finish the quiz';
  }

  let correctAnswerIndex = STORE.questions[STORE.questionNum].correctAnswer;
  let answer = STORE.questions[STORE.questionNum].answers[correctAnswerIndex];
  let output= `
  <section class='feedback'><p>You are wrong!</p>
  <p>The correct answer is <span class='answer-style'>${answer}</span><p></section>
  <button type='button' class='js-next-question button'>${buttonText}</button>`;
  $('.js-output').html(output);
  nextQuestion();
}

//check if quiz not done
function nextQuestion() {
  $('.js-next-question').click(e => {
    if (STORE.questionNum < STORE.questions.length-1) {
      quizProgress();
      generateQuestion(e);
    }
    else {
      displayFinal();
    }
  });
}

//display final score and rank
function finalScore() {
  let finalScore = '';
  if (STORE.score / STORE.questions.length <= 0.2) {
    finalScore = 'a dirty squib';
  } else if (STORE.score / STORE.questions.length <= 0.4){
    finalScore = 'a filthy mudblood';
  } else if (STORE.score / STORE.questions.length <= 0.6) {
    finalScore = 'a muggle wizard';
  } else if (STORE.score / STORE.questions.length <= 0.8) {
    finalScore = 'a student wizard';
  } else if (STORE.score / STORE.questions.length <= 1) {
    finalScore = 'an auror';
  }
  return finalScore;
}

// results page
// see total score
// how many questions right/wrong
// start new quiz from here
function displayFinal() {
  // hide stats
  $('.stats').hide();
  let userScore = finalScore();
  // show score
  $('.js-output').html(`
  <section class='feedback'><p>You got ${STORE.score} out of ${STORE.questions.length} correct!</p>
  <p>You are ${userScore}</p>
  </section>
  <button class='js-restart button'>Start over</button>
  `);

  // on click 'restart quiz'
  $('.js-restart').on('click', function(){
    $('.js-output').children().remove();
    STORE.questionNum=0;
    STORE.score=0;
    $('.js-score').text(STORE.score);
    $('.js-question-number').text(1);
    $('.stats').show();
    generateQuestion();
  });
}

function main() {
  startQuiz();
  handleAnswerSubmission();
}

$(main);