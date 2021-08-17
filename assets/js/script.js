$(document).ready(function () {
    hideContent();
    gameScreen();
    $('#mute-btn').click(function() {
        controlVolume();     
    });

    $('.difficulty-btn').click(function(){
        if($(this).is('#easy')){
            console.log('easy');
            cardNumber = 8;
        } else if($(this).is('#medium')){
            cardNumber = 16;
        } else if($(this).is('#hard')){
            cardNumber = 24;
        } else {
            alert('Difficulty was not picked!!!');
        }
        startTimer();
        gameScoreConatainer();
        addCardContainer();
        createCards(cardNumber);
        addImagesToCards();
        shuffleCards();
        $('#choose-difficulty').fadeIn('slow');
        flipCards();
    });

    
    //----------------------------------------Choose difficulty button---------------------//
    $('#choose-difficulty').click(function () {
        $('#choose-difficulty').fadeOut('fast');
        $('.card-container').children('.card').remove();
        $('.card-container').first().children('div').removeClass('hidden');
        $('.game-info-container').removeClass('visible');
        clearInterval(timer);
        seconds = 0;
        $('#time-pass').text(seconds);
        moves = 0;
        $('#moves').text(moves);
    });
});


//------------------------------------------------------Hide/show content behind game screen-----------------------------//

function hideContent(){
    $('.game-title, .more-info-container, .game-container').hide();
}

function showContent(){
    $('.game-title, .more-info-container, .game-container').fadeIn('medium');
}

//---------------------------------------------------- Mute On/Off button control ----------------------------------//
function controlVolume() {
    if (bgSound.volume === 0) {
       bgSound.play();
       victorySound.volume = 0.5;
       bgSound.volume = 0.5;
       $('#mute-btn').empty().append('<i class="fas fa-volume-up"></i>');
    }else{
        bgSound.pause();
        victorySound.volume = 0;
        bgSound.volume = 0;
        $('#mute-btn').empty().append('<i class="fas fa-volume-mute"></i>');
    }
}

//---------------------------------------------- Victory sound/ background music ----------------------------//
var victorySound = document.createElement('audio');
victorySound.src = 'assets/sounds/victory.wav';
victorySound.volume = 0.5;
victorySound.autoPlay = false;
victorySound.preLoad = true;
victorySound.controls = true;

var bgSound = document.createElement('audio');
bgSound.src = 'assets/sounds/bg_music.wav';
bgSound.volume = 0.5;
bgSound.autoPlay = false;
bgSound.preLoad = true;
bgSound.controls = true;
bgSound.loop = 'loop';

// stackowerflow creating image array
var createImage = function (src, nameOfClass, title) {
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
    $('.game-screen').addClass('visible');
    $('.game-screen').click(function () {
        $('.game-screen').fadeOut('slow').removeClass('visible');
        bgSound.play();
        showContent();
        $('#choose-difficulty').hide();
    });
};

//------------------------------------------- victory screen------------------------------------------//
function victoryScreen() {
    $('.victory-screen, .victory-overlay-screen').fadeIn('slow').css('display', 'flex').addClass('visible');
    $('.results').text('You did it in: \n' + $('#time-pass').text() + ' seconds and ' + $('#moves').text() + ' moves');
    $('.continue-btn').click(function () {
        $('.victory-screen, .victory-overlay-screen').fadeOut('fast').removeClass('visible');
        $('.card-container').children('.card').remove();
        $('.card-container').first().children('div').removeClass('hidden');
        $('.game-info-container').removeClass('visible');
        $('#choose-difficulty').hide();
        bgSound.play();
        clearInterval(timer);
        seconds = 0;
        $('#time-pass').text(seconds);
        moves = 0;
        $('#moves').text(moves);
    });
};

//----------------------------------------------------Add Game score container--------------------------------//
function gameScoreConatainer() {
    $('.game-info-container').addClass('visible');
}

//------------------------------------------------ Add card container-----------------------------------//
function addCardContainer(){
    $('.card-container').children('.card').remove();
    $('.card-container').find('#loader').addClass('hidden');
};

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
        allFrontCards.slice(j * 2, j * 2 + 2).append(images[j]);
    };
};

//------------------------------------- start timer ---------------------------------------//
var timer;
var seconds = 0;
function startTimer() {
    timer = setInterval(function () {
        ++seconds;
        $('#time-pass').text(seconds);
        console.log(seconds);
    }, 1000);
};

//--------------------------------------- shuffle cards Fisher–Yates shuffle wikipedia --------------------------------------------//
function shuffleCards() {
    let cards = $('.card');
    for (let i = cards.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        cards[randomIndex].style.order = i;
        cards[i].style.order = randomIndex;
    }
};

//--------------------------------------- check for victory-------------------------------------------------------//
function checkForWin() {
    if ($('.flip').length === $('.card').length) {
        clearInterval(timer);
        setTimeout(function () {
            bgSound.pause();
            bgSound.currentTime = 0;
            console.log('You won!!');
            victorySound.play();
            victoryScreen();
        }, 500,);
    }
};

//--------------------------------------------- flip cards back if they not match--------------------------------------//
function flipCardsBack () {
    setTimeout(function () {
        $('.selected').each(function () {
            $(this).removeClass('selected flip');
        });
    }, 1000);
};

//------------------------------------flip clicked cards(count moves) and check for a match-------------------------------------------------//
function flipCards() {
    let moves = 0;
    $('#moves').text(moves);
    $('.card').click(function () {
        //--- allow to flip only two cards at a time
        if ($('.selected').length >= 2) {
            return;
        } else {
            // count moves
            if (!$(this).hasClass('selected')) {
                moves++;
            };
            $('#moves').text(moves);
            // add selected class
            $(this).addClass('selected flip');
            //----- check if the cards match
            if ($('.selected').length === 2) {
                if ($('.selected').first().find('img').attr('src') == $('.selected').last().find('img').attr('src')) {
                    console.log(seconds, moves);
                    $('.selected').each(function () {
                        $(this).removeClass('selected').unbind('click');
                    });
                        checkForWin();
                } else {
                    console.log('not matched');
                    flipCardsBack();
                };
            };
        };
    });
};