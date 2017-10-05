$(function() {
    $("#aacBtnClear").click(function() {
        $("#aacRecipeAA").val("");
        $("#aacRecipeWeight").val("");
        $("#aacYourAA").val("");
        $("#aacYourWeight").val("").parent().removeClass("has-success");
        $("#aacResult").addClass("hidden");
    });
    
    $("#aacBtnCalculate").click(function() {
        var $aacRecipeAA = $("#aacRecipeAA");
        var $aacRecipeWeight = $("#aacRecipeWeight");
        var $aacYourAA = $("#aacYourAA");

        var recipeAlphaAcid = parseFloat($.trim($aacRecipeAA.val()));
        var recipeWeight = parseFloat($.trim($aacRecipeWeight.val()));
        var yourAlphaAcid = parseFloat($.trim($aacYourAA.val()));

        if (isNaN(recipeAlphaAcid)) {
            recipeAlphaAcid = 0.0;
            $aacRecipeAA.val("0.0");
        }

        if (isNaN(recipeWeight)) {
            recipeWeight = 0.0;
            $aacRecipeWeight.val("0.0");
        }

        if (isNaN(yourAlphaAcid)) {
            yourAlphaAcid = 0.0;
            $aacYourAA.val("0.0");
        }

        var yourWeight = (recipeAlphaAcid * recipeWeight) / yourAlphaAcid;

        if (isNaN(yourWeight)) {
            yourWeight = 0.0;
        }

        $("#aacYourWeight").val(yourWeight).parent().addClass("has-success");
        $("#aacResult").removeClass("hidden");
    });
});