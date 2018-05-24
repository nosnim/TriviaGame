//set up variables for page structure
var quizContainer = $('#quiz')[0];
var resultsContainer = $('#results')[0];
var submitButton = $('#submit')[0];

//scroll to top of quiz on page load
$(document).ready(function(){
    $(this).scrollTop(0);
});


function buildQuiz() {
    var output = [];
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {
            var answers = [];
            for (letter in currentQuestion.answers) {
                answers.push(
                    `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]} 
            </label><br>`
                );
            }
            output.push(
                `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join('')} </div>`
            );
        }
    );
    quizContainer.innerHTML = output.join('');
}

//calculate final score
function showResults() {
    var answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;
    myQuestions.forEach((currentQuestion, questionNumber) => {
        var answerContainer = answerContainers[questionNumber];
        var selector = 'input[name=question' + questionNumber + ']:checked';
        var userAnswer = (answerContainer.querySelector(selector) || {}).value;
        //color code correct, incorrect answers at click of submit button
        if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
            answerContainers[questionNumber].style.color = 'lightgreen';
        }
        else {
            answerContainers[questionNumber].style.color = 'red';
        }
    });

    //display final score and message based on score
    if (numCorrect === 10) {
        resultsContainer.innerHTML = numCorrect + ' out of ' + myQuestions.length + '.  Congratulations, Ace!';
    }
    else if (numCorrect > 6) {
        resultsContainer.innerHTML = numCorrect + ' out of ' + myQuestions.length + '.  Not too shabby!';
    }
    else {
        resultsContainer.innerHTML = numCorrect + ' out of ' + myQuestions.length + '.  Better luck next time!';
    }
}
 //quiz questions, answers set up as objects within array
var myQuestions = [{
    question: "What is the busiest train station in the world?",
    answers: {
        a: "Grand Central, New York",
        b: "Shinjuku, Tokyo",
        c: "Beijing Central, China",
        d: "Gard du Nord, Paris"
    },
    correctAnswer: 'b'
},
{
    question: "What is a group of fish referred to as?",
    answers: {
        a: "School",
        b: "Flock",
        c: "Herd",
        d: "Gaggle",
    },
    correctAnswer: 'a'
},
{
    question: "What river flows through the Grand Canyon?",
    answers: {
        a: "Mississippi",
        b: "Green",
        c: "Amazon",
        d: "Colorado"
    },
    correctAnswer: 'd'
},
{
    question: "What is the capital of New York?",
    answers: {
        a: "New York City",
        b: "Buffalo",
        c: "Albany",
        d: "Ottawa"
    },
    correctAnswer: 'c'
},
{
    question: "What is the population of the United States",
    answers: {
        a: "323 million",
        b: "376 million",
        c: "289 million",
        d: "403 million"
    },
    correctAnswer: 'a'
},
{
    question: "What is 27 x 14?",
    answers: {
        a: "378",
        b: "338",
        c: "398",
        d: "428"
    },
    correctAnswer: 'a'
},
{
    question: "What is the National animal of Scotland?",
    answers: {
        a: "Sheep",
        b: "Unicorn",
        c: "Badger",
        d: "Phoenix"
    },
    correctAnswer: 'b'
},
{
    question: "What is the longest river in the world?",
    answers: {
        a: "Mississippi",
        b: "Amazon",
        c: "Rhine",
        d: "Nile"
    },
    correctAnswer: 'd'
},
{
    question: "Cherophobia is the fear of what?",
    answers: {
        a: "Lions",
        b: "Hippopotamuses",
        c: "Having Fun",
        d: "Movies"
    },
    correctAnswer: 'c'
},
{
    question: "What is the world's fastest dog?",
    answers: {
        a: "Weimaraner",
        b: "Saluki",
        c: "Greyhound",
        d: "Malinois"
    },
    correctAnswer: 'c'
}];

//collect answer containers from the quiz
var answerContainers = quizContainer.querySelectorAll('.answers');

//set initial score of quiz
let numCorrect = 0;

//run the quiz function
buildQuiz();

//'listen' for the click button to tally the scores
submitButton.addEventListener('click', function() {
    showResults();
    clearTimeout(timerId);
});

// 30 second timer to complete the quiz
var timeLeft = 30;
var elem = $('#clock')[0];

var timerId = setInterval(countdown, 1000);

function countdown() {
    if (timeLeft == -1) {
        clearTimeout(timerId);
        showResults();
    } else {
        elem.innerHTML = timeLeft + ' seconds remaining';
        timeLeft--;
    }
}


