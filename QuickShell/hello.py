# -*- coding: utf-8 -*-
from pyspark.sql import SparkSession
spark = SparkSession.builder.appName('abc').getOrCreate()

print('Hello, World!')
