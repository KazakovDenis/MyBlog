# -*- coding: utf-8 -*-
# https://github.com/KazakovDenis
import os


class Configuration(object):
    DEBUG = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://root:@localhost/test1'
    SECRET_KEY = 'AG8WMcd0nQ'
    UPLOAD_FOLDER = os.path.abspath('static/img/')
    ALLOWED_EXTENSIONS = ('txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024

    ### flask security
    SECURITY_PASSWORD_SALT = 'kF4jHNrBCpm'
    SECURITY_PASSWORD_HASH = 'sha512_crypt'
