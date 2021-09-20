# coding: utf-8
from setuptools import setup, find_packages


NAME = "ingestion"
VERSION = "0.0.1"
# To install the library, run the following
#
# python setup.py install
#
# prerequisite: setuptools
# http://pypi.python.org/pypi/setuptools

REQUIREMENTS = [
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
    'xlrd==2.0.1'
]



setup(
    name=NAME,
    version=VERSION,
    description="NeuroSCAN / PromoterDB ingestion library",
    author_email="zoran@metacell.us",
    url="",
    keywords=["neuroscan", "promoter"],
    install_requires=REQUIREMENTS,
    packages=find_packages(exclude=["*.tests", "*.tests.*", "tests.*", "tests"]),
    include_package_data=True,
    long_description="""\
    NeuroSCAN / PromoterDB ingestion library
    """
)
