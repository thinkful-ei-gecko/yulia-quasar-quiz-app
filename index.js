'use strict';

// start quiz on page load
// handle submit button to start quiz
function startQuiz() {
  let questionNum = 0;

  $('.js-start-quiz').on('click', event => {
    console.log('button press');
    generateQuestion(event, questionNum);
  });
}

// track progress
function quizProgress() {
  questionNum++;
}

// record score
function tallyScore() {

}

// generate html for the questions and answers
function generateQuestion(event, num) {
  const questionHTML = `
  <section>
    <h2>${STORE[num].question}</h2>
    <form>
        <label for='answer1'>
            <input name='answerGroup' id='answer1' type="radio">${STORE[num].answers[0]}</input>
        </label>
        <label for='answer2'>
            <input name='answerGroup' id='answer2' type="radio">${STORE[num].answers[1]}</input>
        </label>
        <label for='answer3'>
            <input name='answerGroup' id='answer3' type="radio">${STORE[num].answers[2]}</input>
        </label>
        <label for='answer4'>
            <input name='answerGroup' id='answer4' type="radio">${STORE[num].answers[3]}</input>
        </label>
        <button>Submit</button>
    </form>
  </section>`;
  
  $(event.currentTarget).parent().html(questionHTML);
  $(event.currentTarget).remove();
  
}



// record user answer 
function handleAnswerSubmission() {

  quizProgress();

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



$(startQuiz);