let quesdiv= document.querySelector("#quest");
let optiondiv=document.querySelector("#optn");
let scorediv=document.querySelector("#reslt");
let targetQuestion=0;
let submit=document.querySelector("#btn");
let startbtn=document.querySelector("#start");
let score= 0;
let questions=[];
let currentques;
questioncont=document.querySelector("#quesdiv");





startbtn.addEventListener("click",startfunc);//2

function startfunc(e){
  e.preventDefault();
  console.log("sgt");
  startbtn.style.display="none";
  quesdiv.style.display="block"
  getques();


};









////api request 

   

    async function getques() {

        
        let response= await fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple");
        if(!response.ok){
          document.querySelector("form").innerHTML=`<b style="color:red">sorry something went wrong , try again!  </b>`;
        }

      
        const data = await response.json();
   
      
        const results = data.results;
        questions=results;
        /*questions = questions.sort(() => Math.random() - .5);*/

        currentques=0;
        
       

        //random options 
        displaynext(0); 

        submit.style.display="block";//show button 


        }
        console.log(questions);



        

    

    

    
//subit    
    submit.addEventListener("click", (event) => {
      let useranswer;


        event.preventDefault();
        let a=document.getElementsByName("Form1");// name  of radio buttons to loop at [must be same name return arr
        
        for (i = 0; i < a.length; i++) {
          if (a[i].checked){
            console.log(a[i].value); // answer of user 
             useranswer=a[i].value;
            console.log("correctans : " +questions[currentques].correct_answer ); //correct ans
            if(questions[currentques].correct_answer== useranswer){//if target question  correctanswer == choseen by user
              score++;//add 1

              
            }

          }
        
          

      }
      if(!useranswer){//user never choseen[!--->not means never happened]
        return; //stop  for loop [not go to next qston]
      }
      
      //reach next question
      if(currentques<questions.length-1){
        currentques++; //next question
      displaynext(currentques); //put 0 , 1 ,2 ...10 into function display html code


      }else{ //until 10 questions ended
        console.log("score " + score);
        
        quesdiv.innerHTML=`<h2 class="text-success fw-bold" > score is ${score}</h2>`;
        submit.style.display="none";
      }

        
      
      });
      




    function displaynext(quesN) //فوق مررت الcureentques كمتغير بيزيد واحد كل مرة لحد 10
    //content of question div 
    {
      //quesN ------> parameter in 
      quesdiv.innerHTML=
      `
       <p class="fw-bolder"> choose the correct answer</p>

      <h5 class="text-primary">${questions[quesN].question}</h5> 
      <div class=container>
                  
<div class="form-check  ">
<input class="form-check-input" type="radio" name="Form1"  value="${questions[quesN].correct_answer}" >
<label class="form-check-label" for="form1Option1">
${questions[quesN].correct_answer}
</label>
</div>

<div class="form-check">
<input class="form-check-input" type="radio" name="Form1"  value="${questions[quesN].incorrect_answers[0]}">
<label class="form-check-label" for="form1Option2">
${questions[quesN].incorrect_answers[0]}
</label>
</div>

<div class="form-check">
<input class="form-check-input" type="radio" name="Form1"  value="${questions[quesN].incorrect_answers[1]}">
<label class="form-check-label" for="form1Option2">
${questions[quesN].incorrect_answers[2]}
</label>
</div>

<div class="form-check pb-4">
<input class="form-check-input" type="radio" name="Form1" id="form1Option3" value="${questions[quesN].incorrect_answers[2]}">
<label class="form-check-label" for="form1Option2">
${questions[quesN].incorrect_answers[1]}
</label>
</div>


      </div>


      `


      
    }