$(function () {

    $(".logoCircle").hover(function () {
        $(".wechat").stop(true, false).hide();
    }, function () {

        setTimeout(function () {
            $(".wechat").stop(true, false).show();
        }, 500);
    });

    $(".wechat").click(function (event) {
        $(".er").show();
        event.stopPropagation();
    });

    $("body").click(function () {
        $(".er").hide();
    });

    $("#imgInfo").click(function () {
        $(".info").fadeIn();
    });
    $("#mask_imgInfoClose").click(function () {
        $(".info").fadeOut();
    });

    $("#aboutMe").click(function () {
        $(".aboutMe_mask_bg").fadeIn();
    });
    $("#aboutMe_Close").click(function () {
        $(".aboutMe_mask_bg").fadeOut();
    });

    var infoCount = 0;
    $("#arrow_l,#mask_arrow_l").click(function () {
        infoCount--;
        if (infoCount < 0) {
            infoCount = 4
        }
        $(".infoStory td p,.infoKey td p").hide();
        $(".infoStory td p:eq(" + infoCount + "),.infoKey td p:eq(" + infoCount + ")").show();
        $(".bg").not(infoCount).fadeOut(600);
        $(".bg").eq(infoCount).fadeIn(600);
    });
	
    $("#arrow_r,#mask_arrow_r").click(function () {
        infoCount++;
        if (infoCount > 4) {
            infoCount = 0
        }
        $(".infoStory td p,.infoKey td p").hide();
        $(".infoStory td p:eq(" + infoCount + "),.infoKey td p:eq(" + infoCount + ")").show();
        $(".bg").not(infoCount).fadeOut(600);
        $(".bg").eq(infoCount).fadeIn(600);
    });

    var aboutMeCount = 0;
    $(".aboutMe_l").click(function () {
        aboutMeCount--;
        if (aboutMeCount < 0) {
            aboutMeCount = 1
        }
        $(".aboutMe_roll img").not(aboutMeCount).fadeOut(600);
        $(".aboutMe_roll img").eq(aboutMeCount).fadeIn(600);
    });
    $(".aboutMe_r").click(function () {
        aboutMeCount++;
        if (aboutMeCount > 1) {
            aboutMeCount = 0
        }
        $(".aboutMe_roll img").not(aboutMeCount).fadeOut(600);
        $(".aboutMe_roll img").eq(aboutMeCount).fadeIn(600);
    });

    $("#nav li").hover(function () {
        $("#searchZone").css("zIndex", "1");
    }, function () {
        $("#searchZone").css("zIndex", "9998");
    });

    $(".left_inner li:eq(0) a:eq(0)").css("boxShadow", "none");

    $(".select_EC a").each(function (i) {
        $(".select_EC a:eq(" + i + ")").click(function () {
            $(".select_EC a").removeClass("selected");
            $(this).addClass("selected");
            $(".message_list").hide();
            $(".message_list:eq(" + i + ")").show();
        });
    });

 $("#email_main_Close").click(function () {
        $(".email_mask").fadeOut();
    });
 $(".mailto_btn a").click(function () {
        $(".email_mask").fadeIn();
    });




  var $container = $(".content_2_r");
				$container.masonry({
					itemSelector: ".box",
					gutterWidth: 60, 
					isAnimated: true
				});
   
 


});
