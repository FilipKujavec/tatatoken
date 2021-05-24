import * as React from "react";

function VariablesForm({ setState, state }) {

  const { holdings, period, supply, volume, days } = state;

  //Debouncing for days slider
  React.useEffect(() => {
    const timeset = setTimeout(() => {
      sliderFetch(days);
    }, 100);

    return () => {
      clearTimeout(timeset);
    };
  }, [days])

  const sliderFetch = (daysSet) => {
    fetch(`https://api.coingecko.com/api/v3/coins/hakuna-metata/market_chart?vs_currency=usd&days=${daysSet}&interval=daily`)
      .then(res => res.json())
      .then((data) => {
        const volumes = data.total_volumes
        const days = data.total_volumes.length
        let volumeSum = 0
        for (let i = 0; i < volumes.length; i++) {
          volumeSum += volumes[i][1]
        }
        setState({ ...state, volume: Number((volumeSum/days).toFixed(2)) })
      })
      .catch(console.log)
  };
      

  return (
    <section>
      <h2 style={{textAlign: 'center', marginBottom: '24px'}}>Calculate Your Passive Income</h2>
      <div className="flex">
        <label htmlFor="holdings">
          Your $TATA Holdings (In Billions)
          <input
            className="variableInput"
            type="number"
            id="holdings"
            name="holdings"
            placeholder="Example: 100"
            value={holdings}
            onChange={({ target }) => setState({ ...state, holdings: Number(target.value) })}
          />
        </label>
        <label htmlFor="period">
          Projection Period (In Days)
          <input
            className="variableInput"
            style={{background: 'orange'}}
            type="text"
            id="period"
            name="period"
            disabled
            value={'Coming Soon!'}
            onChange={({ target }) => setState({ ...state, period: Number(target.value) })}
          />
        </label>
        <label htmlFor="supply">
          Current $TATA Supply (In Trillions)
          <input
            className="variableInput"
            style={{background: 'lightgrey'}}
            type="number"
            id="supply"
            name="supply"
            value={supply}
            onChange={({ target }) => setState({ ...state, supply: Number(target.value) })}
          />
        </label>
        <label htmlFor="volume">
          Average Daily $TATA Volume (In USD)
          <input
            className="variableInput"
            style={{background: 'lightgrey'}}
            type="number"
            id="volume"
            name="volume"
            value={volume}
            onChange={({ target }) =>
              setState({ ...state, volume: Number(target.value) })
            }
          />
        </label>
        <label htmlFor="days" className="slidecontainer">
          Days To Average Daily Volume Over (7 Days Suggested)
          <span className="rangeLabel">Average Of The Last {days} Days</span>
          <input
            type="range"
            min="1"
            max="7"
            steps="1"
            value={days}
            className="slider"
            id="days"
            onChange={({ target }) => setState({ ...state, days: Number(target.value) })}
          />
        </label>
      </div>
    </section>
  );
}

export default VariablesForm;
