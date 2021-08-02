$(document).ready(function () {

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
console.log(images);
// stackowerflow creating image array

//---------------------- when easy button clicked create easy difficulty game mode with 8 cards and 4 icon pairs from images array
$('#easy').click(function() {
    let cardNumber = 8;
    let moves = 0;
    $('#moves').text(moves);
    $('.card-container').children('.card').remove();
    $('.card-container').first().children('div').addClass('hidden');
    //--------------------------- creates cards -------------------------//
    for (let i = 0; i < cardNumber; i++) {
        $('.card-container').append('<div class="card"></div>');
    };
    $('.card').append('<div class="card-back"></div>').append('<div class="card-front"></div>');
    //---------------------------------------------add images to each card----------------------------------//
    let allFrontCards = $('.card-front');
    for (let j = 0; j < images.length; j++) {
        allFrontCards.slice( j * 2, j * 2 + 2).append(images[j]);
    };

    //--------------------------------------- shuffle cards Fisher–Yates shuffle wikipedia --------------------------------------------//
    let cards = $('.card');
    for( let i = cards.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        cards[randomIndex].style.order = i;
        cards[i].style.order = randomIndex;
    }

    //------------------------------------- time interval ---------------------------------------//
    var seconds = 1;
    $('#restart').click(function(){
        setInterval(function () {
            $('#time-pass').text(seconds);
            seconds++;
        }, 1000);
    });

    //------------------------------------flip clicked cards-------------------------------------------------//
    $('.card').click(function(){
        //--- allow to lfip only two cards at a time
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

        if ($('.selected').length === 2){
            if($('.selected').first().find('img').attr('src') == $('.selected').last().find('img').attr('src')){
                $('.selected').each(function() {
                    $(this).removeClass('selected').unbind('click');
                });
                // remove click eventhandler / play match music
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
});


//---------------------- when medium button clicked create medium difficulty game mode with 16 cards and 9 icon pairs from images array
$('#medium').click(function() {
    let cardNumber = 16;
    $('.card-container').children('.card').remove();
    $('.card-container').first().children('div').addClass('hidden');

    for (let i = 0; i < cardNumber; i++) {
        $('.card-container').append('<div class="card"></div>');
    };
    $('.card').append('<div class="card-back"></div>').append('<div class="card-front"></div>');

    let allFrontCards = $('.card-front');
    console.log(allFrontCards);
    for (let j = 0; j < images.length; j++) {
        allFrontCards.slice( j * 2, j * 2 + 2).append(images[j]);
    };
});

//---------------------- when hard button clicked create hard difficulty game mode with 24 cards and 12 icon pairs from images array
$('#hard').click(function() {
    let cardNumber = 24;
    $('.card-container').children('.card').remove();
    $('.card-container').first().children('div').addClass('hidden');

    for (let i = 0; i < cardNumber; i++) {
        $('.card-container').append('<div class="card"></div>');
    };
    $('.card').append('<div class="card-back"></div>').append('<div class="card-front"></div>');

    let allFrontCards = $('.card-front');
    console.log(allFrontCards);
    for (let j = 0; j < images.length; j++) {
        allFrontCards.slice( j * 2, j * 2 + 2).append(images[j]);
    };
});

$('#choose-difficulty').click(function(){
    $('.card-container').children('.card').remove();
    $('.card-container').first().children('div').removeClass('hidden');

});


