from flask import Flask
from flask_flatpages import FlatPages
from flask_frozen import Freezer


app = Flask(__name__)
app.secret_key = 'secret'
app.config.from_pyfile('settings.py')
pages = FlatPages(app)
freezer = Freezer(app)

if not app.debug:
    import logging
    from logging.handlers import RotatingFileHandler
    file_handler = RotatingFileHandler('tmp/simplewebsite.log', 'a', 1 * 1024 * 1024, 10)
    file_handler.setFormatter(logging.Formatter('%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
    app.logger.setLevel(logging.INFO)
    file_handler.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)
    app.logger.info('jtara1.github.io')


from app import views, models
