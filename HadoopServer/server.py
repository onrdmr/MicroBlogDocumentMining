from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

import os
from subprocess import Popen, PIPE
import socket

# Get the hostname
hostname = socket.gethostname()

# Get the IP address
ip_address = socket.gethostbyname(hostname)

print(ip_address)

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/', methods=['GET', 'POST'])
@cross_origin()
def home():
    if (request.method == 'GET'):
        data = 'hello world'
        return jsonify({'data': data})


@app.route('/home/<int:num>', methods=['GET'])
@cross_origin()
def disp(num):
    return jsonify({'data': num**2})


@app.route('/upload', methods=['POST'])
@cross_origin()
def upload_file():
    if 'file' not in request.files:
        return 'No file found', 400

    file = request.files['file']
    # Do whatever you want with the file, such as saving it to disk or processing it

    return 'File uploaded successfully'


data_path = "/data"  # /Bitcoin_tweets_dataset_3.csv
jobs_path = "MapReduceJobs"

@app.route('/hashtags/<int:num>', methods=['GET'])
@cross_origin()
def hashtags(num):
    os.system("hadoop fs -rm -r /output/hashtags")

    os.system("hadoop jar " + jobs_path +
              "/WordCount/WordCount.jar " + data_path + "/text.csv /output/hashtags")
    os.system('hadoop fs -cat /output/hashtags/part-r-00000 | grep "#" | sort -k2 -nr | head -n ' +
              str(num) + ' > hashtags')

    file = open("hashtags", "r")
    Lines = file.readlines()

    res = []
    for line in Lines:
        vals = line.strip().split("\t")
        res.append({"key": vals[0], "value": int(vals[1])})

    file.close()

    return jsonify({'data': res})


if __name__ == '__main__':
    app.run(host=ip_address, port=50030)
    # app.run(port=50030)
