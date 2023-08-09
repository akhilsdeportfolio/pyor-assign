"use client"

import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Card, SpinLoading } from 'antd-mobile';
import moment from 'moment/moment';
import { Select } from 'antd';

export default function ChartDisplay({ crypto="ethereum",direction="row"}) {
    const ref = useRef(null);


    const [data, setData] = useState({ x: [], y: [] });
    const [loading,setLoading]=useState(true);
    const coins = ['ethereum', 'dogecoin', 'solana'];
    const options = coins.map((ele => ({ label: ele, value: ele })));
    const [isSelected,setIsSelected]=useState(true);
    const [selected,setSelected]=useState([crypto]);


    

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


        return ()=>{
            myChart.dispose()
        }

    }, [ref, data]);


    // ANT DESIGN 
  // MUI DESIGN 

    






    useEffect(() => {

        async function fetchData(crypto) {
            const data = await fetch(`https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=usd&days=365&interval=daily`,{});
            setLoading(false);
            const json = await data.json();
            console.log("JSON",json);
            const X = json.prices.map((el) => moment.unix(el[0]).format('MMMM'));
            const Y = json.prices.map((el) => (el[1]));
            setData({ x: X, y: Y })
        }
        fetchData(crypto)
    }, []);


    useEffect(() => {

        async function fetchData(crypto) {
            const data = await fetch(`https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=usd&days=365&interval=daily`,{});
            setLoading(false);
            const json = await data.json();
            console.log("JSON",json);
            const X = json.prices.map((el) => moment.unix(el[0]).format('MMMM'));
            const Y = json.prices.map((el) => (el[1]));
            setData({ x: X, y: Y })
        }
        fetchData(selected)
    }, [selected]);

    

    if(!crypto)
    return null;


    return (

        <div className='shadow-sm' style={{display:'flex',flexDirection:direction}}>

        <Select         
        onChange={(selected)=>{
            console.log(selected);
            setSelected(selected);
        }}
        defaultValue={selected}
        options={options}
        />
        

        <Card className='p-2 border border-blue-200 m-2'>
            <h1 className='text-xl text-center text-blue-500'>{String(selected).toUpperCase()}</h1>
            {loading && <div className='text-center'><SpinLoading/></div>}
            <div ref={ref} id='chart' style={{ minWidth: '32vw', minHeight: '32vh' }} className='text-center'/>                
            
        </Card>
        </div>
    )
}
