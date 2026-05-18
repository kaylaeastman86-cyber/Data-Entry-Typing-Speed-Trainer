'use client';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
const data=[
  {d:'Mon',wpm:28,acc:92,kph:6500,sessions:2},
  {d:'Tue',wpm:30,acc:94,kph:7100,sessions:1},
  {d:'Wed',wpm:34,acc:95,kph:7600,sessions:2}
];
export default function Progress(){
  return(
    <main className='page'>
      <h2>Progress</h2>
      <div className='card' style={{height:260}}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey='d'/><YAxis/><Tooltip/>
            <Line dataKey='wpm'/><Line dataKey='acc'/><Line dataKey='kph'/>
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className='card' style={{height:260,marginTop:16}}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey='d'/><YAxis/><Tooltip/>
            <Bar dataKey='sessions'/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}
