
'use strict';

const store = {
  questions: [
    {
      question: 'What pc component protects your computer from power surges ? ',
      answers: [
        'CRT',
        'USB',
        'QWERTY',
        'PSU'
      ],
      correctAnswer: 'PSU'
    },
    {
      question: 'What company just announced the 3060 ti gpu ? ',
      answers: [
        'Intel',
        'Apple',
        'Nvidia',
        'AMD'
      ],
      correctAnswer: 'Nvidia'
    },
    {
      question: 'What are the four most common CHERRY MX key switch colors ? ',
      answers: [
        'Red, Brown, Blue and Black',
        'Red, Green, Blue, and Yellow',
        'Pink, Orange, Yellow, and Purple',
        'Blue, Green, Orange, and Black'
      ],
      correctAnswer: 'Red, Brown, Blue and Black'
    },
    {
      question: 'What visual element makes a PC run faster ? ',
      answers: [
        'CMYK',
        'RGB',
        'PAL',
        'NTSC'
      ],
      correctAnswer: 'RGB'
    },
    {
      question: 'Who was the first published programmer ? ',
      answers: [
        'Ada Lovelace',
        'Steve Wozniak',
        'John Carmack',
        'Daniell Bunten Berry'
      ],
      correctAnswer: 'Ada Lovelace'
    },
    {
      question: 'What state was Microsoft founded in ? ',
      answers: [
        'Washington',
        'New York',
        'New Mexico',
        'California'
      ],
      correctAnswer: 'New Mexico'
    },
    {
      question: 'Who invented the internet ? ',
      answers: [
        'Tim Berners-Lee',
        'Al Gore',
        'Bill Gates',
        'Alan Kay'
      ],
      correctAnswer: 'Tim Berners-Lee'
    },
    {
      question: 'When was the first personal computer invented ?',
      answers: [
        '1970',
        '1974',
        '2000',
        '1984'
      ],
      correctAnswer: '1974'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};


//press submit  button to begin quiz
//if submit is pressed 
//quiz started equal true  
//when submit is pressed 
//increment question number
//check right answer
//if right answer checked 
//then increment score 
//if its not correct answer
//score stays the same

function handleSubmit(){
  
  $('main').on('submit', 'form', function (e) {
    e.preventDefault();
    if(!store.quizStarted){
      store.quizStarted = true;
    }
    else if(store.questionNumber >= store.questions.length){
      store.quizStarted = false;
      store.questionNumber = 0;
      store.score = 0;
    }
    else {
      let a = $('input[name=answer]:checked').val();

      if(a !== undefined) {
        let currentQ = store.questions[store.questionNumber];
        store.score += (currentQ.correctAnswer === a) ? 1 : 0;
        store.questionNumber++;
      }
    } 

    render();
  });
}


function generateQuestion(qString) {
  return `<div id='question-prompt'>${qString}</div>`;
}

function generateScore() {
  let score = store.score;
  let qNum = store.questionNumber;
  let numQuestions = store.questions.length;
  return `<div id='score-section'>
            <div>${score} out of ${qNum} right</div>
            <div>${(numQuestions-qNum)} questions remain</div>
          </div>`;
}

function  generateAnswerItem(qString) {
  return `<li><input type="radio" id="" name="answer" value="${qString}"><label for="">${qString}</label></li>`;
}

function generateAnswers(qArray) {
  let answers = qArray.map(function (question) {
    return generateAnswerItem(question); //returns the generated html for the current question in array
  });
  let answersString = answers.join(' ');

  let answersSection = `<div id='answer-section'>
                          <form action="">
                            <ul>
                              ${answersString}
                            </ul>
                            <input class='submit-button' type="submit" value="SUBMIT" />
                          </form>
                        </div>`;

  return answersSection; //return an array of html strings
}

function generateMain(qObject) {
  let questionPrompt = generateQuestion(qObject['question']); //this is giving a string
  let answerSection = generateAnswers(qObject['answers']); //this is giving an array
  let scoreSection = generateScore();

  let mainHtml = `${questionPrompt}${answerSection}${scoreSection}`;
  return mainHtml;
}

//inside splash screen
//display info " this is a quiz about ...etc etc"
function generateSplashMain(){
  let questionPrompt = generateQuestion('welcome to the quiz, please press START to begin.'); //this is giving a string
  let answerSection = `<div id='answer-section''>
                        <form action="">
                          <input class='submit-button' type="submit" value="START" />
                        </form>
                      </div>`;

  let splashScreen = questionPrompt + answerSection;
  return (splashScreen);
}

function generateFinalScreen(){
  let questionPrompt = generateQuestion('Thanks for taking the quiz! Your results are below, press "NEXT" to start over!');
  let answerSection = `<div id='answer-section'>
                        <form action="">
                          <div id='final-score'>You scored ${store.score} out of ${store.questions.length}</div>
                          <input class='submit-button' type="submit" value="NEXT" />
                        </form>
                      </div>`;
  return questionPrompt+answerSection;
}


function render() {

  //   //check if quiz started is true
  //   //if not render a splash

  let index = store['questionNumber'];
  let htmlString = ' ';


  if(store.quizStarted === false) {
    htmlString = generateSplashMain();
  }
  else if(store.questionNumber >= store.questions.length) {
    htmlString = generateFinalScreen();
  }
  else{
    htmlString = generateMain((store['questions'])[index]);
  }

  $('main').html(htmlString);
}




function main() {
  handleSubmit();
  render();
}



$(main);