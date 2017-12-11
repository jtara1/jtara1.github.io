from functools import reduce
from math import factorial
from flask import render_template, redirect, url_for, request
from app import app
from .forms import BernolliCalcForm


@app.route('/')
@app.route('/index')
def index():
    return redirect(url_for('bernolli'))


@app.route('/bernolli', methods=['GET', 'POST'])
def bernolli():
    form = BernolliCalcForm(request.form)
    if request.method == 'POST':
        info_str = bernolli_trials(form.trials.data, form.prob_success.data)
        return render_template('bernolli.html', form=form,
                               bernolli_output=info_str)
    return render_template('bernolli.html', form=form, bernolli_output="")


def bernolli_trials(trials, prob_of_success):
    def binomial_distribution(n, k):
        n = int(n)
        k = float(k)
        return factorial(n) / (factorial(k) * factorial(n - k))

    successes = 0
    prob = 1
    probabilities = []
    output = ['trials = {}, success = {}'.format(trials, prob_of_success),
              ''.join(['-'] * 50)]

    while prob >= 0.0001:
        prob_of_failure = 1 - prob_of_success
        prob = binomial_distribution(trials, successes) \
               * prob_of_success ** successes \
               * prob_of_failure ** (trials - successes)
        output.append("successes = {}, probability = {:.3}"
                      .format(successes, prob))
        successes += 1
        probabilities.append(prob)

    output.append(''.join(['-'] * 50))
    for i in range(1, len(probabilities) - 1):
        output.append("successes >= {}, probability = {:.3}"
                      .format(i, reduce(lambda x, y: x + y, probabilities[i:])))
    return output


@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404


@app.errorhandler(500)
def internal_error(error):
    return render_template('500.html'), 500
