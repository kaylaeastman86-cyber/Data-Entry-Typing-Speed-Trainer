import Nav from '@/components/Nav';
const skills=['Standard Typing','Names','Addresses','Phone Numbers','Emails','Dates','Invoice Numbers','Order Numbers','Customer IDs','Account Numbers','SKUs / Product Codes','Tracking Numbers','Dollar Amounts','10-Key Number Pad','Customer Notes','Office Forms','Mixed Data Entry','Weak Skill Practice'];
export default function Skill(){
  return(
    <main className='page'>
      <Nav/>
      <h2>Train by Skill</h2>
      <div className='grid grid-2'>
        {skills.map(sk=>(
          <div className='card' key={sk}>
            <h3>{sk}</h3>
            <button>Start Drill</button>
          </div>
        ))}
      </div>
      <div className='card'>Practice selection ad placeholder</div>
    </main>
  );
}
