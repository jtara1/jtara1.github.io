from flask_wtf import FlaskForm
from wtforms import IntegerField, FloatField
from wtforms.validators import DataRequired


class BernolliCalcForm(FlaskForm):
    trials = IntegerField('Trials', validators=[DataRequired()])
    prob_success = FloatField('Probability of One Success', validators=[DataRequired()])
