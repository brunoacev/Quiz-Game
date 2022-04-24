var questionsAsk = [];

// Questions of Game

const questions = [
    {
        Question: "Qual dessa linguagem não é considerada uma linguagem de programação?",
        Answs: ["Errado", "Errado", "Errado", "Certo"],
        Check: "resp3"
    },
    {
        Question: "Pergunta 0111?",
        Answs: ["Certo", "Errado", "Errado", "Errado"],
        Check: "0"
    },
    {
        Question: "Pergunta 0222",
        Answs: ["Errado", "Certo", "Errado", "Errado"],
        Check: "resp1"
    },
    {
        Question: "Pergunta 0333",
        Answs: ["Errado", "Errado", "Certo", "Errado"],
        Check: "resp2"
    },

]


// Game control variables

var numberOfQuestions = (questions.length - 1);

newQuestion(numberOfQuestions);


function reset_btn(){
    $(".respostas").each(function(){

        if ($(this).hasClass('select')){

            $(this).removeClass('select')
        }
    });
}

function newQuestion(maxQuestions){

    // Generate a random number
    let random = (Math.random() * maxQuestions).toFixed();

    // Convert to Number
    random = Number(random);
    

   

    // Check question for no repeat
    if(!questionsAsk.includes(random)){
        questionsAsk.push(random); // Question Asked

        var selectQuestions = questions[random].Question;
        

        // Change Questions and include #QuestionsAsk
        $("#QuestionsAsk").html(selectQuestions);
        $("#QuestionsAsk").attr('data-indice', random);

        // Fill answs with for
        for (i = 0 ; i < 4; i++) {
            $("#resp" + i).html(questions[random].Answs[i]);
        }

        // random answs
        var container = $("#Answers");
        var buttons = container.children();

        for (i = 0; i < buttons.length; i++){
            container.append(buttons.eq(Math.floor(Math.random() * buttons.length)));
        }
        
    }else{
        // if questions asked
        
        if (questionsAsk.length < numberOfQuestions +1){
            return newQuestion(maxQuestions);
        }else{
            
        }
    }

}

$(".respostas").click(function(){

    reset_btn();

    $(this).addClass('select')
});

// Check anwsr correct

$("#confirm").click(function(){

    var indice = $("#QuestionsAsk").attr('data-indice')
   
    var correctAnswr = questions[indice].Check;

    $('.respostas').each(function(){

        if ($(this).hasClass('select')){

            var selectAnswr = $(this).attr('id');

            if (correctAnswr == selectAnswr) {
                
                nextQuestion();
            }else{
                $('#'+correctAnswr).addClass('correct_answer');
                $('#'+selectAnswr).removeClass('select');
                $('#'+selectAnswr).addClass('wrong_answer');

                setTimeout(function(){
                    newGame();
                },4000);

            }
        }
    });

});

function newGame(){

    questionsAsk = [];
    reset_btn();
    newQuestion(numberOfQuestions);
}

function nextQuestion(){

    reset_btn();
    newQuestion(numberOfQuestions);
}
