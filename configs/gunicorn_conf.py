import multiprocessing
from os.path import join
from sys import platform

from blog.config import PATH


bind = '0.0.0.0:8000'
workers = multiprocessing.cpu_count() * 2 + 1
timeout = 600

if platform == 'linux':
    pythonpath = '/usr/bin/python3'
accesslog = join(PATH, 'log', 'gunicorn', 'access.log')
errorlog = join(PATH, 'log', 'gunicorn', 'error.log')
