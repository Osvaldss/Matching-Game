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



