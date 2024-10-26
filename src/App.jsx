import { useEffect, useState } from 'react'
import './App.scss'

function App() {
  const [overhead, setOverhead] = useState(0);
  const [pray, setPray] = useState(0);
  const [attack, setAttack] = useState(false);
  const [jhadAttack, setJhadAttack] = useState(0);
  const [health, setHealth] = useState(100);
  const [jhadHealth, setJhadHealth] = useState(1000);
  const [healers, setHealers] = useState([
    {hp:75, triggered:false, attack: false},
    {hp:75, triggered:false, attack: false},
    {hp:75, triggered:false, attack: false},
    {hp:75, triggered:false, attack: false},
    {hp:75, triggered:false, attack: false},
    {hp:75, triggered:false, attack: false},
  ]);

  useEffect(() => {
    const attackInterval = setInterval(() => {
      let jhadsAttackStyle = Math.random(1) > .5 ? 0 : 1;
      setJhadAttack( _ => jhadsAttackStyle);
      setTimeout(() => {
        setAttack(atk => {
          if (atk){
            setJhadHealth(cur => cur-Math.floor(Math.random()*25))
            return true;
          }
          return false;
        })
        setHealers((cur) => {
          let newCur = [...cur];
          newCur.forEach((ele) => {
            if (ele.triggered ){
              ele.hp-=Math.floor(Math.random()*30)
              ele.attack = true;
            }
          })
          return newCur;
        })
        setOverhead(currentOverhead => {
          if (currentOverhead - 16 !== jhadsAttackStyle) {
            setHealth(cur => cur - Math.floor(Math.random()*97));
          }
          return currentOverhead;
        });
      },2000)
    }, 4000)
    return () => {
      clearInterval(attackInterval);
    }
  }, []);
  
  const activateHealer = (index) => {
    setHealers((cur)=>{
      let result = [...cur];
      result.forEach(ele => {
        ele.triggered = false;
      })
      result[index].triggered = true;
      setAttack(_ => false);
      return result
    })
  }

  const deactivateHealer = () => {
    setHealers(cur => {
      let newCur = [...cur];
      newCur.forEach(ele =>{
        ele.triggered = false;
      })
      return newCur;
    })
  }

  const reset = () => {
    setJhadHealth(1000);
    setHealth(100);
    setHealersHealth([
      {hp:75, triggered:false},
      {hp:75, triggered:false},
      {hp:75, triggered:false},
      {hp:75, triggered:false},
      {hp:75, triggered:false},
      {hp:75, triggered:false},
    ]);
  }

  return (
    <>
      <div className='jhad'>
        <div className="card">
          <div>
            Jhad: {jhadHealth}
          </div>
          <button className={attack ? 'active' : ''}  onClick={() => {setAttack(true);deactivateHealer()}}>
            <img src={ jhadAttack ? "./src/assets/range.png" : "./src/assets/mage.png"} />
          </button>
        </div>
        <div className="card">
          Healers:
          {healers.map((ele, index) => {
            return <div key={index}>
              {!ele.attack && <span>healing </span>}
              <button className={ele.triggered ? 'active' : ''} onClick={() => activateHealer(index)}>{ele.hp}</button>
              {ele.attack && <span> attacking</span>}
            </div>
        })}
        </div>
      </div>

      <div></div>
      {
        (health>0) ? 
        <div className="card">
          { overhead === 18 && <img src="./src/assets/melee.png"></img> }
          { overhead === 17 && <img src="./src/assets/range.png"></img> }
          { overhead === 16 && <img src="./src/assets/mage.png"></img> }
          { overhead === 21 && <img src="./src/assets/red_smite.png"></img> }
          { overhead === 22 && <img src="./src/assets/redemption.png"></img> }
          { overhead === 23 && <img src="./src/assets/smite.png"></img> }
          <div>HEALTH: {health}</div> 
        </div>
        : <button onClick={reset}>DEAD CLICK TO RESET</button>
      }
      
      <div className="prayer">
        <div>
          {new Array(30).fill(null).map((_, index) => (
            <div key={index} id={`div-${index}`} onClick={() => {
              if (index===16 || index===17 || index===18 || index===21 || index===22 || index===23){
                setOverhead(cur => (index===cur) ? 0 : index);
              }
              setPray(cur => (index===cur) ? 0 : index);
            }}></div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
