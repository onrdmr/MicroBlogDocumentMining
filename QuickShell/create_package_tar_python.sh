 
python3 -m venv pyspark_venv
source pyspark_venv/bin/activate
pip3 install pyarrow pandas venv-pack numpy
venv-pack -o pyspark_venv.tar.gz
