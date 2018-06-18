function getCreated(tag, dayBegin, dayEnd) {
    if (notFirstPost == 0) {
        notFirstPost = 1;
        steem.api.getDiscussionsByCreated({
            "tag": tag,
            "limit": 100
        }, function (err, result) {
            allPostParser(err, result, dayBegin, dayEnd, tag);
        });
    } else {
        steem.api.getDiscussionsByCreated({
            "tag": tag,
            "limit": 100,
            "start_permlink": window.permlink,
            "start_author": window.author
        }, function (err, result) {
            allPostParser(err, result, dayBegin, dayEnd, tag);
        });
    }
}
function checkTrend(permlink, author, n) {
    steem.api.getDiscussionsByBlog({
        "tag": author,
        "limit": 1,
        "start_permlink": permlink,
        "start_author": author
    }, function (err, resultv) {
        var progT = (100 * n / (trendCnt - 2)).toFixed(2);
        $("#trendProg").width(progT + "%");
        $("#trendProg").text(progT + "%");
        if (parseFloat(resultv[0].pending_payout_value.substring(0, resultv[0].pending_payout_value.length - 4)) < lowestRew) {
            lowestRew = parseFloat(resultv[0].pending_payout_value.substring(0, resultv[0].pending_payout_value.length - 4));
        }
        if (n == trendCnt - 2) {
            //cs("krajTrending");
            var dayDiff = new Date().getTime() - new Date(oldestTimeTrend).getTime();
            //cs(convertMS(dayDiff));
            firstTimeTrend = 0;
            //getCreated("", 0, 7);
            $("#trendtag").text("Minimum $ " + lowestRew.toFixed(1) + " SBD to be in first 100 by tag.");
            $("#trendProg").hide();
        }
    });
}
function trendPostParser(err, result) {
    if (err === null) {
        var i, len = result.length;
        for (i = 0; i < len; i++) {
            var discussion = result[i];
            if (i == len - 1) {
                window.permlink = discussion.permlink;
                window.author = discussion.author;
            } else {
                if (oldestTimeTrend.getTime() > new Date(discussion.created).getTime()) {
                    oldestTimeTrend = new Date(discussion.created);
                } else {
                    new Date(oldestTimeTrend).toISOString().replace('T', ' ').slice(0, 19);
                }
                trendAry.push(discussion);
                checkTrend(discussion.permlink, discussion.author, trendAry.length - 1);
            }
            if ((i == 0) && (firstTimeTrend == 0)) {
                firstTimeTrend = 1;
                firstDateTrend = new Date(discussion.created);
            }
        }
    } else {
        cs(err);
    }
}
function trendNumChange() {
    console.log("chang");
    trendNum = parseInt($('#trendInput').val());
    $('#trendMin').html(
        'Minimum for first ' + trendNum + ' in trending: $ '
    );
    lowestRew = 10000;
    trendAry = [];
    startLoad(lasttag, trendNum + 1);
}
function startLoad(tag, limit) {
    lasttag = tag;
    if (limit > 99) {
        if (notFirstTrendPost == 0) {
            notFirstTrendPost = 1;
            steem.api.getDiscussionsByTrending({
                "tag": tag,
                "limit": 100
            }, function (err, result) {
                trendPostParser(err, result);
                startLoad(tag, limit);
            });
            limit -= 99;
        } else {
            var limit2 = 100;
            if (limit <= limit2) {
                limit2 = limit;
            }
            steem.api.getDiscussionsByTrending({
                "tag": tag,
                "limit": limit2,
                "start_permlink": window.permlink,
                "start_author": window.author
            }, function (err, result) {
                trendPostParser(err, result);
                startLoad(tag, limit);
            });
            limit -= limit2 - 1;
        }
    } else {
        if (notFirstTrendPost) {
            steem.api.getDiscussionsByTrending({
                "tag": tag,
                "limit": limit,
                "start_permlink": window.permlink,
                "start_author": window.author
            }, function (err, result) {
                trendPostParser(err, result);
                trendAry.sort(function (a, b) {
                    return parseFloat(a.pending_payout_value.slice(0, -4)) -
                        parseFloat(b.pending_payout_value.slice(0, -4));
                });
                $('#trendMin').html(
                    'Minimum for first ' + trendNum +
                    ' in trending: $ ' + trendAry[0].pending_payout_value
                );
                notFirstTrendPost = 0;
            });
        } else {
            window.permlink = savpermlink;
            window.author = savauthor;
            steem.api.getDiscussionsByTrending({
                "tag": tag,
                "limit": limit,
                "start_permlink": window.permlink,
                "start_author": window.author
            }, function (err, result) {
                trendPostParser(err, result);
                trendAry.sort(function (a, b) {
                    return parseFloat(a.pending_payout_value.slice(0, -4)) -
                        parseFloat(b.pending_payout_value.slice(0, -4));
                });
                $('#trendMin').html(
                    'Minimum for first ' + trendNum +
                    ' in trending: $ ' + trendAry[0].pending_payout_value
                );
                notFirstTrendPost = 0;
            });
        }

        limit = 0;
    }
}