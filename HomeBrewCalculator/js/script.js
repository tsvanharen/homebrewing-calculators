var appConfig = {
    enableLogging: true
};

function log(msg) {
    if (typeof console !== "undefined" && console && typeof console.log !== "undefined" && console.log && appConfig.enableLogging) {
        console.log(msg);
    }
}

$(function() {
    // http://stackoverflow.com/a/19667152/107009
    $('body').on('keydown keyup keypress change blur focus paste', 'input.decimal', function() {
        var target = $(this);

        var prev_val = target.val();

        setTimeout(function() {
            var chars = target.val().split("");

            var decimal_exist = false;
            var remove_char = false;

            $.each(chars, function(key, value) {
                switch (value) {
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9':
                    case '.':
                        if (value === '.') {
                            if (decimal_exist === false) {
                                decimal_exist = true;
                            }
                            else {
                                remove_char = true;
                                chars['' + key + ''] = '';
                            }
                        }
                        break;
                    default:
                        remove_char = true;
                        chars['' + key + ''] = '';
                        break;
                }
            });

            if (prev_val != target.val() && remove_char === true) {
                target.val(chars.join(''))
            }
        }, 0);
    });       
});