import { createRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';


const DollarCostAveraginCalc = () => {
  const [calcResult, setCalcResult] = useState(null);

  function onSubmit(event) {
    event.preventDefault();

    const validatedArgs = validateAndParseInput(
      prices.current.value,
      todaysPrice.current.value,
      monthlySpendingLimit.current.value,
      dividendYieldPercent.current.value,
      dividendYieldPeriodInMonths.current.value,
    );

    if (validatedArgs) {
      setCalcResult(calc(...validatedArgs));
    }
  }

  const prices = createRef();
  const todaysPrice = createRef();
  const monthlySpendingLimit = createRef();
  const dividendYieldPercent = createRef();
  const dividendYieldPeriodInMonths = createRef();

  return (
    <Container>
      <Row className="p-3" lg={2}>
        <form>
          <p>work in progress</p>
          <h2>Dollar Cost Averaging Calc</h2>
          <div className="form-group">
            <label>Prices During Each Purchase</label>
            <textarea ref={prices} className="form-control"
                   aria-describedby="cutoff_probability_help" />
            <small className="form-text text-muted">
              Newline separated.
              Each price should be the monthly price of the security bought.
            </small>
          </div>
          <div>
            <label>Todays Average Price</label>
            <input ref={todaysPrice} type="number" className="form-control" />
          </div>
          <div>
            <label>Monthly Spending Limit</label>
            <input ref={monthlySpendingLimit} defaultValue={10_000} type="number" className="form-control" />
            <small className="form-text text-muted">
              Maximum amount spent per (monthly) time period.
            </small>
          </div>
          <div>
            <label>Dividend Yield %</label>
            <input ref={dividendYieldPercent} defaultValue={1.00} type="number" className="form-control" />
          </div>
          <div>
            <label>Dividend Yield Period (Months)</label>
            <input ref={dividendYieldPeriodInMonths} defaultValue={3} type="number" className="form-control" />
          </div>
          <input type="submit" className="btn btn-primary" onClick={onSubmit} />
        </form>
      </Row>
      <hr />
      <Row>
        <DollarCostAveragingResult calcResult={calcResult} />
      </Row>
    </Container>
  );
};

const DollarCostAveragingResult = (props) => {
  const { calcResult } = props;
  if (!calcResult) return null;

  const { input, ...results } = calcResult;

  const inputRowText = Object
    .entries(input) // [['trials', 10], ...]
    .map(([key, value]) => `${key} = ${value}`) // ['trials = 10', ...]
    .join(', '); // 'trials = 10, ...'

  const divider = Array(50).fill('-');
  const renderArrayOfStrings = array => array.map(textLine => <div>{textLine}</div>)
  const output = JSON.stringify(results, null, 2).split('\n');

  return (
    <Row className="p-3">
      <h2>Results</h2>
      <div>{inputRowText}</div>
      <div>{divider}</div>
      <div>
        {renderArrayOfStrings(output)}
      </div>
    </Row>
  );
}

function calc(prices, todaysPrice, monthlySpendingLimit, dividendYieldPercent, dividendYieldPeriodInMonths) {
  const purchases = prices.map(price => {
    const qty = Math.floor(monthlySpendingLimit / price);
    const spent = qty * price;
    return { qty, spent };
  });

  console.log(purchases);

  const purchasePoints = purchases.length;
  const totalQty = purchases.reduce((qty, obj) => qty + obj.qty, 0);
  const totalSpent = purchases.reduce((spent, obj) => spent + obj.spent, 0);

  const estDividendPerShare = dividendYieldPercent / 100 * todaysPrice;

  const dividendPayouts = [];
  const dividendNumberOfPayouts = Math.floor(prices.length / dividendYieldPeriodInMonths);
  for (let i = 1; i <= dividendNumberOfPayouts; ++i) {
    const qtyOverPeriod = purchases.slice(0, dividendYieldPeriodInMonths * i)
      .reduce((qty, obj) => qty + obj.qty, 0);

    dividendPayouts.push(qtyOverPeriod * estDividendPerShare);
  }

  console.log(dividendPayouts);
  console.log({ totalQty, totalSpent, purchasePoints });

  const todaysTotalPrice = Number((totalQty * todaysPrice).toFixed(2));
  console.log('buying totalQty today would cost', todaysTotalPrice);

  const dividendGains = Number(dividendPayouts.reduce((total, gains) => total + gains, 0).toFixed(2));
  console.log('gained from dividends since buying began', dividendGains);

  const appreciationPercent = ((todaysTotalPrice - totalSpent) / totalSpent * 100).toFixed(2) + '%';
  console.log('change in value', appreciationPercent);

  const dividendGainsPercent = (dividendGains / totalSpent).toFixed(2) + '%';
  console.log('dividend gain', dividendGainsPercent);

  return {
    input: { purchasePoints, todaysPrice, monthlySpendingLimit, dividendYieldPercent, dividendYieldPeriodInMonths },
    totalQty,
    totalSpent,
    // purchases,
    // dividendPayouts: dividendPayouts.map(p => p.toFixed(2)),
    appreciationPercent,
    dividendGainsPercent,
  };
}

function validateAndParseInput(prices, todaysPrice, monthlySpendingLimit, dividendYieldPercent, dividendYieldPeriodInMonths) {
  try {
    prices = prices
      .split('\n')
      .map(price => Number(price))
      .filter(price => price && price !== Infinity && price !== -Infinity)
  } catch (error) {
    alert('Failed to parse list of prices. ' + error);
    return;
  }

  if (dividendYieldPercent < 0) {
    alert('dividendYieldPercent should not be less than 0');
    return;
  }

  return [prices, todaysPrice, monthlySpendingLimit, dividendYieldPercent, dividendYieldPeriodInMonths];
}

export default DollarCostAveraginCalc;
