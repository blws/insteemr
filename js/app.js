//steem.api.setOptions({url: 'wss://gtg.steem.house:8090'});
//steem.api.setOptions({ transport: 'http', url: 'https://api.steemit.com' });
var firstDate = new Date(),
    firstDateTrend = new Date(),
    beginDate = new Date(),
    endDate = new Date(),
    oldestTime = new Date(),
    oldestTimeTrend = new Date();
var notFirstPost = 0,
    notFirstTrendPost = 0,
    firstTime = 0,
    firstTimeTrend = 0,
    dayBeginFlag = 0,
    timeDiff = 0,
    ppvSum = 0,
    ppwSum = 0,
    cntfilt = 0
latestDate = 0,
    earliestDate = 0;
var postCnt = 1,
    trendCnt = 102,
    lowestRew = 100000;
var slctcnt = -1;
var slctcnt0 = 0;
var indx = -1;
var entcnt = 0;
var resAry = [],
    trendAry = [];
var trendNum = 100;
var lasttag;
var specialArySave = [];
var subTagAry = [];
var sortableTags = [];
var userAry = [];
var tagAry = [];
var linkAry = [];
var authorz = [];
var authEarn = [];
var gaySum = 0;
var savedPpv = savedTable[1][0] + savedTable[1][1] + savedTable[1][2] + savedTable[1][3];
var ssw = document.getElementById("msw");
var botlist = botlist();
var savpermlink = window.permlink;
var savauthor = window.author;
for (v = 0; v < savedAry.length; v++) {
    if (authorz.indexOf(savedAry[v].author) < 0) {
        authorz.push(savedAry[v].author);
        authEarn.push([savedAry[v].author, savedAry[v].ppw]);
    } else {
        for (usr in authEarn) {
            if (authEarn[usr][0] == savedAry[v].author) {
                authEarn[usr][1] += savedAry[v].ppw;
                break;
            }
        }
    }

    if (typeof savedAry[v].json_metadata.tags === "undefined") {
    } else {
        //cs(v);
        for (z = 0; z < savedAry[v].json_metadata.tags.length; z++) {
            if (typeof tagAry[savedAry[v].json_metadata.tags[z]] === "undefined") {
                tagAry[savedAry[v].json_metadata.tags[z]] = savedAry[v].ppw;
            } else {
                tagAry[savedAry[v].json_metadata.tags[z]] += savedAry[v].ppv;
                gaySum += savedAry[v].ppv;
            }
        }
    }
}
authEarn.sort(function (a, b) {
    return b[1] - a[1];
});
var authEarnSave = authEarn.slice();
var gayAry = [];
for (var key in tagAry) {
    gayAry.push([key, tagAry[key], 100 * tagAry[key] / (savedPpv)]);
}
var groupg = [
    [0, 0, ""],
    [0, 0, ""],
    [0, 0, ""],
    [0, 0, ""],
    [0, 0, ""],
    [0, 0, ""],
    [0, 0, ""]
];
gayAry.sort(cmpVal);
var filtGayAry = gayAry.slice();
for (a in savedAry) {
    if (a == 0) {
        latestDate = savedAry[0].created;
        earliestDate = savedAry[0].created;
    } else {
        if (latestDate > savedAry[a].created) {
            latestDate = savedAry[a].created;
        }
        if (earliestDate < savedAry[a].created) {
            earliestDate = savedAry[a].created;
        }
    }
}
var allEarn = savedTable[1][0] +
    savedTable[1][1] +
    savedTable[1][2] +
    savedTable[1][3];
var allNum = savedTable[0][0] +
    savedTable[0][1] +
    savedTable[0][2] +
    savedTable[0][3];

var allEarn2 = savedTable[1][0] +
    savedTable[1][1];
var allNum2 = savedTable[0][0] +
    savedTable[0][1];
var globalEwi = ((savedTable[2][0] +
        savedTable[2][1] +
        savedTable[2][2] +
        savedTable[2][3]) /
    (allEarn) * 100);

var globalEwi2 = ((savedTable[2][0] +
        savedTable[2][1]) /
    (allEarn2) * 100);

$("#infoList").children(0).next().html(allNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
$("#infoList").next().children(0).next().html(
    (allEarn * (globalEwi / (100))).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " $");
$("#infoList").next().next().children(0).next().html(
    allEarn.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " $");
$("#infoList").next().next().next().children(0).next().html((globalEwi).toFixed(1) + " %");
$("#infoList").next().next().next().next().children(0).next().html(
    '<b id="beginDate" style="margin:0 auto;">' + new Date(latestDate).toDateString() + "</b>");
$("#infoList").next().next().next().next().next().children(0).next().html(
    '<b id="snapDate" style="margin:0 auto;">' + new Date(earliestDate).toDateString() + "</b>");

$("#btn1002")
    .next().html(" " + savedTable[0][0] + "")
    .next().html(" " + ((savedTable[0][0] / (allNum)) * 100).toFixed(1) + "")
    .next().html(" $ " + savedTable[1][0].toFixed(0) + "")
    .next().html("  " + ((savedTable[1][0] / (allEarn)) * 100).toFixed(1) + "")
    .next().html(" $ " + savedTable[2][0].toFixed(0) + "")
    .next().html(" " + ((savedTable[2][0] / (savedTable[1][0]) * 100)).toFixed(1) + "%");
$("#btn62")
    .next().html(" " + savedTable[0][1] + "")
    .next().html(" " + ((savedTable[0][1] / (allNum)) * 100).toFixed(1) + "")
    .next().html("$ " + savedTable[1][1].toFixed(0))
    .next().html("  " + ((savedTable[1][1] / (allEarn)) * 100).toFixed(1) + "")
    .next().html(" $ " + savedTable[2][1].toFixed(0) + "")
    .next().html(" " + ((savedTable[2][1] / (savedTable[1][1])) * 100).toFixed(1) + "%");
$("#btn12")
    .next().html(" " + savedTable[0][2] + "")
    .next().html(" " + ((savedTable[0][2] / (allNum)) * 100).toFixed(1) + "")
    .next().html(" $ " + savedTable[1][2].toFixed(0) + "")
    .next().html("  " + ((savedTable[1][2] / (allEarn)) * 100).toFixed(1) + "")
    .next().html(" $ " + savedTable[2][2].toFixed(0) + "")
    .next().html(" " + ((savedTable[2][2] / (savedTable[1][2])) * 100).toFixed(1) + "%");
$("#btn02")
    .next().html(" " + savedTable[0][3] + "")
    .next().html(" " + ((savedTable[0][3] / (allNum)) * 100).toFixed(1) + "")
    .next().html("$ " + savedTable[1][3].toFixed(0))
    .next().html("  " + ((savedTable[1][3] / (allEarn)) * 100).toFixed(1) + "")
    .next().html(" $ UNK")
    .next().html(" UNK");
$("#alltag2")
    .next().html(' ' + (allNum) + "")
    .next().html("100").next().html(' $ ' + (allEarn).toFixed(0) + "")
    .next().html(" " + ((allEarn / (allEarn) * 100)).toFixed(1) + "")
    .next().html(' $ ' +
        (savedTable[2][0] +
            savedTable[2][1] +
            savedTable[2][2] +
            savedTable[2][3]
        ).toFixed(0) + "")
    .next().html(" " + (
        globalEwi
    ).toFixed(1) + "%");
function cmpPpv(a, b) {
    if (a.ppv > b.ppv)
        return -1;
    if (a.ppv < b.ppv)
        return 1;
    return 0;
}
function cmpVal(a, b) {
    if (a[1] > b[1])
        return -1;
    if (a[1] < b[1])
        return 1;
    return 0;
}
function cmpPpw(a, b) {
    if (a.ppw > b.ppw)
        return -1;
    if (a.ppw < b.ppw)
        return 1;
    return 0;
}
function mswclick() {
    var str = $("#tagRoute").clone();
    str = str.text().replace("/","");
    tagFunction(str, pageNum);
}
function totop() {
    $(".page__content").scrollTop(0);
    pageFunction(pageNum);
}
function page(pg) {
    document.querySelector('#navigator').pushPage(pg, {
        data: {
            title: 'About page'
        }
    });
}
function tagFunctionAdd(word) {
    $("#tagRoute").append("$" + word);
    $("#tagRoute").html($("#tagRoute").html().replace(/ /g, "$"));
    tagFunction($("#tagRoute").html().substring(1), 0);
    $("#tagRoute").html($("#tagRoute").html().replace(/\$/g, " "));
}
function sugestTag() {
    filtGayAry = gayAry.slice();
    slctcnt = -1;
    slctcnt0 = 0;
    indx = -1;
    entcnt = 0;
    for (i in gayAry) {
        if (i > 15) {
            return 0;
        } else {
            $("#formHodl").append('<button class="dropdown"' + 'onclick="tagFunction(' + "'" + gayAry[i][0] + "'" + ',0)">' + gayAry[i][0] + '<div style="float:right;text-align:right; display:inline">' + (gayAry[i][1]).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' $</div></button>');
        }
    }
}
function sugestTagOut() {
    setTimeout(function () {
        $(".dropdown").remove();
    }, 500);
}
function tagUp(e) {
    if ((e.keyCode == 38) || (e.keyCode == 40)) {
        $("#inputlg").val(filtGayAry[indx][0]).select();
    } else {
        filtGayAry = gayAry.filter(function (tag) {
            return tag[0].includes($("#inputlg").val());
        });
        $(".dropdown").remove();
        for (i in filtGayAry) {
            if (i > 15) {
                break;
            } else {
                $("#formHodl").append('<button class="dropdown" onclick="tagFunction(' +
                    "'" + filtGayAry[(parseInt(i))][0] + "'" + ',0)">' +
                    filtGayAry[(parseInt(i))][0] + '<div style="float:right;text-align:right; display:inline">' +
                    filtGayAry[(parseInt(i))][1].toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' $</div></button>');
            }
        }
    }
}
function tagDown(e) {
    var slctd;
    if (slctcnt == -1) {} else {
        if (entcnt == 0) {
            $(".dropdown:nth-child(" + (slctcnt + 3) + ")").html($(".dropdown:nth-child(" + (slctcnt + 3) + ")").html().replace("&lt;&lt;&lt;", ""));
            //console.log(slctd);
        }
    }
    if (e.keyCode == 40) {
        if (slctcnt > 14) {
            slctcnt0++;
            $(".dropdown").remove();

            for (i in filtGayAry) {
                if (i > 15) {
                    //return 0;
                    break;
                } else {
                    //console.log(slctcnt);
                    $("#formHodl").append('<button class="dropdown" onclick="tagFunction(' +
                        "'" + filtGayAry[(parseInt(i) + slctcnt0)][0] + "'" + ',0)">' +
                        filtGayAry[(parseInt(i) + slctcnt0)][0] +
                        '<div style="float:right;text-align:right; display:inline">' +
                        (gayAry[(parseInt(i) + slctcnt0)][1]).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                        ' $</div></button>');
                }
            }
        } else {
            slctcnt++;
        }
        indx++;
    }
    if (e.keyCode == 38) {
        if (slctcnt < 1) {
            if (slctcnt0 > 0) {
                slctcnt0--;
                $(".dropdown").remove();
                for (i in filtGayAry) {
                    if (i > 15) {
                        break;
                    } else {
                        //console.log(parseInt(i)+slctcnt0);

                        if (i == 0) {
                            $("#formHodl").append('<button class="dropdown" onclick="tagFunction(' +
                                "'" + filtGayAry[(parseInt(i) + slctcnt0)][0] + "'" + ',0)">' +
                                filtGayAry[(parseInt(i) + slctcnt0)][0] +
                                '<div style="float:right;text-align:right; display:inline">' +
                                (gayAry[(parseInt(i) + slctcnt0)][1]).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                                ' $</div></button>');
                        } else {
                            $("#formHodl").append('<button class="dropdown" onclick="tagFunction(' +
                                "'" + filtGayAry[(parseInt(i) + slctcnt0)][0] + "'" + ',0)">' +
                                filtGayAry[(parseInt(i) + slctcnt0)][0] +
                                '<div style="float:right;text-align:right; display:inline">' +
                                (gayAry[(parseInt(i) + slctcnt0)][1]).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                                ' $</div></button>');
                        }

                    }
                }
            }
        } else {
            slctcnt--;
        };
        if (indx > 0) {
            indx--
        };
    }
    $(".dropdown:nth-child(" + (slctcnt + 3) + ")").append(" <<<");
    if (e.keyCode == 13) {
        entcnt = 1;
        $("#inputlg").blur();
        tagFunction($("#inputlg").val(), 0);
    }
}
function pageFunction(y) {
    pageNum = y;
    var y2 = 0;
    var fix = (6).toFixed(1);
    var fix2 = (0).toFixed(1);
    if (y - 1 > 0) {
        y2 = y - 1;
    }
    var diffr = (Math.ceil(specialArySave.length / (300))) - pageNum - 1;
    $("#mainPages1").html('<button onclick="pageFunction(' + y2 + ')" class="tagbtn"><div class="pagebut"">Previus<br>Page</div></button>');
    if (diffr < 4) {

        if (ssw.checked) {
            specialArySave.sort(cmpPpw);
            for (x = pageNum - (4 - diffr); x < pageNum; x++) {
                if (typeof specialArySave[(300 * (x + 1)) - 1] !== "undefined") {
                    if (typeof specialArySave[(300 * (x + 1)) - 1].ppw !== "undefined") {
                        fix = (specialArySave[(300 * (x + 1)) - 1].ppw).toFixed(1);
                    }
                }
                var adiv = ' onclick="pageFunction(' + x + ')"><div class="pagebut">' + parseInt(x + 1) + "<br>" + fix2 + "$</div></button>";
                if (x > 0) {
                    $("#mainPages1").append('<button class="tagbtn" ' + adiv);
                }
            }
        } else {
            specialArySave.sort(cmpPpv);
            for (x = pageNum - (4 - diffr); x < pageNum; x++) {
                if (typeof specialArySave[(300 * (x + 1)) - 1] !== "undefined") {
                    if (typeof specialArySave[(300 * (x + 1)) - 1].ppv !== "undefined") {
                        fix = (specialArySave[(300 * (x + 1)) - 1].ppv).toFixed(1);
                    }
                }
                var adiv = ' onclick="pageFunction(' + x + ')"><div class="pagebut">' + parseInt(x + 1) + "<br>" + fix + "$</div></button>";
                if (x > 0) {
                    $("#mainPages1").append('<button class="tagbtn" ' + adiv);
                }
            }
        }
    }
    for (x = 0; x < Math.ceil(specialArySave.length / (300)); x++) {
        if (ssw.checked) {
            if (typeof specialArySave[(300 * (x + 1)) - 1] !== "undefined") {
                if (typeof specialArySave[(300 * (x + 1)) - 1].ppw !== "undefined") {
                    var fix = (specialArySave[(300 * (x + 1)) - 1].ppw).toFixed(1);
                }
            }
        } else {
            if (typeof specialArySave[(300 * (x + 1)) - 1] !== "undefined") {
                if (typeof specialArySave[(300 * (x + 1)) - 1].ppv !== "undefined") {
                    var fix = (specialArySave[(300 * (x + 1)) - 1].ppv).toFixed(1);
                }
            }
        }

        var adiv = ' onclick="pageFunction(' + x + ')"><div class="pagebut">' +
            parseInt(x + 1) + "<br>" + fix + "$</div></button>";
        var yes = 1;

        if ((x >= pageNum) && (x < pageNum + 5)) {
            if (yes) {
                $("#mainPages1").append('<button class="tagbtn" ' + adiv);
            }
        }
        if (x + 1 == (Math.ceil(specialArySave.length / (300)))) {
            var nextNum = pageNum;
            if (pageNum + 1 < (Math.ceil(specialArySave.length / (300)))) {
                nextNum++;
            }
            $("#mainPages1").append(
                '<button class="tagbtn" onclick="pageFunction(' + nextNum + ')"><div class="pagebut"">Next<br>Page</div></button>');
        }
    }
    refreshMDiv();
}
function tagFunction(word, pgnum) {
    var specialAry = [];
    for (i = 0; i < 95; i++) {
        mixedChart.data.datasets[0].data[i] = 0;
        mixedChart.data.datasets[1].data[i] = 0;
        mixedChart.data.datasets[2].data[i] = 0;
    }
    $("#tagRoute").html("/" + word);
    $(".hidec").hide()
    pageNum = 0;
    if (word == "") {
        window.history.pushState("", "", "index.html");
        $('#trendMin').html(
            'Minimum for first ' + trendNum + ' in trending: $ '
        );
        lowestRew = 10000;
        trendAry = [];
        startLoad('', trendNum + 1);
        $("#infoMain").children(0).next().html((allNum2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        $("#infoMain").next().children(0).next().html((allEarn2 * (globalEwi2 / (100))).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " $");
        $("#infoMain").next().next().children(0).next().html(allEarn2.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " $");
        $("#infoMain").next().next().next().children(0).next().html(globalEwi2.toFixed(1) + " %");
        $(".hidec").show();
        $("#btnmini100")
            .next().html(' ' + savedTable[0][0] + "")
            .next().html(" " + ((savedTable[0][0] / (allNum2)) * 100).toFixed(1) + "").next().html(' $ ' + savedTable[1][0].toFixed(0) + "")
            .next().html("  " + ((savedTable[1][0] / (allEarn2)) * 100).toFixed(1) + "")
            .next().html(' $ ' + savedTable[2][0].toFixed(0) + "")
            .next().html(" " + ((savedTable[2][0] / (savedTable[1][0])) * 100).toFixed(1) + "%");
        $("#btnmini6")
            .next().html(' ' + savedTable[0][1] + "")
            .next().html(" " + ((savedTable[0][1] / (allNum2)) * 100).toFixed(1) + "").next().html(' $ ' + savedTable[1][1].toFixed(0) + "")
            .next().html("  " + ((savedTable[1][1] / (allEarn2)) * 100).toFixed(1) + "")
            .next().html(' $ ' + savedTable[2][1].toFixed(0) + "")
            .next().html(" " + ((savedTable[2][1] / (savedTable[1][1])) * 100).toFixed(1) + "%");

        $("#btnmini0")
            .next().html(' ' + (allNum2) + "")
            .next().html(" " + (allNum2 / (allNum2)) * 100 + "").next().html(' $ ' + (allEarn2).toFixed(0) + "")
            .next().html(" " + ((allEarn2 / (allEarn2)) * 100).toFixed(1) + "")
            .next().html(' $ ' +
                (savedTable[2][0] +
                    savedTable[2][1]
                ).toFixed(0) + "")
            .next().html(" " + ((
                (savedTable[2][0] +
                    savedTable[2][1]) /
                (allEarn2)) * 100).toFixed(1) + "%");

        $("#addTag").html("");
        var limitz = 200;
        if (filtGayAry.length < limitz) {
            limitz = filtGayAry.length;
        }
        for (z = 0; z < limitz; z++) {
            //console.log("sorTagLen " + sortableTags.length + " " + word.length + z);
            //$("#addTag").append('<ons-list-item tappable><button class="tagbtn" onclick="tagFunctionAdd(' + "'" + sortableTags[z][0] + "'" + ',0)"><div style="widht:50px;border: 1px solid black;float:left; padding:5px;">' + sortableTags[z][0] + " (" + ((sortableTags[z][1] / (sortableTags[0][1])) * 100).toFixed(2) + "%) </div></button></ons-list-item>");
            $("#addTag").append('<ons-list-item onclick="tagFunction(' + "'" + filtGayAry[z][0] + "'" + ',0)" tappable><div class="center">' + filtGayAry[z][0] + '</div><div class="right">' + filtGayAry[z][1].toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '$</div></ons-list-item>');
        }
        for (x in savedAry) {
            drawToChart2(savedAry[x]);
            specialAry.push(savedAry[x]);
        }
        authEarn = authEarnSave.slice();
        $('#topauth').html("");
        var topcnt = 200;
        if (authEarn.length < topcnt) {
            topcnt = authEarn.length;
        }
        for (i = 0; i < topcnt; i++) {
            $('#topauth').append('<ons-list-item tappable><div class="center"><a href="https://steemit.com/@' +
                authEarn[i][0] + '">' + authEarn[i][0] + '</a></div><div class="right">' +
                authEarn[i][1].toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '$</div></ons-list-item>');
        }
        mixedChart.update();
    } else {
        var hdif = 0,
            hewi = 0,
            hnum = 0;
        subTagAry = [];
        word = word.replace(new RegExp(' ', 'g'), "$");
        word = word.split("$");
        var fword = "";
        for (i = 0; i < word.length; i++) {
            fword += word[i];
            if (i + 1 < word.length) {
                fword += "&";
            }
        }
        window.history.pushState("", "", "index.html?" + fword);
        if (word.length < 2) {
            authorz = [];
            authEarn = [];
            $('#trendMin').html(
                'Minimum for first ' + trendNum + ' in trending: $ '
            );
            lowestRew = 10000;
            trendAry = [];
            startLoad(word[0], trendNum + 1);
            for (x in savedAry) {
                for (y in savedAry[x].json_metadata.tags) {
                    if (word == savedAry[x].json_metadata.tags[y]) {
                        drawToChart2(savedAry[x]);
                        if (authorz.indexOf(savedAry[x].author) < 0) {
                            authorz.push(savedAry[x].author);
                            authEarn.push([savedAry[x].author, savedAry[x].ppw]);
                        } else {
                            for (usr in authEarn) {
                                if (authEarn[usr][0] == savedAry[x].author) {
                                    authEarn[usr][1] += savedAry[x].ppw;
                                    break;
                                }
                            }
                        }
                        for (z in savedAry[x].json_metadata.tags) {
                            if (typeof subTagAry[savedAry[x].json_metadata.tags[z]] === "undefined") {
                                subTagAry[savedAry[x].json_metadata.tags[z]] = 0;
                            } else if (isNaN(subTagAry[savedAry[x].json_metadata.tags[z]])) {
                                subTagAry[savedAry[x].json_metadata.tags[z]] = 0;
                            } else {
                                subTagAry[savedAry[x].json_metadata.tags[z]] += savedAry[x].ppv;
                            }

                        }
                        specialAry.push(savedAry[x]);
                        if ((savedAry[x].ppv) >= 100) {
                            hewi += savedAry[x].ppw;
                            hdif += savedAry[x].ppv - savedAry[x].ppw;
                        }
                    }
                }
            }
            authEarn.sort(function (a, b) {
                return b[1] - a[1];
            });
            $('#topauth').html("");
            var topcnt = 200;
            if (authEarn.length < topcnt) {
                topcnt = authEarn.length;
            }
            for (i = 0; i < topcnt; i++) {
                $('#topauth').append('<ons-list-item tappable><div class="center"><a href="https://steemit.com/@' + authEarn[i][0] + '">' + authEarn[i][0] + '</a></div><div class="right">' + authEarn[i][1].toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '$</div></ons-list-item>');
            }
        } else {
            lowestRew = 10000;
            trendAry = [];
            $('#trendMin').html(
                'Minimum for first ' + trendNum + ' in trending: $ '
            );
            authorz = [];
            authEarn = [];
            for (x in savedAry) {
                var cntw = 0;
                for (y in savedAry[x].json_metadata.tags) {
                    for (z in word)
                        if (word[z] == savedAry[x].json_metadata.tags[y]) {
                            cntw++;
                        }
                }
                if ((cntw == word.length) && (cntw > 0)) {
                    drawToChart2(savedAry[x]);
                    if (authorz.indexOf(savedAry[x].author) < 0) {
                        //console.log(savedAry[x].author);

                        authorz.push(savedAry[x].author);
                        authEarn.push([savedAry[x].author, savedAry[x].ppw]);
                    } else {
                        //authEarn[savedAry[x].author] += savedAry[x].ppw;
                        for (usr in authEarn) {
                            if (authEarn[usr][0] == savedAry[x].author) {
                                authEarn[usr][1] += savedAry[x].ppw;
                                break;
                            }
                        }

                    }
                    for (z in savedAry[x].json_metadata.tags) {
                        if (typeof subTagAry[savedAry[x].json_metadata.tags[z]] === "undefined") {
                            subTagAry[savedAry[x].json_metadata.tags[z]] = 0;
                        } else if (isNaN(subTagAry[savedAry[x].json_metadata.tags[z]])) {
                            subTagAry[savedAry[x].json_metadata.tags[z]] = 0;
                        } else {
                            subTagAry[savedAry[x].json_metadata.tags[z]] += savedAry[x].ppv;
                        }
                    }
                    specialAry.push(savedAry[x]);
                    if ((savedAry[x].ppv) >= 100) {
                        hewi += savedAry[x].ppw;
                        hdif += savedAry[x].ppv - savedAry[x].ppw;
                    }
                }
            }
            authEarn.sort(function (a, b) {
                return b[1] - a[1];
            });
            $('#topauth').html("");
            var topcnt = 200;
            if (authEarn.length < topcnt) {
                topcnt = authEarn.length;
            }
            for (i = 0; i < topcnt; i++) {
                $('#topauth').append('<ons-list-item tappable><div class="center"><a href="https://steemit.com/@' +
                    authEarn[i][0] + '">' + authEarn[i][0] + '</a></div><div class="right">' +
                    authEarn[i][1].toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '$</div></ons-list-item>');
            }

        }
        sortableTags = [];
        for (var u in subTagAry) {
            sortableTags.push([u, subTagAry[u]]);
        }
        sortableTags.sort(function (a, b) {
            return b[1] - a[1];
        });
        var cntend = 200;
        if (sortableTags.length < cntend) {
            cntend = sortableTags.length;
        }
        $("#addTag").html("");
        for (z = word.length; z < word.length + cntend - 1; z++) {
            //console.log("sorTagLen " + sortableTags.length + " " + word.length + z);
            //$("#addTag").append('<ons-list-item tappable><button class="tagbtn" onclick="tagFunctionAdd(' + "'" + sortableTags[z][0] + "'" + ',0)"><div style="widht:50px;border: 1px solid black;float:left; padding:5px;">' + sortableTags[z][0] + " (" + ((sortableTags[z][1] / (sortableTags[0][1])) * 100).toFixed(2) + "%) </div></button></ons-list-item>");
            if (z < sortableTags.length) {
                $("#addTag").append('<ons-list-item onclick="tagFunctionAdd(' + "'" + sortableTags[z][0] + "'" + ',0)" tappable><div class="center">' + sortableTags[z][0] + '</div><div class="right">' + sortableTags[z][1].toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '$</div></ons-list-item>');
            }
        }
        hnum = mixedChart.data.datasets[0].data[0];
        $("#btnmini100")
            .next().html("  " + hnum.toFixed(0) + "")
            .next().html("  " + ((hnum / (allNum2)) * 100).toFixed(1) + "%")
            .next().html(" $ " + (hewi + hdif).toFixed(0) + "")
            .next().html("  " + (((hewi + hdif) / (allEarn2)) * 100).toFixed(1) + "")
            .next().html(" $ " + (hewi).toFixed(0) + "")
            .next().html("  " + ((hewi / (hewi + hdif)) * 100).toFixed(1) + "%");
        var hnum2 = hnum,
            hewi2 = 0,
            hdif2 = 0;
        hnum = 0;
        for (i = 0; i < 95; i++) {
            hnum += mixedChart.data.datasets[0].data[i];
            hewi += mixedChart.data.datasets[1].data[i];
            hdif += mixedChart.data.datasets[2].data[i];
            hewi2 += mixedChart.data.datasets[1].data[i];
            hdif2 += mixedChart.data.datasets[2].data[i];
        }
        hnum2 = hnum - hnum2;
        $("#btnmini6")
            .next().html("  " + hnum2.toFixed(0) + "")
            .next().html("  " + ((hnum2 / (allNum2)) * 100).toFixed(1) + "%")
            .next().html(" $ " + (hewi2 + hdif2).toFixed(0) + "")
            .next().html("  " + (((hewi2 + hdif2) / (allEarn2)) * 100).toFixed(1) + "")
            .next().html(" $ " + (hewi2).toFixed(0) + "")
            .next().html("  " + ((hewi2 / (hewi2 + hdif2)) * 100).toFixed(1) + "%");
        $("#tagRoute").html().replace(new RegExp('$', 'g'), " ");
        $("#infoMain").children(0).next().html((hnum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        $("#infoMain").next().children(0).next().html((hewi).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " $");
        $("#infoMain").next().next().children(0).next().html((hewi + hdif).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " $");
        $("#infoMain").next().next().next().children(0).next().html(((hewi * 100) / (hewi + hdif)).toFixed(1) + " %");


    }
    mixedChart.update();


    var ssw = document.getElementById("msw");

    if (ssw.checked) {
        specialAry.sort(cmpPpw);
    } else {
        specialAry.sort(cmpPpv);
    }
    var cntend0 = 300;
    if (specialAry.length < 300) {
        cntend0 = specialAry.length;
    }
    $("#mainPages1").html('<button onclick="pageFunction(0)" class="tagbtn"><div class="pagebut"">Previus<br>Page</div></button>');
    for (x = 0; x < Math.ceil(specialAry.length / (300)); x++) {
        var fix = (6).toFixed(1);

        var fix2 = (0).toFixed(1);
        if (ssw.checked) {
            if (typeof specialAry[(300 * (x + 1)) - 1] !== "undefined") {
                if (typeof specialAry[(300 * (x + 1)) - 1].ppw !== "undefined") {
                    var fix = (specialAry[(300 * (x + 1)) - 1].ppw).toFixed(1);
                }
            }
        } else {
            if (typeof specialAry[(300 * (x + 1)) - 1] !== "undefined") {
                if (typeof specialAry[(300 * (x + 1)) - 1].ppv !== "undefined") {
                    var fix = (specialAry[(300 * (x + 1)) - 1].ppv).toFixed(1);
                }
            }

        }
        if ((x >= pageNum) && (x < pageNum + 5)) {
            var adiv = ' onclick="pageFunction(' + x + ')"><div class="pagebut">' +
                parseInt(x + 1) + "<br>" + fix + "$</div></button>";
            $("#mainPages1").append('<button class="tagbtn" ' + adiv);
        }
        if (x + 1 == (Math.ceil(specialAry.length / (300)))) {
            var nextNum = pageNum;
            if (pageNum + 1 < (Math.ceil(specialAry.length / (300)))) {
                nextNum++;
            }
            $("#mainPages1").append(
                '<button class="tagbtn" onclick="pageFunction(' + nextNum +
                ')"><div class="pagebut"">Next<br>Page</div></button>');
        }
    }
    specialArySave = specialAry.slice();
    refreshMDiv();
}