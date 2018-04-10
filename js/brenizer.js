$(document).ready(function() {

   var fieldAperture    = $("#brenizer__result_aperture");
   var fieldFocalLength = $("#brenizer__result_focal_length");
   calculate();

   $("input[id^=brenizer__]").on("change paste keyup", calculate);

   $("#brenizer__button_reset").click(reset);

   function calculate() {
      var singleFocal    = $("input#brenizer__focal_length").val();
      var singleAperture = $("input#brenizer__aperture").val();
      var singleWidth    = $("input#brenizer__width_single").val();
      var singleHeight   = $("input#brenizer__height_single").val();
      var mergedWidth    = $("input#brenizer__width_merged").val();
      var mergedHeight   = $("input#brenizer__height_merged").val();

      // check if all necessary fields have a sane value
      if (singleWidth > 0 && singleHeight > 0 && mergedHeight > 0 && mergedWidth > 0) {
         // calculate diagonals
         var diag1 = Math.sqrt((singleWidth * singleWidth) + (singleHeight * singleHeight));
         var diag2 = Math.sqrt((mergedWidth * mergedWidth) + (mergedHeight * mergedHeight));

         // calculate focal length
         var mergedFocal = singleFocal * (diag1 / diag2);
         if ( mergedFocal > 0 && isFinite(mergedFocal)) {
            fieldFocalLength.html(Math.round(mergedFocal));
         } else {
            fieldFocalLength.html("&hellip;");
         }

         // calculate aperture
         var mergedAperture  = singleAperture * (diag1 / diag2);
         if ( mergedAperture > 0 && isFinite(mergedAperture)) {
            fieldAperture.html(Math.round(mergedAperture * 10) / 10);
         } else {
            fieldAperture.html("&hellip;");
         }
      } else {
         fieldAperture.html("&hellip;");
         fieldFocalLength.html("&hellip;");
      }
   }

   function reset() {
      $("input[id^=brenizer__]").val("undefined");
      $("#brenizer__result_aperture").html("&hellip;");
      $("#brenizer__result_focal_length").html("&hellip;");
   }

});
