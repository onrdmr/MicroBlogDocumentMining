from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

import base64

import os
from subprocess import Popen, PIPE
import socket

# Get the hostname
hostname = socket.gethostname()

# Get the IP address
ip_address = socket.gethostbyname(hostname)

current_file = os.path.abspath(__file__)
current_directory = os.path.dirname(current_file)
print("current directory : " + current_directory)

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
    os.chdir(current_directory)

    return jsonify({'data': num**2})


chunkdata = ""


@app.route('/clearFlagOverwrite/<filename>/<int:blocksize>', methods=['POST'])
@cross_origin()
def clearOverwriteflag(filename, blocksize):
    global chunkdata

    os.chdir(current_directory)

    print(chunkdata[:10])

    file_path = './received/' + filename
    os.system("mkdir -p received")

    with open(file_path, 'w') as file:
        file.write(chunkdata)

    chunkdata = ""

    # command = "du -h ./../" + filename
    # output = subprocess.check_output(command, shell=True)

    # # Decode the output from bytes to string
    # output = output.decode('utf-8')

    # sizeType = output[-1]
    #  = int(float(output[:-1]))
    # if ( sizeType == 'K' ):

    # elif ( sizeType == 'M' ):

    # elif ( ord(sizeType) < 58  ):
    #     return

    # Veriyi hdfs e yaz
    os.system("hdfs dfs -rm /" + filename)
    os.system("hdfs dfs -D dfs.blocksize=" + str(blocksize) +
              " -put ./received/" + filename + " /")

    return jsonify({'data': 'Okkei'})


def append(file_path, new_text):
    with open(file_path, 'a') as file:
        file.write(new_text)


@app.route('/upload/<name>', methods=['POST'])
@cross_origin()
def upload_file(name):
    global chunkdata

    # if 'file' not in request.files:
    #     return 'No file found', 400

    # file = request.files['file']
    # # Do whatever you want with the file, such as saving it to disk or processing it

    os.chdir(current_directory)

    chunk = request.get_data(as_text=True)

    chunkdata = chunkdata + chunk
    # Process the received chunk
    # print('Received chunk:', chunk)

    # Decode the chunk from Base64 format
    # decoded_chunk = base64.b64decode(chunk)

    # Process the decoded chunk as needed
    # print('Decoded chunk:', decoded_chunk)

    # os.chdir('data')

    # if file:
    #     file.save('/home/ec2-user/onur')
    #     return 'File uploaded successfully'

    return 'File upload failed'


@app.route('/hashtags/<int:num>', methods=['GET'])
@cross_origin()
def hashtags(num):

    os.system("hadoop fs -rm -r /output")

    os.system(
        "hadoop jar MapReduceJobs/WordCount/WordCount.jar /text /output/hashtags")
    os.system('hadoop fs -cat /output/hashtags/part-r-00000 | grep "#" | sort -k2 -nr | head -n ' +
              str(num) + ' > hashtags')

    file = open("hashtags", "r")
    Lines = file.readlines()

    res = []
    for line in Lines:
        vals = line.strip().split("\t")
        res.append({"key": vals[0], "value": int(vals[1])})

    file.close()

    os.chdir(current_directory)

    return jsonify({'data': res})


@app.route('/cleanData', methods=['POST'])
@cross_origin()
def cleanData():
    os.chdir('./MapReduceJobs/AlphanumericFilter')
    os.system('../compile_run_mapreduce.sh AlphanumericFilter /data')

    os.chdir(current_directory)

    return True


@app.route('/username/<int:num>', methods=['GET'])
@cross_origin()
def usernameCount(num):
    os.chdir('./MapReduceJobs/UsernameCount')
    os.system("hdfs dfs -rm -r /UsernameCount")
    os.system("hdfs dfs -rm -r /SecondarySort")
    os.system("./../compile_run_mapreduce.sh UsernameCount /username")
    os.chdir('./../SecondarySort')
    os.system(
        './../compile_run_mapreduce.sh SecondarySort /UsernameCount/count/part-r-00000')
    os.system("hdfs dfs -cat /SecondarySort/count/part-r-00000 | tail -n " +
              str(num) + " > usernameCount")

    file = open("usernameCount", "r")
    Lines = file.readlines()

    res = []
    for line in Lines:
        vals = line.strip().split("\t")
        res.append({"key": vals[0], "value": int(vals[1])})

    file.close()

    os.chdir(current_directory)

    return jsonify({'data': res})


@app.route('/unicode/<int:num>', methods=['GET'])
@cross_origin()
def unicodeCount(num):
    os.chdir('./MapReduceJobs/UnicodeCount')
    os.system("hdfs dfs -rm -r /UnicodeCount")

    os.system("hdfs dfs -rm -r /SecondarySort")
    os.system("./../compile_run_mapreduce.sh UnicodeCount /username")
    os.chdir('./../SecondarySort')
    os.system(
        './../compile_run_mapreduce.sh SecondarySort /UnicodeCount/count/part-r-00000')
    os.system("hdfs dfs -cat /SecondarySort/count/part-r-00000 | tail -n " +
              str(num) + " > unicodeCount")

    file = open("unicodeCount", "r")
    Lines = file.readlines()

    res = []
    for line in Lines:
        vals = line.strip().split("\t")
        res.append({"key": vals[0], "value": int(vals[1])})

    file.close()

    os.chdir(current_directory)

    return jsonify({'data': res})


if __name__ == '__main__':
    app.run(host=ip_address, port=50030)
    # app.run(port=50030)
