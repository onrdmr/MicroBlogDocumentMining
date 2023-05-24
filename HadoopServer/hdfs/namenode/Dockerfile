FROM hadoop_base:1
# !! IMPORTANT
# make sure hadoop_base:1 is the name of the image you built.

# Create directories for namenode storage
# specify multiple files if you want to create multiple storage files for redundancy
RUN mkdir /opt/hdfs
RUN mkdir /opt/hdfs/namenode

ADD ./assets/get-pip.py /home

RUN python3 /home/get-pip.py
RUN pip3 install Flask flask-cors

# CONFIG
ADD ./config-files/hdfs-site.xml $HADOOP_HOME/etc/hadoop/

# ***ADD FILES***
RUN mkdir /home/data
ADD ./assets/*.csv /home/data

COPY ./MapReduceJobs /home/MapReduceJobs
ADD server.py /home

# necessary before running namenode
RUN hdfs namenode -format


CMD hdfs namenode