from flask import Flask, jsonify, request

import socket

# Get the hostname
hostname = socket.gethostname()

# Get the IP address
ip_address = socket.gethostbyname(hostname)

print(ip_address)

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def home():
    if(request.method == 'GET'):

        data = 'hello world'
        return jsonify({'data': data})

@app.route('/home/<int:num>', methods=['GET'])
def disp(num):
    return jsonify({'data': num**2})


if __name__ == '__main__':


    app.run(host=ip_address, port=5000)