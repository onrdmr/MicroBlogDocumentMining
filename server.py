from flask import Flask, jsonify, request
import os
from subprocess import Popen, PIPE
import socket

# Get the hostname
hostname = socket.gethostname()

# Get the IP address
ip_address = socket.gethostbyname(hostname)

print(ip_address)

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def home():
    if (request.method == 'GET'):
        data = 'hello world'
        return jsonify({'data': data})


@app.route('/home/<int:num>', methods=['GET'])
def disp(num):
    return jsonify({'data': num**2})


@app.route('/wordcount', methods=['GET'])
def wordcount():
    os.system("hadoop fs -rm -r /output")
    os.system("hadoop jar /home/wc.jar /Bitcoin_tweets_dataset_3.csv /output")
    os.system('hadoop fs -cat /output/part-r-00000 | sort -k2 -nr tmp | grep "#" | head -n 10 > res')

    file = open("res", "r")
    Lines = file.readlines()

    res = []
    for line in Lines:
        vals = line.strip().split("\t")
        res.append({"key": vals[0], "value": int(vals[1])})

    file.close()

    return jsonify({'data': res})

if __name__ == '__main__':
    app.run(host=ip_address, port=50030)
