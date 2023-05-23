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




wc_jar_path = "/home/ec2-user" #/home
text_csv_path = "/text.csv"#/Bitcoin_tweets_dataset_3.csv
@app.route('/wordcount/<int:num>', methods=['GET'])
@cross_origin()
def wordcount(num):
    os.system("hadoop fs -rm -r /output")
    os.system("rm tmp res")
    
    print("APPLIED : hadoop fs -rm -r /output")
    os.system("hadoop jar " + str(wc_jar_path) + "/wc.jar " + str(text_csv_path) + " /output")
    print("APPLIED :" + "hadoop jar " + str(wc_jar_path) + "/wc.jar " + str(text_csv_path) + " /output")
    os.system('hadoop fs -cat /output/part-r-00000 > tmp')
    print("APPLIED : hadoop fs -cat /output/part-r-00000 > tmp")
    os.system('sort -k2 -nr tmp | grep "#" | head -n ' + str(num) + ' > res')
    print('APPLIED : sort -k2 -nr tmp | grep "#" | head -n ' + str(num) +' > res')


    file = open("res", "r")
    Lines = file.readlines()

    res = []
    for line in Lines:
        vals = line.strip().split("\t")
        res.append({"key": vals[0], "value": int(vals[1])})

    file.close()

    return jsonify({'data': res})

if __name__ == '__main__':
    #app.run(host=ip_address, port=50030)
    app.run(port=50030)