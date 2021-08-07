# !/usr/bin/env python

import setuptools

setuptools.setup(
    name='ingestion',
    version='1.0',
    description='Declarative Parser',
    author='Afonso Pinto',
    author_email='afonso@metacell.us',
    url='',
    packages=setuptools.find_packages(),
    install_requires=[
        'beautifulsoup4==4.9.3',
        'certifi==2021.5.30',
        'chardet==4.0.0',
        'et-xmlfile==1.1.0',
        'idna==2.10',
        'numpy==1.20.3',
        'openpyxl==3.0.7',
        'pandas==1.2.4',
        'python-dateutil==2.8.1',
        'pytz==2021.1',
        'requests==2.25.1',
        'six==1.16.0',
        'soupsieve==2.2.1',
        'urllib3==1.26.5',
        'xlrd==2.0.1',
    ],
)
