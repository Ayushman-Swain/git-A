const questions = [
    {
        question: "How can e-waste be recycled properly?",
        answers: [
            { text: "Throw it in a landfill", correct: false},
            { text: "Take it to a certified e-waste recycler", correct: true},
            { text: "Incinerate it", correct: false},
            { text: "Burn it in an open area", correct: false},
        ]     
    },
    {
        question: "What percentage of global e-waste is actually recycled properly?",
        answers: [
            { text: "10%", correct: false},
            { text: "20%", correct: true},
            { text: "40%", correct: false},
            { text: "80%", correct: false},
        ]  
    },
    {
        question: "Which of the following materials found in e-waste can be harmful if not disposed of properly?",
        answers: [
            { text: "Lithium", correct: false},
            { text: "Zinc", correct: false},
            { text: "Mercury", correct: true},
            { text: "Magnesium", correct: false},
        ]  
    },
    // {
    //     question: "Which of the following is a step you can take to reduce e-waste?",
    //     answers: [
    //         { text: "Repair and reuse old electronics", correct: true},
    //         { text: "Always buy new devices", correct: false},
    //         { text: "Store unused electronics in the attic", correct: false},
    //         { text: "Dump electronics in regular trash", correct: false},
    //     ]  
    // },
    // {
    //     question: "Which material commonly found in electronics is a concern due to its toxic properties?",
    //     answers: [
    //         { text: "Aluminum", correct: false},
    //         { text: "Plastic", correct: false},
    //         { text: "Cadmium", correct: true},
    //         { text: "Silicon", correct: false},
    //     ]  
    // }
    // {
    //     question: "Which of the following is NOT a common step in the e-waste recycling process?",
    //     answers: [
    //         { text: "Shredding the items into smaller pieces", correct: false},
    //         { text: "Sorting out toxic chemicals", correct: false},
    //         { text: "Extracting valuable metals", correct: false},
    //         { text: "Incinerating electronics", correct: true},
    //     ]  
    // },
    // {
    //     question: "What is the term for the process of extracting valuable metals from e-waste?",
    //     answers: [
    //         { text: "E-waste recycling", correct: false},
    //         { text: "E-waste mining", correct: true},
    //         { text: "E-waste refurbishing", correct: false},
    //         { text: "E-waste extraction", correct: false},
    //     ]  
    // },
    // {
    //     question: "Which country generates the most e-waste per capita?",
    //     answers: [
    //         { text: "United States", correct: false},
    //         { text: "Germany", correct: false},
    //         { text: "China", correct: false},
    //         { text: "Norway", correct: true},
    //     ]  
    // },
    // {
    //     question: "How can consumers help reduce the environmental impact of e-waste?",
    //     answers: [
    //         { text: "By choosing to repair electronics instead of discarding them", correct: false},
    //         { text: "By recycling their electronics through proper channels", correct: false},
    //         { text: "By donating old devices to others", correct: false},
    //         { text: "All of the above", correct: true},
    //     ]  
    // },
    // {
    //     question: "Which of the following is an example of extended producer responsibility (EPR) in the context of e-waste?",
    //     answers: [
    //         { text: "Manufacturers take back their products for recycling after consumers are done with them", correct: true},
    //         { text: "Consumers are responsible for disposing of their electronics at landfills", correct: false},
    //         { text: "Government enforces e-waste regulations on local recycling centers", correct: false},
    //         { text: "None of the above", correct: false},
    //     ]  
    // }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo +". "+ currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect"); 
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();


