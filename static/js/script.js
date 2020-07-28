//challenge 1:age in days
function ageInDays(){
    var birthyear=prompt("What year were you born...Good friend ?")
    var ageInDayss = (2020-birthyear)*365;
    var h1 = document.createElement('h1')
    var textAnswer = document.createTextNode('You are '+ageInDayss+ ' days old') 
    h1.setAttribute('id','ageInDays')
    h1.appendChild(textAnswer)
    document.getElementById('flex-box-result').appendChild(h1);

}

function reset()
{
    document.getElementById('ageInDays').remove();

}
//--------------------------------------------------
function generateImage(){
    var image=document.createElement('img')
    var div = document.getElementById('flex-image-gen')
    image.setAttribute("src","https://tse2.mm.bing.net/th?id=OIP.1I_7dAU0P52DfWvZs67QeAHaEZ&pid=Api&P=0&w=281&h=168")
    //image.src="https://tse2.mm.bing.net/th?id=OIP.1I_7dAU0P52DfWvZs67QeAHaEZ&pid=Api&P=0&w=281&h=168"
    div.appendChild(image)
}
//------------------------------------------------

function rpsGame(yourChoice){
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    results = decideWinner(humanChoice, botChoice) //[1,0],[0,1],[0.5,0.5]
    message = finalMessage(results) //dictionary = string + color ...win green..
    rpsFrontEnd(humanChoice, botChoice, message);
}

function randToRpsInt(){
    return Math.floor(Math.random()*3);
}

function numberToChoice(number){
    return ['rock','paper','scissors'][number];
}

function decideWinner(humanChoice,botChoice){
    var rpsDatabase={
        'rock':{'rock':0.5 , 'paper':0, 'scissors':1 },
        'paper':{'rock':1 , 'paper':0.5, 'scissors':0 },
        'scissors':{'rock':0 , 'paper':1, 'scissors':0.5 },
    }
    var yourScore = rpsDatabase[humanChoice][botChoice];
    var botScore = rpsDatabase[botChoice][humanChoice];

    return [yourScore,botScore];
}

function finalMessage([yourScore,botScore]){
    if (yourScore === 0){
        return {'message':'You Lost' , 'color' : 'red'}
    }else if(yourScore === 0.5){
        return {'message':'You tied' , 'color' : 'yellow'}
    }else{
        return {'message':'You Won' , 'color' : 'green'}
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, message){
    var imgDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }
    //removing all images
    document.getElementById('rock').remove()
    document.getElementById('paper').remove()
    document.getElementById('scissors').remove()

    //showing chosen images
    var humanDiv = document.createElement('div')
    var botDiv = document.createElement('div')
    var msgDiv = document.createElement('div')
    humanDiv.innerHTML = "<img src =" + imgDatabase[humanImageChoice]+ " style='box-shadow: 0px 10px 50px rgba(0,70,50,1);' >"
    botDiv.innerHTML = "<img src =" + imgDatabase[botImageChoice]+ " style='box-shadow: 0px 10px 50px rgba(170,50,50,0.7);' >"
    msgDiv.innerHTML = "<h1 style='color:" + message['color'] + "; font-size:50px; padding :20px; '>" +message['message'] + "<h1>" 
    console.log(msgDiv)
    document.getElementById('flex-box-rps-div').appendChild(humanDiv)
    document.getElementById('flex-box-rps-div').appendChild(msgDiv)
    document.getElementById('flex-box-rps-div').appendChild(botDiv)
}
//----------------------------------------------------------------------
var all_buttons = document.getElementsByTagName('button');
var copyAllButtons=[];
for(var i=0;i<all_buttons.length;i++){
copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThingy)
{   
    if(buttonThingy.value === 'red')
        buttonRed(all_buttons);
    else if(buttonThingy.value === 'green')
        buttonGreen(all_buttons);
    else if(buttonThingy.value === 'reset')
        buttonColorReset(all_buttons,copyAllButtons);
    else if(buttonThingy.value === 'random')
        buttonRandom(all_buttons);
}

function buttonRed(){
    for(let i=0;i<all_buttons.length;i++){
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-danger');
    }
}

function buttonGreen(){
    for(let i=0;i<all_buttons.length;i++){
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-success');
    }
}

function buttonColorReset(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);    
    }
}

function buttonRandom(){
    var choices=['btn-primary','btn-success','btn-danger','btn-warning']
    
    for(let i=0;i<all_buttons.length;i++){
        var ranNum=Math.floor(Math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[ranNum]); 
    }
    
}
//-------------challenge 5---------------------------------------------------
var blackjackGame={
    'you' : {'scorespan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer' : {'scorespan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards': [2,3,4,5,6,7,8,9,10,'A','J','Q','K'],
    'cardsMap':{'2':2, '3':3 , '4':4,  '5':5,  '6':6,  '7':7,  '8':8,  '9':9 , 
                 '10':10, 'A':[1,11],  'J':10,  'Q':10, 'K':10 },
    'wins':0,
    'loses':0,
    'draws':0,
    'isStand':false,
    'turnOver':false,
}

const you=blackjackGame['you'];
const dealer=blackjackGame['dealer'];
const hitSound= new Audio('static/images/swish.m4a')
const winSound = new Audio('static/images/cash.mp3')
const lostSound = new Audio('static/images/aww.mp3')

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);

function randomCard(){
    let randomIndex=Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function blackjackHit(){
    if(blackjackGame['isStand']==false){
        let card=randomCard();
        showCard(you,card);
        updateScore(card,you);
        showScore(you);
    }
}

function showCard(activePlayer,card){
    if(activePlayer['score']<=21){
        let CardImg=document.createElement('img');
        CardImg.src=`static/images/${card}.png`;
        hitSound.play();
        document.querySelector(activePlayer['div']).appendChild(CardImg)
    }    
}

function blackjackDeal(){
    if(blackjackGame['turnOver']===true){
        let YourImages = document.querySelector('#your-box').querySelectorAll('img');
        let DealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        for(let i=0;i<YourImages.length;i++){
            YourImages[i].remove();
        }
        for(let i=0;i<DealerImages.length;i++){
            DealerImages[i].remove();
        }
        you['score']=0;
        dealer['score']=0;
        document.querySelector('#your-blackjack-result').textContent=0;
        document.querySelector('#dealer-blackjack-result').textContent=0;
        document.querySelector('#your-blackjack-result').style.color='#fff';
        document.querySelector('#dealer-blackjack-result').style.color='#fff';

        document.querySelector('#blackjack-result').textContent="Let's Play!"
        document.querySelector('#blackjack-result').style.color='black'
        blackjackGame['isStand']=false;
        blackjackGame['turnOver']=false;
    }
}

function updateScore(card,activePlayer){
    //if adding 11 keeps me below 21 add 11 else 1 in case of an ace
    if(card==='A'){
        if(activePlayer['score']+ blackjackGame['cardsMap'][card][1]<=21)
            activePlayer['score'] +=blackjackGame['cardsMap'][card][1];
        else
            activePlayer['score'] +=blackjackGame['cardsMap'][card][0];
    }
    else
    activePlayer['score'] +=blackjackGame['cardsMap'][card];
}

function showScore(activePlayer){
    if(activePlayer['score']>21){
        document.querySelector(activePlayer['scorespan']).textContent='BUST';
        document.querySelector(activePlayer['scorespan']).style.color='red';
    }else
    document.querySelector(activePlayer['scorespan']).textContent=activePlayer['score'];
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function dealerLogic(){
    blackjackGame['isStand']=true;
    while(dealer['score']<16 && blackjackGame['isStand']===true){
        let card=randomCard()
        showCard(dealer,card)
        updateScore(card,dealer)
        showScore(dealer);
        await sleep(1000);
    }
    blackjackGame['turnOver']=true;
    let winner=computeWinner();
    showResult(winner);
    
}

//computing winner
function computeWinner(){
    let winner;

    if(you['score']<=21){

        if(you['score']>dealer['score'] || (dealer['score']>21 )){
            blackjackGame['wins']++;
            winner=you;

        }else if(you['score']<dealer['score']){
            blackjackGame['loses']++;
            winner=dealer;

        }else if(you['score']===dealer['score']){
            blackjackGame['draws']++;
        }

    }else if(you['score']>21 && dealer['score']<=21){
        blackjackGame['loses']++;
        winner=dealer;

    }else if(you['score']>21 && dealer['score']>21){
        blackjackGame['draws']++;
    }
    console.log(blackjackGame)
    return winner;
}

function showResult(winner){
    if(blackjackGame['turnOver']===true){
        let msg,msgColor;
        if(winner===you){
            document.querySelector('#wins').textContent=blackjackGame['wins'];
            msg="You Won!";
            msgColor='green';
            winSound.play();

        }else if(winner===dealer){
            document.querySelector('#losses').textContent=blackjackGame['loses'];
            msg="You Lost...!";
            msgColor='red';
            lostSound.play();

        }else{
            document.querySelector('#draws').textContent=blackjackGame['draws'];
            msg="You drew!!";
            msgColor='yellow';
        }
        document.querySelector('#blackjack-result').textContent=msg;
        document.querySelector('#blackjack-result').style.color=msgColor;   
    }
}