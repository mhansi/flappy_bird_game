$(function () {
    var container = $('#container');
    var bird = $('#bird');
    var pole = $('.pole');
    var pole_1 = $('#pole_1');
    var pole_2 = $('#pole_2');
    var score = $('#score');
    var speed_span = $('#speed');
    var restart_btn = $('#restart_btn');

    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var pole_initial_position = parseInt(pole.css('right'));
    var pole_initial_height = parseInt(pole.css('hight'));
    var bird_height = parseInt(bird.height())
    var bird_left = parseInt(bird.css('left'));
    var speed = 10;

    var go_up = false;
    var score_updated = false;
    var game_over = false;

    var the_game = setInterval(function () {

        if (collision(bird, pole_1) || collision(bird, pole_2) || parseInt(bird.css('top')) <= 0 || parseInt(bird.css('top')) > container_height - bird_height) {
            stop_the_game();
        } else {

            var pole_current_position = parseInt(pole.css('right'));

            if (pole_current_position > container_width - bird_left) {
                if (score_updated === false) {
                    score.text(parseInt(score.text()) + 1);
                    score_updated = true;
                }
            }

            if (pole_current_position > container_width) {
                var new_height = Math.random() * 130;
                var random = Math.floor(Math.random() * 2);

                if (random % 2 == 0) {
                    var height1 = 130 + new_height;
                    var height2 = 130 - new_height;
                    $("#pole_1").css({ "height": height1 });
                    $("#pole_2").css({ "height": height2 });
                } else {
                    var height1 = 130 - new_height;
                    var height2 = 130 + new_height;
                    $("#pole_1").css({ "height": height1 });
                    $("#pole_2").css({ "height": height2 });
                }
                speed = speed + 1;
                speed_span.text(speed);

                score_updated = false;
                pole_current_position = pole_initial_position;

            }

            pole.css('right', pole_current_position + speed);

            if (go_up == false) {
                go_down();
            }
        }
    }, 40);
    $(document).on('keydown', function (e) {
        var key = e.keyCode;
        if (key === 32 && go_up === false && game_over === false) {
            go_up = setInterval(up, 50);
        }
    });
    $(document).on('keyup', function (e) {
        var key = e.keyCode;
        if (key === 32) {
            clearInterval(go_up);
            go_up = false;
        }
    });

    function go_down() {
        bird.css('top', parseInt(bird.css('top')) + 5)
    }
    function up() {
        bird.css('top', parseInt(bird.css('top')) - 10)
    }
    function stop_the_game() {
        clearInterval(the_game);
        game_over = true;
        restart_btn.slideDown();
        $('#container').css('background-image', 'unset')
    }
    restart_btn.click(function () {
        location.reload();
    });

    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;


    }
});