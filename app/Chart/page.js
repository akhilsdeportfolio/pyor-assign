"use client"

import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Card, SpinLoading } from 'antd-mobile';
import moment from 'moment/moment';

export default function ChartDisplay({ crypto = "ethereum" }) {
    const ref = useRef(null);
    const [data, setData] = useState({ x: [], y: [] });
    const [loading,setLoading]=useState(true);

    useEffect(() => {        
        var myChart = echarts.init(ref.current);
        var option;

        option = {
            xAxis: {
                type: 'category',
                data: [...data?.x],                
            },
            yAxis: {
                type: 'value',                
            },
            series: [
                {
                    data: [...data?.y],
                    type: 'line',
                    smooth: true,
                    areaStyle: { color: 'lightgreen' }
                }
            ]
        };

        myChart.setOption(option);

    }, [ref, data]);


    useEffect(() => {

        async function fetchData(crypto) {
            const data = await fetch(`https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=usd&days=365&interval=daily`,{});
            setLoading(false);
            const json = await data.json();
            const X = json.prices.map((el) => moment.unix(el[0]).format('MMMM'));
            const Y = json.prices.map((el) => (el[1]));
            setData({ x: X, y: Y })
        }
        fetchData(crypto)
    }, []);


    return (
        <Card className='p-2 border border-blue-200 m-2'>
            <h1 className='text-xl text-center text-blue-500'>{String(crypto).toUpperCase()}</h1>
            {loading && <div className='text-center'><SpinLoading/></div>}
            <div ref={ref} id='chart' style={{ minWidth: '32vw', minHeight: '32vh' }} className='text-center'/>                
            
        </Card>
    )
}
