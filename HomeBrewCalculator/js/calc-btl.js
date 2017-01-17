$(function() {
    $("#btlBtnClear").click(function() {
        $("#btlVolumeBeerValue").val("");
        $("#btlVolumeBottleSizeValue").val("");
        $("#btlAlert").hide();
    });

    $("#btlBtnCalculate").click(function() {
        var $btlVolumeBeerValue = $("#btlVolumeBeerValue");
        var $btlVolumeBottleSizeValue = $("#btlVolumeBottleSizeValue");

        var batchVolume = parseFloat($.trim($btlVolumeBeerValue.val()));
        var bottleVolume = parseFloat($.trim($btlVolumeBottleSizeValue.val()));

        if (isNaN(batchVolume)) {
            batchVolume = 0.0;
            $btlVolumeBeerValue.val("0.0");
        }

        if (isNaN(bottleVolume)) {
            bottleVolume = 0.0;
            $btlVolumeBottleSizeValue.val("0.0");
        }

        var bottlesNeeded = (batchVolume * 128.0) / bottleVolume;

        if (isNaN(bottlesNeeded) || !isFinite(bottlesNeeded)) {
            bottlesNeeded = 0.0;
        }

        bottlesNeeded = Math.ceil(bottlesNeeded);

        var suffix = "";

        if (bottlesNeeded !== 1) {
            suffix = "s";
        }

        var bottleDescription = bottleVolume + "ounce bottle";

        if (bottleVolume == 22) {
            bottleDescription = "bomber";
        }

        $("#btlAlert").show().html("You'll need <strong>" + bottlesNeeded + " " + bottleDescription + suffix + "</strong> to bottle a <strong>" + batchVolume + " gallon</strong> batch of beer.");
    });
});