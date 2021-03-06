var puzzleItems = ["bug", "dinosaur", "octopus", "crab", "sheep", "whale", "dog", "cat", "bug", "dinosaur", "octopus", "crab", "sheep", "whale", "dog", "cat"];
var activePuzzle = "";
var started = false;
var foundPuzzle = [];
var countdownTime;
var counter;
var level;
var settings = {
    countdownTime: 30,
};
initPuzzleItems();


$(document).on("click", ".puzzle-item", function () {
    if (started) {
        $(this).addClass("active");
        if (activePuzzle == "") {
            activePuzzle = $(this).data("puzzle");
            $(this).addClass("temp_found");
        } else if ((activePuzzle != "") && (activePuzzle == $(this).data("puzzle")) && (!$(this).hasClass("temp_found"))) {
            $("." + activePuzzle).addClass("found");
            $(".puzzle-item").removeClass("active");
            activePuzzle = "";
            $(".puzzle-item").removeClass("temp_found");
        } else if (activePuzzle != "" && activePuzzle != $(this).data("puzzle")) {
            setTimeout(function () {
                $(".puzzle-item").removeClass("active");
                activePuzzle = "";
                $(".puzzle-item").removeClass("temp_found");
            }, 300);
        }

        checkWin();
    }
});

function checkWin() {
    if ($(".found").length === puzzleItems.length) {
        $(".overlay-content .content-wrapper h1").html("Честкитки, победивте!");
        $(".overlay-content").addClass("active");
        clearInterval(counter);
    }
}

$(".start-game").on("click", function () {
    started = true;
    countdownTime = settings.countdownTime;
    counter = setInterval(timer, 1000);
    $(".level-container").hide();
    $(".settings").hide();
    $(".settings .controls").hide();
    $(".puzzle-container").show();
});

$(".new-game").on("click", function () {
    initPuzzleItems();
    $(".countdown").html("");
    $(".level-container").show();
    $(".puzzle-container").hide();
    $(".settings").show();
    $("input[type=radio]").prop("checked", false);
    $(".puzzle-item").removeClass("active found");
    $(".overlay-content .content-wrapper p").html("");
    activePuzzle = "";
    started = false;
    $(".overlay-content").removeClass("active");
});


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function initPuzzleItems() {
    var randomizeItems = shuffle(puzzleItems);
    $(".puzzle-container").html("");
    for (i = 0; i < randomizeItems.length; i++) {
        $(".puzzle-container").append("<div class=\"puzzle-item " + randomizeItems[i] + "\" data-puzzle=\"" + randomizeItems[i] + "\"></div>");
    }
}

function timer() {
    countdownTime = countdownTime - 1;
    if (countdownTime <= 0) {
        $(".overlay-content .content-wrapper h1").html("Времето истече!");
        $(".overlay-content").addClass("active");
        clearInterval(counter);
    }
    $(".countdown").html(countdownTime);
}


$('.settings-button').on('click', function (event) {
    $('.settings .controls').toggle();
    event.preventDefault();
});

$('#countdownTime').on('change', function (event) {
    settings.countdownTime = $(this).val();
});

$(document).on('ready', resizePuzzleContainer);

$(window).on('resize', function () {
    resizePuzzleContainer();
});

$(document).on('click', '.countdown', function () {
    $('.puzzle-item').addClass('found');
    checkWin();
});

function resizePuzzleContainer() {
    height = $(window).height();
    width = $(window).width();

    puzzleSide = ( height < width ? height : width ) - 25;
    $('.puzzle-container')
        .width(puzzleSide)
        .height(puzzleSide)
        .css({
            left: (width - puzzleSide) / 2,
            top: (height - puzzleSide) / 2
        })
}
