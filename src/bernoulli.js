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

function binomial_distribution(n, r) {
    return factorial(n) / (factorial(r) * factorial(n - r))
}

function bernoulli_trials(trials, prob_of_success) {
    var divider = "----------------------------------------";
    var successes = 0;
    var prob = 1;
    var probabilities = [];
    var output = ["trials = " + trials + ", success = " + prob_of_success,
                  divider]
    var prob_of_failure = 1 - prob_of_success;

    while ((prob >= 0.0001 || successes <= 2) && trials >= successes) {
        prob = binomial_distribution(trials, successes)
            * Math.pow(prob_of_success, successes)
            * Math.pow(prob_of_failure, trials - successes);
        prob = prob.toPrecision(3);
        output.push("successes = " + successes + ", probability = " + prob);

        successes++;
        probabilities.push(prob);
    }

    output.push(divider);
    for (var i = 1; i < probabilities.length; i++) {
        output.push("successes >= " + i + ", probability = " + probabilities[i]);
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
    var t = Number(document.forms.namedItem("bernoulli_form")
                   .children.namedItem("trials").value);
    // probability of a single success
    var s = Number(document.forms.namedItem("bernoulli_form")
                   .children.namedItem("success").value);
    var bernoulli_info = bernoulli_trials(t, s);
    // div element reserved for bernolli output
    var div = document.getElementById("bernoulli_output");
    remove_children(div);  // rm previous rendered output

    var br = document.createElement("br");
    // render output from bernoulli_trials in HTML
    for (var i = 0; i < bernoulli_info.length; i++) {
        var ele = document.createElement("p");
        ele.textContent = bernoulli_info[i];
        div.appendChild(ele);
        div.appendChild(br);
    }
    return false;
}

function remove_children(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}
