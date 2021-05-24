import React from 'react';

import VariablesForm from "./VariablesForm";
import "./styles.css";

const initialState = {
  holdings: '',
  period: 1,
  supply: 1000000,
  volume: 0,
  days: 7
}

function App() {
  const [state, setState] = React.useState(() => initialState);

  const apiKey = '7ZZ4WKZZIB8B71XYFV8Z1I1WD7B44GZCUJ'
  const contract = '0x355389292D8c963719FDaF0651f7846D6c504448'

  React.useEffect(() => {
    fetch(`https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${contract}&apikey=${apiKey}`)
    .then(res => res.json())
    .then((data) => {

      const newSupply = Number(data.result/1000000000000000000000)

      fetch(`https://api.coingecko.com/api/v3/coins/hakuna-metata/market_chart?vs_currency=usd&days=${state.days}&interval=daily`)
      .then(res => res.json())
      .then((data) => {
        const volumes = data.total_volumes
        const days = data.total_volumes.length
        let volumeSum = 0
        for (let i = 0; i < volumes.length; i++) {
          volumeSum += volumes[i][1]
        }
        setState({ ...state, volume: Number((volumeSum/days).toFixed(2)), supply: Number(newSupply.toFixed(2)) })
      })
      .catch(console.log)

    })
    .catch(console.log)
  }, []);

  return (
    <div id="annualCompoundCalculator">
      <h1 className="text-center"><span style={{color: 'orange'}}>$TATA</span> Earnings Calculator</h1>
      <span>The figures given by this tool are only estimations. This calculator uses an n-day moving average of historical trade volume in order to predict potential earnings in the future.</span>
      <hr />
      <VariablesForm setState={setState} state={state} />
      <hr />
      <h1 style={{textAlign: 'center'}}>You earn <span style={{color: 'lime', fontSize: '48px'}}>${(((state.holdings/1000)/state.supply)*(state.volume*0.13)).toFixed(2)}</span> in a day</h1>
      <span>In one day, you earn <span style={{color: 'lime', textDecoration: 'underline'}}>${(((state.holdings/1000)/state.supply)*(state.volume*0.13)).toFixed(2)}</span> of passive income on your <span style={{color: 'orange'}}>$TATA</span> holdings. The price of <span style={{color: 'orange'}}>$TATA</span> <span style={{fontWeight: 'bold', color: 'red'}}>DOES NOT MATTER</span> in this calculation. Whether people buy or sell, and whether the price goes up or down, you earn the same dollar amount on your holdings.<br/><br/><span style={{fontWeight: 'bold', color: 'red'}}>IN ADDITION</span>, your <span style={{color: 'orange'}}>$TATA</span> holdings grow by the amount you earn <span style={{color: 'lime', fontWeight: 'bold', textDecoration: 'underline'}}>DAILY</span>, which causes your future earnings to be <span style={{color: 'lime', textDecoration: 'underline', fontWeight: 'bold'}}>COMPOUNDED</span> and increase over time (assuming volume stays constant or grows).<br/><br/>This is the power of <span style={{color: 'orange'}}>$TATA</span>'s <span style={{color: 'lime', textDecoration: 'underline', fontWeight: 'bold'}}>REVOLUTIONARY TOKENOMICS</span> scheme. This is why it is more logical to <span style={{color: 'lime', textDecoration: 'underline', fontWeight: 'bold'}}>HODL</span> your tokens rather than sell them and <span style={{fontWeight: 'bold', color: 'red'}}>LOSE OUT ON PASSIVE INCOME</span>.</span>
    </div>
  );
}

export default App;
