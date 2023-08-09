"use client"
import ChartDisplay from './Chart/page'
import { useEffect, useState } from 'react'
import { Button, Switch } from 'antd-mobile'
import { Input, Radio, Select } from 'antd'
import { useLocalStorage } from './hooks/useLocalStorage'
import {Modal} from 'antd';


export default function Home() {
  const coins = ['ethereum', 'dogecoin', 'solana'];
  const options = coins.map((ele => ({ label: ele, value: ele })));
  const [selected, setSelected] = useLocalStorage('selected',[]);  
  const [type, setType] = useState("col");

  const [config,setConfig]=useState({});
  

  

  useEffect(()=>{
    console.log(config)
  },[config]);

  useEffect(() => {    
    localStorage.setItem("selected", JSON.stringify(selected));            
  }, [selected]);


  return (
    <main className="flex flex-col items-center justify-evenly	p-24">
      <h1 className='text-3xl font-bold mb-4'>Welcome to Crypto Tracker</h1>

    {/*   {selected.length==0 && <Select
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
        onChange={(e) => { setSelected(e) }}
        options={options}
      />} */}
            
    
            <div style={{minWidth:'200px'}}>
      <label>Select Coin</label>  
      <Select        
        allowClear
        style={{
          width: '100%',
        }}
        defaultValue={'ethereum'}
        placeholder="Please select"
        onChange={(e) => {setConfig({...config,coin:e}) }}
        options={options}
      />
      <label>
        Select Direction
      </label>
      <div>
        <Radio.Group onChange={(val)=>setConfig({...config,direction:val.target.value})} defaultValue={'row'}>
        <Radio name='direction' value={"row"}>Row</Radio>
        <Radio name='direction' value={"column"}>Column</Radio>
        </Radio.Group>
      </div>
      <Button  onClick={()=>{
          setSelected([...selected,config])
          setConfig({});
      }}>
        Add Page to Dashboard
      </Button>
      </div>

      <br/>

      <div className={`flex flex-row justify-evenly px-2 flex-wrap`}>
        {selected?.map((el,index) => (<ChartDisplay key={index} crypto={el.coin} direction={el.direction}/>))}
      </div>
      

      

      


    </main>
  )
}
