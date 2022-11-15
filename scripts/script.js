let deck = []           //總牌組
let yourDeck = [];      //玩家的牌組
let dealerDeck = [];    //莊家的牌組
let yourPoint = 0;      //玩家的點數
let dealerPoint = 0;    //莊家的點數
let inGame = false;     //判斷是否處於遊戲狀態中
let winner = 0; // 0:未定；1:玩家贏；2：莊家贏；3：平手

//主程式，控制流程
$(document).ready(()=>{
    initCards();
    initButtons()
})

//--初始化所有的牌背面文字，改成客製化文字
function initCards(){
    $('.theCard').html('火');
}

//--初始化所有按鈕
//--按鈕一：重新開始一個新按鈕。
function initButtons(){
    $('#action-new-game').click(evt=>{
        initCards() //所有的牌面重新初始化
        newGame();
    })
    $('#action-hit').click(evt=>{
        evt.preventDefault();
        yourDeck.push(deal());
        renderGameTable();
    })
    $('#action-stand').click(evt=>{
        evt.preventDefault();
        dealerDeck.push(deal());
        dealerRound()               //進入自動化程序
    })
}

//功能按鍵：重新開始遊戲
//步驟一：先要有一幅牌，建立卡牌，並完成洗牌。
//步驟二：洗牌
//步驟三：發牌
function newGame(){
    resetGame()
    deck = shuffle(buildDeck());        //建立一個卡牌，並完成洗牌
    //---
    yourDeck.push(deal());
    dealerDeck.push(deal());
    yourDeck.push(deal());
    inGame = true;
    $('.your-cards').removeClass('win');
    $('.dealer-cards').removeClass('win');
    renderGameTable();
}

//發牌，從第一個元素一個一個取出
function deal(){
    return deck.shift();
}


//--建立卡牌
function buildDeck(){
    for(let suit = 1; suit<=4; suit++){
        for(let number = 1; number<=13; number++){
            let c = new Card(suit, number);
            deck.push(c);
        }
    }
    return deck;    //回傳的一個新的牌組，尚未洗牌
}

//把資料傳到牌桌
//---秀出牌面
//---秀出花色
//---計算點數
function renderGameTable(){
    //牌面秀出來
    showPlayersCards()
    //算點數
    showUserPoint()

    //論輸贏
    checkWinner()
    //蓋印章
    showWinStamp()
    //控制兩顆按鈕是否disable
    buttonControl()

}

function showUserPoint(){
    yourPoint = calPoint(yourDeck)
    dealerPoint = calPoint(dealerDeck)
    $('.your-cards h1').html(`你 (${yourPoint})點`);
    $('.dealer-cards h1').html(`莊家 (${dealerPoint})點`);
    if(yourPoint>=21 || dealerPoint>=21){
        inGame = false;
    }
}

function buttonControl(){
    //複雜寫法(正常寫法)
    // if(inGame){
    //     $('#action-hit').attr('disabled', false)
    //     $('#action-stand').attr('disabled', false)
    // }else{
    //     //當遊戲勝負已定時，inGame就會等於false
    //     $('#action-hit').attr('disabled', true)
    //     $('#action-stand').attr('disabled', true)
    // }
    //簡潔的寫法....
    $('#action-hit').attr('disabled', !inGame)
    $('#action-stand').attr('disabled', !inGame)
}

function showPlayersCards(){
    yourDeck.forEach((card, i)=>{
        let theCard = $(`#yourCard${i+1}`);
        theCard.html(card.cardNumber());
        //使用prev()，來呼叫前一個標籤，在這裡就是span
        theCard.prev().html(card.cardSuit());
    })
    dealerDeck.forEach((card, i)=>{
        let theCard = $(`#dealerCard${i+1}`);
        theCard.html(card.cardNumber());
        //使用prev()，來呼叫前一個標籤，在這裡就是span
        theCard.prev().html(card.cardSuit());
    })
}

function checkWinner(){
    switch(true){
        //1. 如果玩家21點，玩家贏
        case yourPoint == 21:
            winner = 1
            break;
        //2. 如果點數爆
        //2.1 玩家點數爆
        case yourPoint >21:
            winner =2;
            break;
        //2.2 莊家點數爆
        case dealerPoint >21:
            winner =1;
            break;
        //3. 平手
        case dealerPoint == yourPoint:
            winner = 3;
            break;
        // 0. 比點數
        case dealerPoint > yourPoint:
            winner = 2;
            break;            

        default:
            winner =0;
            break;
    }
}

function showWinStamp(){
    switch(winner){
        case 1:
            $('.your-cards').addClass('win');
            break;
        case 2:
            $('.dealer-cards').addClass('win');
            break;
        case 3: //平手
            break;
        default:
            break;
    }
}

//傳入玩家或庄家的牌，計算點數多少
function calPoint(deck){
    let point = 0;
    deck.forEach(card=>{
        point += card.cardPoint()
    })
    if(point>21){
        deck.forEach(card=>{
            if(card.cardNumber() =='A'){
                point -=10; //如果爆掉的話，A從11點變成1點
            }
        })
    }
    return point
}

function resetGame(){
    deck = []
    yourDeck = []
    dealerDeck = []
    yourPoint = 0
    dealerPoint = 0
    winner = 0
}

function dealerRound(){
    //1.發牌
    //2.如果點數 >= 玩家，結束，莊家贏
    //3.如果點數 <玩家，繼續發，重覆發
    //4.爆了，結束，玩家贏
    
    while(true){
        dealerPoint = calPoint(dealerDeck)
        if(dealerPoint < yourPoint){
            dealerDeck.push(deal());
        }else{
            break;
        }
    }
    inGame = false
    renderGameTable()
}

class Card{
    constructor(suit, number){
        this.suit = suit;
        this.number = number;
    }
    //點數
    cardPoint(){
        switch(this.number){
            case 1:
                return 11;
                break;
            case 11:
            case 12:
            case 13:
                return 10;
                break;
            default:
                return this.number;
                break;
        }
    }
    //花色
    cardSuit(){
        switch(this.suit){
            case 1:
                return '♠';
                break;
            case 2:
                return '♥';
                break;
            case 3:
                return '♣';
                break;
            case 4:
                return '♦';
                break;
        }
    }
    //牌面
    cardNumber(){
        switch(this.number){
            case 1:
                return 'A';
                break;
            case 11:
                return 'J';
                break;
            case 12:
                return 'Q';
                break;
            case 13:
                return 'K'
                break;
            default:
                return this.number
                break;
        }
    }
}

//--洗牌
//--使用 Fisher-Yates 演算法
//--參考算 https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}