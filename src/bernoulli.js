function factorial(n) {
    if (n < 0) {
        throw DOMException;
    }
    var value = 1;
    for (var i = 2; i <= n; i++) {
        value *= i;
    }
    return value;
}

function n_choose_r(n, r) {
    var r = Math.min(r, n-r);
    if (r == 0) {
        return 1;
    }
    var numerator = n;
    for (var i = n - 1; i > n - r; i--) {
        numerator *= i;
    }

    var denominator = 1;
    for (var i = 2; i < r + 1; i++) {
        denominator *= i;
    }
    return Math.trunc(numerator / denominator);
}

function bernoulli_trials(trials, prob_of_success, cutoff_probability) {
    var divider = "----------------------------------------";
    var prob = 1;
    var previous_probability = 1;
    var probabilities = [];
    var output = ["trials = " + trials + ", success = " + prob_of_success,
                  divider]
    var prob_of_failure = 1 - prob_of_success;

    var calc_probability = (successes) => (n_choose_r(trials, successes)
            * Math.pow(prob_of_success, successes)
            * Math.pow(prob_of_failure, trials - successes)).toPrecision(3);

    for (var successes = 0; successes <= trials; successes++) {
        prob = calc_probability(successes);
        if (cutoff_probability > prob) {
            if (prob < previous_probability) {
                break;
            } else if (prob > previous_probability) {
                continue;
            }
        }
        previous_probability = prob;
        output.push("successes = " + successes + ", probability = " + prob);

        probabilities.push([successes, prob]);
    }

    var add = (x, y) => (Number(x) + Number(y[1])).toPrecision(3);
    output.push(divider);
    for (var i = 1; i < probabilities.length - 1; i++) {
        output.push("successes >= " + probabilities[i][0] + ", probability = "
            + probabilities.slice(i).reduce(add, 0));
    }
    return output;
}

/**
 * Gets values from id="bernoulli_form" and computes probabilities using
 * bernoulli_trials then renders the output of the trials to the document
 * @returns {boolean}
 */
function bernoulli_calc() {
    // trials
    var trials = Number(document.getElementById("trials").value);

    // probability of a single success
    var success = Number(document.getElementById("success").value);
    var cutoff_probability = Number(document.getElementById("cutoff_probability").value);

    if (invalid_form_data(trials, success, cutoff_probability)) {
        return true;
    }
    var bernoulli_info = bernoulli_trials(trials, success, cutoff_probability);

    // div element reserved for bernolli output
    var div = document.getElementById("bernoulli_output");
    remove_children(div);  // rm previous rendered output

    var br = document.createElement("br");
    // render output from bernoulli_trials in HTML
    for (var i = 0; i < bernoulli_info.length; i++) {
        var p_element = document.createElement("p");
        p_element.textContent = bernoulli_info[i];
        div.appendChild(p_element);
        div.appendChild(br);
    }
    return false;
}

function remove_children(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function invalid_form_data(trials, success, cutoff) {
        if (trials < 0) {
        alert("trials must be >= 0");
        return true;
    } else if (!(1 > success > 0)) {
        alert("success must be in range [0, 1]");
        return true;
    } else if (!(1 > cutoff > 0)) {
        alert("success must be in range [0, 1]");
        return true;
    }
}
