var os = [];
for (y = 0; y < 101; y++) {
    os[y] = 100 - y;
};

var o = [100, 6, 1, 0]; //price tags >100,<100,6>,<6,1>,<1,0>
var o2 = [0, 0, 0, 0]; //ppvSum
var o1 = o2.slice(); //post cnt
var o3 = o2.slice(); //ppwSum

function dataToTable(zy, _ppv, _ppw) {
    o1[zy]++;
    o2[zy] += _ppv;
    o3[zy] += _ppw;
    $("#btn" + o[zy])
        .next().html(" $ " + o3[zy].toFixed(0) + "")
        .next().html(" $ " + o2[zy].toFixed(0) + "")
        .next().html(" " + (o3[zy] / o2[zy]).toFixed(2) + "")
        .next().html(" " + o1[zy] + "");
};
function dataToChart2(zy, _ppv, _ppw) {
    mixedChart.data.datasets[0].data[zy]++;
    mixedChart.data.datasets[1].data[zy] += _ppw;
    mixedChart.data.datasets[2].data[zy] += _ppv - _ppw;
};

var ctx = document.getElementById("chart0");
                var mixedChart = new Chart(ctx, {
                    type: 'bar',
                    height: 0.5,
                    data: {
                        datasets: [{
                            label: 'Number of posts (right axis)',
                            data: [],
                            type: 'line',
                            borderColor: 'rgb(0,118,255)',
                            pointRadius: 5,
                            yAxisID: 'right-y-axis',
                        }, {
                            label: 'Earnings',
                            backgroundColor: 'rgb(50,205,50)',
                            data: [],
                        }, {
                            label: 'Interest (Authors, Beneficiaries, Bots)',
                            data: [],
                            backgroundColor: 'rgb(255,50,120)',
                        }],
                        labels: ['>$100', '$99', '$98', '$97', '$96', '$95', '$94', '$93', '$92', '$91', '$90',
                            '$89',
                            '$88', '$87', '$86', '$85', '$84', '$83', '$82', '$81', '$80', '$79', '$78',
                            '$77',
                            '$76', '$75', '$74', '$73', '$72', '$71', '$70', '$69', '$68', '$67', '$66',
                            '$65',
                            '$64', '$63', '$62', '$61', '$60', '$59', '$58', '$57', '$56', '$55', '$54',
                            '$53',
                            '$52', '$51', '$50', '$49', '$48', '$47', '$46', '$45', '$44', '$43', '$42',
                            '$41',
                            '$40', '$39', '$38', '$37', '$36', '$35', '$34', '$33', '$32', '$31', '$30',
                            '$29',
                            '$28', '$27', '$26', '$25', '$24', '$23', '$22', '$21', '$20', '$19', '$18',
                            '$17',
                            '$16', '$15', '$14', '$13', '$12', '$11', '$10', '$9', '$8', '$7', '$6',
                        ]
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                stacked: true
                            }],
                            yAxes: [{
                                stacked: true
                            }, {
                                id: 'right-y-axis',
                                type: 'linear',
                                position: 'right'
                            }]
                        }
                    }
                });
                for (i = 0; i < 95; i++) {
                    mixedChart.data.datasets[0].data.push(0);
                    mixedChart.data.datasets[1].data.push(0);
                    mixedChart.data.datasets[2].data.push(0);
                    mixedChart.update();
                }






function drawToChart2(savedAryi) {
    var a = 0;
    var savedAry = [0];
    savedAry[a] = savedAryi;
    if (savedAry[a].ppv >= os[0]) {
        dataToChart2(0, 0, 0);
    } else
    if (savedAry[a].ppv >= os[1]) {
        dataToChart2(1, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[2]) {
        dataToChart2(2, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[3]) {
        dataToChart2(3, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[4]) {
        dataToChart2(4, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[5]) {
        dataToChart2(5, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[6]) {
        dataToChart2(6, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[7]) {
        dataToChart2(7, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[8]) {
        dataToChart2(8, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[9]) {
        dataToChart2(9, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[10]) {
        dataToChart2(10, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[11]) {
        dataToChart2(11, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[12]) {
        dataToChart2(12, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[13]) {
        dataToChart2(13, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[14]) {
        dataToChart2(14, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[15]) {
        dataToChart2(15, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[16]) {
        dataToChart2(16, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[17]) {
        dataToChart2(17, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[18]) {
        dataToChart2(18, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[19]) {
        dataToChart2(19, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[20]) {
        dataToChart2(20, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[21]) {
        dataToChart2(21, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[22]) {
        dataToChart2(22, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[23]) {
        dataToChart2(23, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[24]) {
        dataToChart2(24, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[25]) {
        dataToChart2(25, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[26]) {
        dataToChart2(26, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[27]) {
        dataToChart2(27, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[28]) {
        dataToChart2(28, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[29]) {
        dataToChart2(29, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[30]) {
        dataToChart2(30, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[31]) {
        dataToChart2(31, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[32]) {
        dataToChart2(32, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[33]) {
        dataToChart2(33, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[34]) {
        dataToChart2(34, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[35]) {
        dataToChart2(35, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[36]) {
        dataToChart2(36, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[37]) {
        dataToChart2(37, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[38]) {
        dataToChart2(38, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[39]) {
        dataToChart2(39, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[40]) {
        dataToChart2(40, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[41]) {
        dataToChart2(41, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[42]) {
        dataToChart2(42, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[43]) {
        dataToChart2(43, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[44]) {
        dataToChart2(44, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[45]) {
        dataToChart2(45, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[46]) {
        dataToChart2(46, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[47]) {
        dataToChart2(47, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[48]) {
        dataToChart2(48, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[49]) {
        dataToChart2(49, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[50]) {
        dataToChart2(50, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[51]) {
        dataToChart2(51, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[52]) {
        dataToChart2(52, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[53]) {
        dataToChart2(53, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[54]) {
        dataToChart2(54, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[55]) {
        dataToChart2(55, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[56]) {
        dataToChart2(56, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[57]) {
        dataToChart2(57, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[58]) {
        dataToChart2(58, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[59]) {
        dataToChart2(59, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[60]) {
        dataToChart2(60, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[61]) {
        dataToChart2(61, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[62]) {
        dataToChart2(62, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[63]) {
        dataToChart2(63, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[64]) {
        dataToChart2(64, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[65]) {
        dataToChart2(65, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[66]) {
        dataToChart2(66, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[67]) {
        dataToChart2(67, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[68]) {
        dataToChart2(68, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[69]) {
        dataToChart2(69, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[70]) {
        dataToChart2(70, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[71]) {
        dataToChart2(71, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[72]) {
        dataToChart2(72, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[73]) {
        dataToChart2(73, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[74]) {
        dataToChart2(74, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[75]) {
        dataToChart2(75, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[76]) {
        dataToChart2(76, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[77]) {
        dataToChart2(77, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[78]) {
        dataToChart2(78, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[79]) {
        dataToChart2(79, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[80]) {
        dataToChart2(80, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[81]) {
        dataToChart2(81, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[82]) {
        dataToChart2(82, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[83]) {
        dataToChart2(83, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[84]) {
        dataToChart2(84, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[85]) {
        dataToChart2(85, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[86]) {
        dataToChart2(86, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[87]) {
        dataToChart2(87, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[88]) {
        dataToChart2(88, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[89]) {
        dataToChart2(89, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[90]) {
        dataToChart2(90, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[91]) {
        dataToChart2(91, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[92]) {
        dataToChart2(92, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[93]) {
        dataToChart2(93, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[94]) {
        dataToChart2(94, savedAry[a].ppv, savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[95]) { //dataToChart2(95,savedAry[a].ppv,savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[96]) { //dataToChart2(96,savedAry[a].ppv,savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[97]) { //dataToChart2(97,savedAry[a].ppv,savedAry[a].ppw);   
    } else
    if (savedAry[a].ppv >= os[98]) { //dataToChart2(98,savedAry[a].ppv,savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[99]) { //dataToChart2(99,savedAry[a].ppv,savedAry[a].ppw);
    } else
    if (savedAry[a].ppv >= os[100]) { //dataToChart2(100,savedAry[a].ppv,savedAry[a].ppw);
    }
}