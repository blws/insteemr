var mcard = [
    '<div class="mystyle" style="padding:0px;margin-left:4px;"><ons-card style="padding:0px;margin:0 auto;border-radius:0px;">',
    '</ons-card></div>'
];
var ncard = [
    '<div class="mystyle"><ons-card style="padding:0px;margin:0 auto;border-radius:0px;">',
    '<a href="https://steemit.com',
    '"><img id="img',
    '"class="myimg" style=background:url(img/nomg.jpg); src="',
    '" data-src="',
    '"></a><section class="mypbr"><section style="width:',
    '%;" class="mypbf"></section></section>' +
    '<p class="mytit"><a class="mya" href="https://steemit.com',
    '">',
    '</p></a><h6 class="myusr" style="margin-top:0px;margin-bottom:0px;"><a class="mya" href="https://steemit.com/@',
    '">',
    '</a></h6><table class="mytb"><tr><th class="tac"><h6 class="myc">',
    '%</h6></th><th class="tac"><h6 class="myc">',
    ' $</h6></th><th class="tac"><h6 class="myc">',
    ' $</h6></th></tr></table></ons-card></div>'
];

function postd(nu) {
    var snu = nu;
    nu = (parseInt(pageNum * 300) + nu);
    var res = mcard[0] + mcard[1];
    if ((spcnt)) {
        var post = specialArySave[nu];
        if (typeof post !== "undefined") {
            var link = "https://steemitimages.com/256x512/";
            var splink = link;
            if (post.json_metadata.image) {
                link += post.json_metadata.image[0];
                splink = post.json_metadata.image[0];
            } else if (post.json_metadata.video) {
                link = 'https://snap1.d.tube/ipfs/' + post.json_metadata.video.info.snaphash;
            } else if (post.json_metadata.thumbnail) {
                link = post.json_metadata.thumbnail;
            } else if (post.json_metadata.audio) {
                link = 'https://snap1.d.tube/ipfs/' + post.json_metadata.audio.files.cover;
            }
            if (link == "https://steemitimages.com/256x512/") {
                link = "img/nomg.jpg";
                splink = "img/nomg.jpg";
            }
            res = ncard[0] +
                ncard[1] + post.url +
                ncard[2] + snu +
                ncard[3] + link +
                ncard[4] + splink +
                ncard[5] + (post.ppw / (post.ppv)).toFixed(2) * 100 +
                ncard[6] + post.url +
                ncard[7] + post.title +
                ncard[8] + post.author +
                ncard[9] + post.author +
                ncard[10] + ((post.ppw / (post.ppv)) * 100).toFixed(2) +
                ncard[11] + (post.ppv).toFixed(2) +
                ncard[12] + (post.ppw).toFixed(2) +
                ncard[13];
        }
    }
    return res;
}
var isAdmin=0;
var spcnt = 0;
var pageNum = 0;
var bufferSize = 53;
var divInRow = 1;
var divcnt = 1;
var lastScrollTop = 0;
var last = 0;
var bottomTrue = 0;
var savedOffset = 0;
var itemLimit = 300;
var wwid = 0; //width>1160
var savedOffset = 0;
var offsetDiff = 0;
var oldsavedOffset = 0;

$('#mdiv').append(postd(0));
$(window).resize(refreshMDiv);


setTimeout(function () {

    checkForNewDiv();
    spcnt = 1;
    refreshMDiv();
    //$('#mdiv img.lazyload').off();



    //ADMIN
    /*adminSave = '' +
        'PIC00<br>[Insteemr](' + gitLink + ') is [open source](' + gitLink +
        ') steem analytic tool. Search and analyze tags created last week.<br><br>' +
        'Begin date: ' + $('#beginDate').html() + '<br>Snapshot taken: ' + $('#snapDate').html() +
        '<br><br>EWI - Earnings without interest' +
        '<h2>[All posts](' + gitLink + ')</h2><br>PIC01<br>';*/

    tagFunction(window.location.search.substr(1).replace(new RegExp("&", 'g'), " "), 0);
    pageFunction(0);

    //lazyload();
}, 2000);

$('#mdiv').append(postd(0));

function refreshMDiv() {

    if (isAdmin == 0) {
        if ($('body').width() < 1062) {
            wwid = 1;
        } else {
            wwid = 0;
        }
        if (spcnt) {
            divcnt = 1;
            $('#mdiv').html(postd(0));
            bottomTrue = 0;
            oldsavedOffset = 0;
            savedOffset = 0;
            last = 0;
            checkForNewDiv();
        }
        var lisInRow = 0;
        $('#mdiv div').each(function () {
            if ($(this).prev().length > 0) {
                if ($(this).position().top != $(this).prev().position().top) return false;
                lisInRow++;
            } else {
                lisInRow++;
            }
        });
        divInRow = lisInRow;
    }
}

$(".page__content").scroll(function () {

    if ($("#mdiv").offset().top < 2) {

        bottomTrue = 1;
        oldsavedOffset = savedOffset;
        savedOffset = $('.page__content').scrollTop();
        offsetDiff = parseFloat(oldsavedOffset - savedOffset);

        $('.page__content').scrollTop(savedOffset);

    } else {
        bottomTrue = 0;
        if (($('#mdiv').scrollTop() > 4) && (savedOffset > 0)) {
            $(".page__content").scrollTop(savedOffset);

        }
    }
    if (($("#mdiv").scrollTop() < 3) && (last > 0)) {

        bottomTrue = 1;
        $(".page__content").scrollTop(savedOffset);

    }

    if ($(".page__content").scrollTop() == savedOffset) {
        if (bottomTrue) {
            if ((wwid == 0) && (offsetDiff == 0)) {

                $("#mdiv").scrollTop(0);
            }
        }
    }
});

$("#mdiv").scroll(function () {
    if (bottomTrue) {
        var st = $(this).scrollTop();
        var lastDiv = document.querySelector("#mdiv > div:last-child");
        if ((st + $(this).height()) > ((divcnt - last) * (lastDiv.clientHeight / divInRow))) {
            for (i = 0; i < divInRow * 3; i++) {
                //console.log(i + " <");
                if ((divcnt < itemLimit) && (specialArySave.length >= (parseInt(pageNum * 300) +
                        divcnt))) {
                    $('#mdiv').append(postd(divcnt));
                    //$('.lazyload').last().attr("src",$('.lazyload').last().attr("src-data"));
                    //ll(divcnt);
                    if (divcnt + 1 == itemLimit) {
                        //console.log("SCROLL END");
                        //$('#mdiv').append('<center style="clear:both;"><a href="#">To Top</a></center>');
                    }

                    divcnt++;
                    if (divcnt > bufferSize) {
                        $("#mdiv").children().eq(0).remove();
                        last++;
                    }
                }
            }

        }
        if ((st < 1) && (last > 0)) {
            for (i = 0; i < divInRow; i++) {
                if (last > 0) {
                    last--;
                    $("#mdiv").html(postd(last) + $("#mdiv").html());
                    //$('.lazyload').first().attr("src",$('.lazyload').first().attr("src-data"));
                }
            }

            $("#mdiv").scrollTop(2);
            var l = $("#mdiv").children().length;

            for (i = bufferSize; i < l; i++) {
                $("#mdiv").children().eq($("#mdiv").children().length - 1).remove();
                //ll(divcnt-i);
                //ll(divcnt-i-1);
                divcnt--;
                // ll(divcnt-i+5);
                // ll(divcnt-i+6);
            }

        }

    } else {
        if (bottomTrue == 0) {
            if ($("#mdiv").offset().top > -1) {
                $("#mdiv").scrollTop(0);
            }

            //console.log("<<<<<<<1111");
            $(".page__content").scrollTop(50 + $(".page__content").scrollTop());
        }

        if (wwid == 0) {
            $("#mdiv").scrollTop(0);
            //console.log("<<<<<<<22222");
            //$(".page__content").scrollTop(50 + $(".page__content").scrollTop());
        }
    }

    //lazyload();
});
var checkForNewDiv = function () {
    var lastDiv = document.querySelector("#mdiv > div:last-child");
    var maindiv = document.querySelector("#mdiv");
    var lastDivOffset = lastDiv.offsetTop + lastDiv.clientHeight;
    var pageOffset = maindiv.offsetTop + maindiv.clientHeight;
    if (pageOffset > lastDivOffset - 700) {
        $('#mdiv').append(postd(divcnt));
        //$('.lazyload').last().attr("src",$('.lazyload').last().attr("src-data"));
        //ll(divcnt);
        divcnt++;

        checkForNewDiv();

    }
};