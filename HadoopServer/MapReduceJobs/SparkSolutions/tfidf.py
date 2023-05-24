import sys
from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession

from pyspark.mllib.feature import HashingTF
from pyspark.mllib.feature import IDF

# Function for printing each element in RDD
def println(x):
    print (x)

# Boilerplate Spark stuff:
# conf = SparkConf().setMaster("local[*]").setAppName("SparkTFIDF")
# sc = SparkContext(conf = conf)

spark = SparkSession.builder \
    .appName("Read from HDFS") \
    .getOrCreate()

# Load documents (one per line).
# rawData = sc.textFile("dataset.tsv")

# Set the HDFS path
hdfs_path = "hdfs://ip-172-31-88-217.ec2.internal:9000/AlphanumericFilter/count/part-r-00000"

# Read the data from HDFS
rawData = spark.read.format("txt").load(hdfs_path)

rawData.show()

# Remember to stop the SparkSession
spark.stop()

"""

kecilRawData = rawData.map(lambda x: x.lower())
documents = kecilRawData.map(lambda x: x.split(" "))

documentId = fields.map(lambda x: x[0])

# Creating Hash table and TF table
hashingTF = HashingTF(10000000)
tf = hashingTF.transform(documents)

# Creating idf
tf.cache()
idf = IDF(minDocFreq=1).fit(tf)

# Calculate TF/IDF
tfidf = idf.transform(tf)

# Keyword yang akan dicari diubah ke Hash value <- Hash table di atas
# menyimpan Argument
kunci = str(sys.argv[1])
print ("Anda mencari kata kunci " + kunci)
#raw_input("Masukan kata kunci : ")
#Make kunci to be lowercase
keywordTF = hashingTF.transform([kunci.lower()])
keywordHashValue = int(keywordTF.indices[0])

# Temukan relevansinya dengan tabel tf-idf yang sudah dibuat
keywordRelevance = tfidf.map(lambda x: x[keywordHashValue])

zippedResults = keywordRelevance.zip(documentId)

print ("Best document for keywords is:")
print (zippedResults.max())"""