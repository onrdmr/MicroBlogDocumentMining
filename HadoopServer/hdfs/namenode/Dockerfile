FROM hadoop_base:1
# !! IMPORTANT
# make sure hadoop_base:1 is the name of the image you built.

# Create directories for namenode storage
# specify multiple files if you want to create multiple storage files for redundancy
RUN mkdir /opt/hdfs
RUN mkdir /opt/hdfs/namenode

RUN apt update
RUN apt install -y pip
RUN pip3 install Flask flask-cors

# ***ADD FILES***
RUN mkdir /home/data
ADD ./assets/*.csv /home/data

COPY ./MapReduceJobs /home/MapReduceJobs
ADD server.py /home

# necessary before running namenode
RUN hdfs namenode -format


CMD hdfs namenode