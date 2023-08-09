"use client"
import ChartDisplay from './Chart/page'
import { useEffect, useState } from 'react'
import { Switch } from 'antd-mobile'
import { Select } from 'antd'
import { useLocalStorage } from './hooks/useLocalStorage'


export default function Home() {
  const coins = ['ethereum', 'dogecoin', 'solana'];
  const options = coins.map((ele => ({ label: ele, value: ele })));
  const [selected, setSelected] = useLocalStorage('selected',[]);  
  const [type, setType] = useState("row");

  

  useEffect(() => {    
    localStorage.setItem("selected", JSON.stringify(selected));            
  }, [selected]);


  return (
    <main className="flex flex-col items-center justify-evenly	p-24">
      <h1 className='text-3xl font-bold mb-4'>Welcome to Crypto Tracker</h1>

      {selected.length==0 && <Select
        mode="multiple"
        allowClear
        style={{
          width: '100%',
        }}        
        placeholder="Please select"
        onChange={(e) => { console.log("Changed",e);setSelected(e) }}
        options={options}
      />}
      {selected.length>0 && <Select
        mode="multiple"
        allowClear
        style={{
          width: '100%',
        }}
        defaultValue={selected}
        placeholder="Please select"
        onChange={(e) => { console.log("Changed",e);setSelected(e) }}
        options={options}
      />}
      
      <div className='mb-2 mt-2'>
        <label className='mx-2'>Row</label>
        <Switch onChange={(value) => {
          if (value) setType("col")
          else setType("row")
        }} defaultChecked={type === 'row' ? false : true} />
        <label className='mx-2'>Column</label>
      </div>
      <div className={`flex ${type === 'row' ? 'flex-row' : 'flex-col'} justify-evenly px-2 flex-wrap`}>
        {selected?.map(coin => (<ChartDisplay key={coin} crypto={coin} />))}
      </div>
    </main>
  )
}
