$(document).ready(function () {
    $(".card-container").append('<h2>Please Choose Difficulty</h2><img src="assets/images/loader.gif" width="250px" height="250px" alt="loading"/>')

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
console.log(images);
// stackowerflow creating image array


//---------------------- when easy button clicked create easy difficulty game mode with 10 cards and 5 icon pairs from images array
$('#easy').click(function() {
    let cardNumber = 10;
    $('.card-container').css({
        'width' : '750px',
        'max-height' : '400px'
    });
    $('.card-container').empty();

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

//---------------------- when medium button clicked create medium difficulty game mode with 14 cards and 7 icon pairs from images array
$('#medium').click(function() {
    let cardNumber = 14;
    $('.card-container').css({
        'width' : '1050px',
        'max-height' : '400px'
    });
    $('.card-container').empty();

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

//---------------------- when hard button clicked create hard difficulty game mode with 18 cards and 9 icon pairs from images array
$('#hard').click(function() {
    let cardNumber = 18;
    $('.card-container').css({
        'width' : '900px',
        'max-height' : '600px'
    });
    $('.card-container').empty();

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

