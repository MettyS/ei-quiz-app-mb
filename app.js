/**
 * Example store structure
 */
'use strict';

const store = {
  // 5 or more questions are required
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

//inside splash screen
//display info " this is a quiz about ...etc etc"
//press submit  button to begin quiz
//if submit is pressed 
//quize started equal true

function handleSubmit(){
  
  $('main').on('submit', 'form', function (e) {
    e.preventDefault();
    console.log('submitButton pressed!');
    if(!store.quizStarted){
      store.quizStarted = true;
      console.log('quiz should now be started!');
    }
    else if(store.questionNumber >= store.questions.length){
      store.quizStarted = false;
      store.questionNumber = 0;
      store.score = 0;
    }
    else {
      console.log($('input[name=answer]:checked'));
      let a = $('input[name=answer]:checked').val();
      console.log(`user's answer is`);
      console.log(a);
      let currentQ = store.questions[store.questionNumber];
      store.score += (currentQ.correctAnswer === a) ? 1 : 0;
      store.questionNumber++;
    } 

    render();
  });

  /*
  <title>jQuery Get Selected Radio Button Value</title>
<script>
$("input[type='button']"). click(function(){
var radioValue = $("input[name='gender']:checked"). val();
if(radioValue){
alert("Your are a - " + radioValue);
}
});
  */
  //if submit is pressed 
  //quize started equal true  

  // when submit is pressed 
  //increment question number
  //check right answer
  //if right answer checked 
  //then increment score 
  //if its not correct answer
  //score stays the same
}


function generateQuestion(qString) {
  return `<div id='question-prompt' class='wireframe-outline'>${qString}</div>`;
}

function  generateAnswerItem(qString) {
  return `<li class='wireframe-outline'><input type="radio" id="" name="answer" value="${qString}"><label for="">${qString}</label></li>`;
}

function generateAnswers(qArray) {
  let answers = qArray.map(function (question) {
    return generateAnswerItem(question); //returns the generated html for the current question in array
  });
  let answersString = answers.join(' ');

  let answersSection = `<div id='answer-section' class='wireframe-outline'>
                          <form action="">
                            <ul class='wireframe-outline'>
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

  let mainHtml = `${questionPrompt}${answerSection}`;
  return mainHtml;
}


function generateSplashMain(){
  let questionPrompt = generateQuestion('welcome to the quiz, please press START to begin.'); //this is giving a string
  let answerSection = `<div id='answer-section' class='wireframe-outline'>
                        <form action="">
                          <input class='submit-button' type="submit" value="START" />
                        </form>
                      </div>`;

  let splashScreen = questionPrompt + answerSection;
  return (splashScreen);
}

function generateFinalScreen(){
  let questionPrompt = generateQuestion('Thanks for taking the quiz! Your results are below, press "NEXT" to start over!');
  let answerSection = `<div id='answer-section' class='wireframe-outline'>
                        <form action="">
                          <p>You scored ${store.score} out of ${store.questions.length}</p>
                          <input class='submit-button' type="submit" value="NEXT" />
                        </form>
                      </div>`;
  return questionPrompt+answerSection;
}


function render() {

  //   //check if quiz started is true
  //   //if not render a splash
  //   let splashscreen = `<div id='answer-section' class='wireframe-outline'>
  //   <form action="">
  //     <ul class='wireframe-outline'>
  //     "welcome to the quiz, please press the submit button to  begin."
  //     </ul>
  //     <input type="submit" value="submit" />
  //   </form>
  // </div>`;

  // $('main').html(htmlString);

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

/*
handleSubmit()
//the user has submitted, evaluate their answer choice & go to next page

generateAnswerItem

generateQuestion

generateAnswers
{generate answeritem}

generateMain(store)
{generate Question}
{generate answer options}


render()

main(){


}
$(main);



*/

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)


/*
Boilerplate app structure for Quiz App project
I can see the code.

Who 'invented' the internet - Tim Berners-lee When was the first personal computer invented - 1974 What state was microsoft founded in - New Mexico Who was the first published programmer - Ada Lovelace

What visual element makes a PC run faster - RGB What are the four most common CHERRY MX key switch colors - Red, Brown, Blue, and Black What company just announced the 3060 ti gpu - Nvidia What pc component protects your computer from power surges - PSU
*/