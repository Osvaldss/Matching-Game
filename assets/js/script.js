$(document).ready(function () {
    gameScreen();
    $('#mute-btn').click(function () {
        controlVolume();
    });

    $('.difficulty-btn').click(function () {
        if ($(this).is('#easy')) {
            cardNumber = 8;
            gameType = "Easy";
        } else if ($(this).is('#medium')) {
            cardNumber = 16;
            gameType = "Medium";
        } else if ($(this).is('#hard')) {
            cardNumber = 24;
            gameType = "Hard";
        } else {
            alert('Difficulty was not picked!!!');
        }
        $('.game-container').removeClass('hidden');
        $('.score-board').css('display', 'none');
        startTimer();
        gameScoreConatainer();
        addCardContainer();
        createCards(cardNumber);
        addImagesToCards();
        shuffleCards();
        $('#back-to-menu-btn').fadeIn('slow');
        $('.more-info-container, .title-container').css('display', 'none');
        flipCards();
    });

    //----------------------------------------Go back to main screen---------------------//
    $('#back-to-menu-btn').click(function () {
        $('#back-to-menu-btn').hide();
        $('.card-container').children('.card').remove();
        $('.game-container').addClass('hidden');
        $('.difficulty-cont-wrapper').removeClass('hidden');
        $('.game-info-container').removeClass('visible');
        $('.more-info-container, .title-container').fadeIn('medium');
        clearInterval(timer);
        minutes = 0;
        seconds = 0;
        $('#time-pass-seconds, .time-pass-minutes').text(minutes).text(seconds);
        moves = 0;
        $('#moves').text(moves);
    });

    //-------------------------------------------Score board btn ---------------------------------------------//
    $('#score-board-btn').click(function () {
        $('.score-board').fadeIn('medium');
        $('.overlay-screen').addClass('show');
        $('.best-score-easy').text(bestScore[0]);
        $('.best-score-medium').text(bestScore[1]);
        $('.best-score-hard').text(bestScore[2]);
    });

    $('.close-scoare-board-btn').click(function () {
        $('.score-board').fadeOut(100);
        $('.overlay-screen').removeClass('show');
    });

    //----------------------------------------------------Info btn ----------------------------------------------//
    $('#info-btn').click(function () {
        $('.game-tutorial-container').fadeToggle('medium');
        $('.overlay-screen').addClass('show');
        setTimeout(function () {
            $('.score-board').css('display', 'none');
        }, 1000);
    });

    $('.next').click(function () {
        var currentStep = $('.active');
        var nextStep = currentStep.next();
    
        if(nextStep.length) {
            currentStep.removeClass('active').css('z-index', -10);
            nextStep.addClass('active').css('z-index', 10);
        }
    });
    
    $('.prev').click(function () {
        var currentStep = $('.active');
        var prevStep = currentStep.prev();
    
        if(prevStep.length) {
            currentStep.removeClass('active').css('z-index', -10);
            prevStep.addClass('active').css('z-index', 10);
        }
    });

    $('.close-guide-btn').click(function () {
        $('.game-tutorial-container').fadeOut(100);
        $('.overlay-screen').removeClass('show');
        if (!$('.step-container .step-info-container:first-child').hasClass('active')) {
            let currentActive = $('.active');
            currentActive.removeClass('active').css('z-index', -10);
            $('.step-container .step-info-container:first-child').addClass('active').css('z-index', -10);
        }
    });
});


//------------------------------------------- start game screen------------------------------------------//
function gameScreen() {
    $('.game-screen').fadeIn('medium').css('display', 'flex');
    $('.game-screen').click(function () {
        $('.game-screen').fadeOut('slow');
        $('.game-title, .more-info-container, .game-container, .game-tutorial-container, .difficulty-cont-wrapper').css('visibility', 'visible');
        bgSound.play();
        showContent();
        $('.game-container').addClass('hidden');
        $('#back-to-menu-btn').hide();
    });
}

//------------------------------------------------------Hide/show content behind game screen-----------------------------//
function hideContent() {
    $('.game-title, .more-info-container, .game-tutorial-container, .score-board').hide("fast");
    $('.game-container').addClass('hidden');
}

function showContent() {
    $('.game-title, .more-info-container').fadeIn('medium');
}

//---------------------------------------------------- Mute On/Off button control ----------------------------------//
function controlVolume() {
    if (bgSound.volume === 0) {
        bgSound.play();
        victorySound.volume = 0.5;
        bgSound.volume = 0.5;
        $('#mute-btn').empty().append('<i class="fas fa-volume-up"></i>');
    } else {
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


//-------------------------------------------------------------------- stackowerflow creating image array
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


//------------------------------------------- victory screen------------------------------------------//
function victoryScreen() {
    hideContent();
    $('.victory-screen').fadeIn('slow').css('display', 'flex').addClass('visible');
    $('.level-complete').text(gameType + ' difficulty');
    scoreByGameType(gameType);
    starRating(scoreRating);
    $('.game-score').text(scoreRating);
    checkForBestScore(scoreRating);
    $('.continue-btn').click(function () {
        showContent();
        $('.victory-screen').fadeOut('fast');
        $('.more-info-container, .title-container').fadeIn('medium');
        $('.game-container').addClass('hidden');
        $('.card-container').children('.card').remove();
        $('.difficulty-cont-wrapper').removeClass('hidden');
        $('.game-info-container, #new-best-score').removeClass('visible');
        $('#back-to-menu-btn').hide();
        $('#star-rating').empty();
        bgSound.play();
        clearInterval(timer);
        minutes = 0;
        seconds = 0;
        $('.time-pass-minutes, #time-pass-seconds').text(minutes).text(seconds);
        moves = 0;
        $('#moves').text(moves);
    });
}

//----------------------------------------------------Add Game score container--------------------------------//
function gameScoreConatainer() {
    $('.game-info-container').addClass('visible');
}

//------------------------------------------------- Counting score----------------------------//
function scoreByGameType(gameType) {
    let totalSeconds = parseInt($('#time-pass-seconds').text());
    let totalMinutes = parseInt($('.time-pass-minutes').text());
    let totalMoves = parseInt($('#moves').text());
    let levelCompleteTime;
    if (gameType === 'Easy') {
        console.log('Easy level chosen');
        levelCompleteTime = parseInt(60 - (totalSeconds + (60 * totalMinutes)));
        countScore(levelCompleteTime, totalMoves);
    } else if (gameType === 'Medium') {
        levelCompleteTime = parseInt(90 - (totalSeconds + (60 * totalMinutes)));
        console.log('Medium level chosen');
        countScore(levelCompleteTime, totalMoves);
    } else if (gameType === 'Hard') {
        console.log('Hard level chosen');
        levelCompleteTime = parseInt(120 - (totalSeconds + (60 * totalMinutes)));
        countScore(levelCompleteTime, totalMoves);
    }
}

var bestScore = [0, 0, 0];
function checkForBestScore(scoreRating) {
    if (gameType === "Easy" && scoreRating > bestScore[0]) {
        bestScore.splice(0, 1, scoreRating);
        console.log(bestScore);
        $('#new-best-score').addClass('visible');
        $('.best-score').text(bestScore[0]);
    } else if (gameType === "Medium" && scoreRating > bestScore[1]) {
        bestScore.splice(1, 1, scoreRating);
        console.log(bestScore);
        $('#new-best-score').addClass('visible');
        $('.best-score').text(bestScore[1]);
    } else if (gameType === "Hard" && scoreRating > bestScore[2]) {
        bestScore.splice(2, 1, scoreRating);
        console.log(bestScore);
        $('#new-best-score').addClass('visible');
        $('.best-score').text(bestScore[2]);
    } else {
        console.log('you didint beat your record');
    }
}

function countScore(levelCompleteTime, totalMoves) {
    console.log(levelCompleteTime, totalMoves);
    switch (true) {
        case levelCompleteTime > 50:
            partOfScoreOne = 250;
            break;
        case levelCompleteTime >= 40:
            partOfScoreOne = 200;
            break;
        case levelCompleteTime >= 30:
            partOfScoreOne = 150;
            break;
        case levelCompleteTime >= 20:
            partOfScoreOne = 100;
            break;
        case levelCompleteTime >= 10:
            partOfScoreOne = 50;
            break;
        case levelCompleteTime < 10:
            partOfScoreOne = 0;
            break;
        default:
            console.log("failed to count score one");
    }

    if (gameType === 'Easy') {
        switch (true) {
            case totalMoves >= 25:
                partOfScoreTwo = 0;
                break;
            case totalMoves >= 21 && totalMoves < 25:
                partOfScoreTwo = 50;
                break;
            case totalMoves >= 18 && totalMoves < 21:
                partOfScoreTwo = 100;
                break;
            case totalMoves >= 15 && totalMoves < 18:
                partOfScoreTwo = 150;
                break;
            case totalMoves >= 13 && totalMoves < 15:
                partOfScoreTwo = 200;
                break;
            case totalMoves < 13:
                partOfScoreTwo = 250;
                break;
            default:
                console.log("failed to count score two on easy level");
        }
    } else if (gameType === 'Medium') {
        switch (true) {
            case totalMoves >= 38:
                partOfScoreTwo = 0;
                break;
            case totalMoves >= 35 && totalMoves < 38:
                partOfScoreTwo = 50;
                break;
            case totalMoves >= 31 && totalMoves < 35:
                partOfScoreTwo = 100;
                break;
            case totalMoves >= 28 && totalMoves < 31:
                partOfScoreTwo = 150;
                break;
            case totalMoves >= 25 && totalMoves < 28:
                partOfScoreTwo = 200;
                break;
            case totalMoves < 25:
                partOfScoreTwo = 250;
                break;
            default:
                console.log("failed to count score two on medium level");
        }
    } else if (gameType === 'Hard') {
        switch (true) {
            case totalMoves >= 65:
                partOfScoreTwo = 0;
                break;
            case totalMoves >= 55 && totalMoves < 65:
                partOfScoreTwo = 50;
                break;
            case totalMoves >= 48 && totalMoves < 55:
                partOfScoreTwo = 100;
                break;
            case totalMoves >= 43 && totalMoves < 48:
                partOfScoreTwo = 150;
                break;
            case totalMoves >= 40 && totalMoves < 43:
                partOfScoreTwo = 200;
                break;
            case totalMoves < 40:
                partOfScoreTwo = 250;
                break;
            default:
                console.log("failed to count score two on hard level");
        }
    }
    console.log(partOfScoreOne, partOfScoreTwo);
    countFinalScore(partOfScoreOne, partOfScoreTwo);
}

var scoreRating;
function countFinalScore(partOfScoreOne, partOfScoreTwo) {
    if (partOfScoreOne >= 0 && partOfScoreTwo >= 0) {
        scoreRating = partOfScoreOne + partOfScoreTwo;
    } else {
        console.log("error in counting final score");
    }
}


//-------------------------------------------------------------Star rating function---------------------------------------//

function starRating(scoreRating) {
    switch (true) {
        case scoreRating >= 450:
            giveStars(5);
            break;
        case scoreRating >= 350 && scoreRating < 450:
            giveStars(4);
            break;
        case scoreRating >= 250 && scoreRating < 350:
            giveStars(3);
            break;
        case scoreRating >= 100 && scoreRating < 250:
            giveStars(2);
            break;
        case scoreRating >= 50 && scoreRating < 100:
            giveStars(1);
            break;
        case scoreRating < 50:
            break;
        default:
            console.log("error in score!");
    }
}
//-------------------------------------------- Add stars one by one----------------------------------//
function giveStars(starNumber) {
    for (let i = 0; i < starNumber; i++) {
        setTimeout(function () {
            $('#star-rating').append('<i class="fas fa-star"></i>');
        }, i * 500);
    }
}

//------------------------------------------------ Add card container-----------------------------------//
function addCardContainer() {
    $('.card-container').children('.card').remove();
    $('.difficulty-cont-wrapper').addClass('hidden');
}

//---------------------------------------------Create cards----------------------------------------------//
function createCards(cardNumber) {
    for (let i = 0; i < cardNumber; i++) {
        $('.card-container').append('<div class="card"></div>');
    }
    $('.card').append('<div class="card-back"></div>').append('<div class="card-front"></div>');
}

//---------------------------------------------Add images to each card----------------------------------//
function addImagesToCards() {
    let allFrontCards = $('.card-front');
    for (let j = 0; j < images.length; j++) {
        allFrontCards.slice(j * 2, j * 2 + 2).append(images[j]);
    }
}

//------------------------------------- start timer ---------------------------------------//
var timer;
var seconds = 0;
var minutes = 0;
function startTimer() {
    timer = setInterval(function () {
        if (seconds < 59) {
            ++seconds;
            $('#time-pass-seconds').text(seconds);
        } else if (seconds === 59) {
            seconds = 0;
            ++minutes;
            $('#time-pass-seconds').text(seconds);
            $('.time-pass-minutes').text(minutes);
        }
    }, 1000);
}

//--------------------------------------- shuffle cards - Fisher–Yates shuffle wikipedia --------------------------------------------//
function shuffleCards() {
    let cards = $('.card');
    for (let i = cards.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        cards[randomIndex].style.order = i;
        cards[i].style.order = randomIndex;
    }
}

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
        }, 500);
    }
}

//--------------------------------------------- flip cards back if they not match--------------------------------------//
function flipCardsBack() {
    setTimeout(function () {
        $('.selected').each(function () {
            $(this).removeClass('selected flip');
        });
    }, 1000);
}

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
            }
            $('#moves').text(moves);
            $(this).addClass('selected flip');
            //----- check if the cards match
            if ($('.selected').length === 2) {
                if ($('.selected').first().find('img').attr('src') == $('.selected').last().find('img').attr('src')) {
                    $('.selected').each(function () {
                        $(this).removeClass('selected').unbind('click');
                    });
                    checkForWin();
                } else {
                    console.log('not matched');
                    flipCardsBack();
                }
            }
        }
    });
}