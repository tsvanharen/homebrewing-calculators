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
    $('body').on('keydown keyup keypress change blur focus paste', '.se input', function() {
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

    $("#seBtnClear").click(function() {
        $("#seVolumeBeerValue").val("");
        $("#seVolumeBeerAbv").val("");
        $("#seVolumeSpiritValue").val("");
        $("#seVolumeSpiritAbv").val("");
        $("#seAlert").hide();
    });

    $("#seBtnCalculate").click(function() {
        var beerVolume = parseFloat($.trim($("#seVolumeBeerValue").val()));
        //var beerDim = $("#seVolumeBeerDimension").val();
        var beerAbv = parseFloat($.trim($("#seVolumeBeerAbv").val()));
        var spiritVolume = parseFloat($.trim($("#seVolumeSpiritValue").val()));
        //var spiritDim = $("#seVolumeSpiritDimension").val();
        var spiritAbv = parseFloat($.trim($("#seVolumeSpiritAbv").val()));
                
        if (isNaN(beerVolume)) {
            beerVolume = 0.0;
            $("#seVolumeBeerValue").val("0.0");
        }

        if (isNaN(beerAbv)) {
            beerAbv = 0.0;
            $("#seVolumeBeerAbv").val("0.0");
        }

        if (isNaN(spiritVolume)) {
            spiritVolume = 0.0;
            $("#seVolumeSpiritValue").val("0.0");
        }

        if (isNaN(spiritAbv)) {
            spiritAbv = 0.0;
            $("#seVolumeSpiritAbv").val("0.0");
        }

        // (abv of spirit * volume of spirit) / (volume of beer + volume of spirit)
        var spiritAlcoholVolume = spiritVolume * spiritAbv;
        var totalVolume = beerVolume + spiritVolume;

        var addedAbv = spiritAlcoholVolume / totalVolume;
        var resultingAbv = beerAbv + addedAbv;

        if (isNaN(addedAbv)) {
            addedAbv = 0.0;
            resultingAbv = beerAbv;
        }

        $("#seAlert").show().html("This adds <strong>" + addedAbv + "%</strong> ABV to your beer, resulting in a beer with <strong>" + resultingAbv + "% ABV</strong>.");
    });    
});