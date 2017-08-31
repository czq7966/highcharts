
QUnit.test('Test algorithm on data updates.', function (assert) {

    var chart = Highcharts.stockChart('container', {
        series: [{
            id: 'main',
            data: [
                13, 14, 15, 13, 14, 15,
                13, 14, 15, 13, 14, 15,
                13, 14, 15, 13, 14, 15,
                13, 14, 15, 13, 14, 15,
                13, 14, 15, 13, 14, 15
            ]
        }, {
            type: 'sma',
            linkedTo: 'main'
        }]
    });

    assert.strictEqual(
        chart.series[0].points.length,
        chart.series[1].points.length + chart.series[1].options.params.period,
        'Initial number of SMA points is correct'
    );

    chart.series[0].addPoint(13);

    assert.strictEqual(
        chart.series[0].points.length,
        chart.series[1].points.length + chart.series[1].options.params.period,
        'After addPoint number of SMA points is correct'
    );

    chart.series[0].setData([11,12,13,14,15,16,17], false);
    chart.series[1].update({
        color: 'red',
        params: {
            period: 3
        }
    });

    assert.deepEqual(
        chart.series[1].yData,
        [13, 14, 15, 16],
        'Correctl values'
    );

    assert.strictEqual(
        chart.series[1].graph.attr('stroke'),
        'red',
        'Line color changed'
    );

    chart.series[0].points[6].remove();

    assert.deepEqual(
        chart.series[1].yData,
        [13, 14, 15],
        'Correct values after point.remove()'
    );
});