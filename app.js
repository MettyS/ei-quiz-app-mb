/**
 * Example store structure
 */
'use strict';

const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What color is broccoli?',
      answers: [
        'red',
        'orange',
        'pink',
        'green'
      ],
      correctAnswer: 'green'
    },
    {
      question: 'What is the current year?',
      answers: [
        '1970',
        '2015',
        '2019',
        '2005'
      ],
      correctAnswer: '2019'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};


function handleSubmit(){
  console.log("submitButton pressed!")
}


function generateQuestion(qString) {
  return `<div id='question-prompt' class='wireframe-outline'>${qString}</div>`;
}

function  generateAnswerItem(qString) {
  return `<li class='wireframe-outline'><input type="radio"  id="" name="" value=""><label for="">${qString}</label></li>`;
}

function generateAnswers(qArray) {
  console.log('question array is: ');
  console.log(qArray);
  let answers = qArray.map(function (question) {
    return generateAnswerItem(question); //returns the generated html for the current question in array
  });
  let answersString = answers.join(' ');    // SHOULD THIS JOIN????
  console.log(answers);
  console.log(answersString);

  let answersSection = `<div id='answer-section' class='wireframe-outline'>
                          <form action="">
                            <ul class='wireframe-outline'>
                              ${answersString}
                            </ul>
                            <input type="submit" value="submit" />
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

function render() {
  let index = store['questionNumber'];
  let htmlString = generateMain((store['questions'])[index]);

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