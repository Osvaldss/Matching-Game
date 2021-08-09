$(document).ready(function () {
    
});
 //---------------------- when easy button clicked create easy difficulty game mode with 8 cards and 4 icon pairs from images array
 $('#easy').click(function() {

    $('.card-container').children('.card').remove();
    $('.card-container').find('#loader').addClass('hidden');
    gameScreen();
    createCards(8);
    addImagesToCards();
    shuffleCards();
    flipCards();
});


//---------------------- when medium button clicked create medium difficulty game mode with 16 cards and 9 icon pairs from images array
$('#medium').click(function() {
    $('.card-container').children('.card').remove();
    $('.card-container').find('#loader').addClass('hidden');
    gameScreen();
    createCards(16);
    addImagesToCards();
    shuffleCards();
    flipCards();
});


//---------------------- when hard button clicked create hard difficulty game mode with 24 cards and 12 icon pairs from images array
$('#hard').click(function() {
    $('.card-container').children('.card').remove();
    $('.card-container').find('#loader').addClass('hidden');
    gameScreen();
    createCards(24);
    addImagesToCards();
    shuffleCards();
    flipCards();
});

//----------------------------------------Choose difficulty button
$('#choose-difficulty').click(function(){
    $('.card-container').children('.card').remove();
    $('.card-container').first().children('div').removeClass('hidden');
    clearInterval(timer);
    seconds = 0;
    $('#time-pass').text(seconds);
    moves = 0;
    $('#moves').text(moves);
});

// stackowerflow creating image array
var createImage = function(src, nameOfClass, title){
    var img = new Image();
    img.src = src;
    img.className = nameOfClass;
    img.alt = title;
    return img;
};
var images = [];
images.push(createImage('assets/images/dribble.png', 'icon', 'Icon of Dribble'));
images.push(createImage('assets/images/facebook.png', 'icon', 'Icon of Facebook'));
images.push(createImage('assets/images/github.png', 'icon', 'Icon of GitHub'));
images.push(createImage('assets/images/google.png', 'icon', 'Icon of Google'));
images.push(createImage('assets/images/insta.png', 'icon', 'Icon of Instagram'));
images.push(createImage('assets/images/pinterest.png', 'icon', 'Icon of Pinterest'));
images.push(createImage('assets/images/soundcloud.png', 'icon', 'Icon of Soundcloud'));
images.push(createImage('assets/images/twitter.png', 'icon', 'Icon of Twitter'));
images.push(createImage('assets/images/yahoo.png', 'icon', 'Icon of Yahoo'));
images.push(createImage('assets/images/youtube.png', 'icon', 'Icon of Youtube'));
images.push(createImage('assets/images/rss.png', 'icon', 'Icon of RSS Feed'));
images.push(createImage('assets/images/blogger.png', 'icon', 'Icon of Blogger'));

//------------------------------------------- start game screen------------------------------------------//
function gameScreen() {
    $('div .start-game-screen').css('display', 'flex').addClass('visible');
    $('div .start-game-screen').click(function(){
        $('.start-game-screen').fadeOut('slow', clearInterval(timer), startTimer());
    });
}

//---------------------------------------------Create cards----------------------------------------------//
function createCards(cardNumber) {
    for (let i = 0; i < cardNumber; i++) {
        $('.card-container').append('<div class="card"></div>');
    };
    $('.card').append('<div class="card-back"></div>').append('<div class="card-front"></div>');  
};

//---------------------------------------------Add images to each card----------------------------------//
function addImagesToCards() {
    let allFrontCards = $('.card-front');
    for (let j = 0; j < images.length; j++) {
        allFrontCards.slice( j * 2, j * 2 + 2).append(images[j]);
    };
}; 

//------------------------------------- start timer ---------------------------------------//
var seconds = 0;
var timer;
function startTimer(){
    timer = setInterval(function () {
         $('#time-pass').text(seconds);
            seconds++;
     }, 1000);
};

//--------------------------------------- shuffle cards Fisher–Yates shuffle wikipedia --------------------------------------------//
function shuffleCards() {
    let cards = $('.card');
    for( let i = cards.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        cards[randomIndex].style.order = i;
        cards[i].style.order = randomIndex;
    }
};

//------------------------------------flip clicked cards(count moves) and check for a match-------------------------------------------------//
function flipCards() {
    let moves = 0;
    $('#moves').text(moves);
    $('.card').click(function(){
        //--- allow to flip only two cards at a time
        if($('.selected').length >= 2){
            return;
        } else {
        // count moves
        if(!$(this).hasClass('selected')){
            moves++;
        };
        $('#moves').text(moves);

        // add selected class
        $(this).addClass('selected flip');
        //----- check if the cards match
        if ($('.selected').length === 2){
            if($('.selected').first().find('img').attr('src') == $('.selected').last().find('img').attr('src')){
                $('.selected').each(function() {
                    $(this).removeClass('selected').unbind('click');
                });
                // play match music
            } else { 
                console.log('not matched');
                setTimeout (function() {
                    $('.selected').each(function() {
                        $(this).removeClass('selected flip');
                    }); 
                }, 1000);
            };  
        };
    };
    });
};


