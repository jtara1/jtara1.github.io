import { createRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';

const LootBoxCalc = () => {
  const [calcResult, setCalcResult] = useState(null);

  function onSubmit(event) {
    event.preventDefault();

    const validatedArgs = validateBernoulliTrialsInput(
      trialsRef.current.value,
      probabilityRef.current.value,
      cutoffProbabilityRef.current.value
    );

    if (validatedArgs) {
      setCalcResult(bernoulliTrials(...validatedArgs));
    }
  }

  const trialsRef = createRef();
  const probabilityRef = createRef();
  const cutoffProbabilityRef = createRef();

  return (
    <Container>
      <Row className="p-3" lg={2}>
        <form>
          <h2>Loot Box Calc</h2>
          <div>
            <label>Trials</label>
            <input ref={trialsRef} defaultValue={10} type="number" className="form-control" />
          </div>
          <div>
            <label>Probability of One Success</label>
            <input ref={probabilityRef} defaultValue={0.2} type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label>Cutoff Probability</label>
            <input ref={cutoffProbabilityRef} type="text" defaultValue={0.0001} className="form-control"
                   aria-describedby="cutoff_probability_help" />
            <small className="form-text text-muted">
              If the probability calculated for a certain
              successes is less than this, the successes & probability is skipped
            </small>
          </div>
          <input type="submit" className="btn btn-primary" onClick={onSubmit} />
        </form>
      </Row>
      <hr />
      <Row>
        <LootBoxCalcResult calcResult={calcResult} />
      </Row>
    </Container>
  );
};

const LootBoxCalcResult = (props) => {
  const { calcResult } = props;
  if (!calcResult) return null;

  const inputRowText = Object
    .entries(calcResult.input) // [['trials', 10], ...]
    .map(([key, value]) => `${key} = ${value}`) // ['trials = 10', ...]
    .join(', '); // 'trials = 10, ...'

  const scalarSuccesses = calcResult.probabilities
    .map(({ successes, probability }) => `successes = ${successes}, probability = ${probability}`);

  const cumulativeSuccesses = calcResult.cumulativeSuccessProbabilities
    .map(({ gte, probability }) => `successes >= ${gte}, probability = ${probability}`);

  const divider = Array(50).fill('-');
  const renderArrayOfStrings = array => array.map(textLine => <div>{textLine}</div>)

  return (
    <Row className="p-3">
      <h2>Results</h2>
      <div>{inputRowText}</div>
      <div>{divider}</div>
      {renderArrayOfStrings(scalarSuccesses)}
      <div>{divider}</div>
      {renderArrayOfStrings(cumulativeSuccesses)}
    </Row>
  );
}

function bernoulliTrials(trials, probabilityOfSuccess, cutoffProbability) {
  let probability = 1;
  let prevProbability = 1;
  const probabilities = [];
  const probOfFailure = 1 - probabilityOfSuccess;

  const calcProbability = (successes) => (nChooseR(trials, successes)
    * Math.pow(probabilityOfSuccess, successes)
    * Math.pow(probOfFailure, trials - successes)).toPrecision(3);

  for (let successes = 0; successes <= trials; successes++) {
    probability = calcProbability(successes);
    if (cutoffProbability > probability) {
      if (probability < prevProbability || probability === 0.0) {
        break;
      } else if (probability > prevProbability) {
        continue;
      }
    }
    prevProbability = probability;
    probabilities.push([successes, probability]);
  }

  const add = (x, y) => (Number(x) + Number(y[1])).toPrecision(3);
  const cumulativeSuccessProbabilities = [];

  for (let i = 1; i < probabilities.length - 1; i++) {
    cumulativeSuccessProbabilities.push({
      gte: probabilities[i][0],
      probability: probabilities.slice(i).reduce(add, 0),
    });
  }

  return {
    input: { trials, probabilityOfSuccess, cutoffProbability },
    probabilities: probabilities.map(([successes, probability]) => ({ successes, probability })),
    cumulativeSuccessProbabilities,
  };
}

/* statistical function, n C r */
function nChooseR(n, r) {
  r = Math.min(r, n-r);
  if (r === 0) {
    return 1;
  }
  let numerator = n;
  for (let i = n - 1; i > n - r; i--) {
    numerator *= i;
  }

  let denominator = 1;
  for (let i = 2; i < r + 1; i++) {
    denominator *= i;
  }
  return Math.trunc(numerator / denominator);
}

function validateBernoulliTrialsInput(trials, success, cutoff) {
  if (trials < 0) {
    alert('trials must be >= 0');
  } else if (!(success < 1 && success > 0)) {
    alert('success must be in range (0, 1)');
  } else if (!(cutoff < 1 && cutoff > 0)) {
    alert('cutoff must be in range (0, 1)');
  } else {
    return [trials, success, cutoff];
  }
}

export default LootBoxCalc;
