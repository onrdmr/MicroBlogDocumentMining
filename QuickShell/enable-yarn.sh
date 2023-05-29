#!/bin/sh

export HADOOP_PREFIX=/home/ec2-user/hadoop
export SPARK_PREFIX=/home/ec2-user/spark


sed -i '13,$d' ~/.bashrc

echo "export PYSPARK_DRIVER_PYTHON=python3" >> ~/.bashrc


echo "export PYTHONPATH=/usr/bin/python3:/home/ec2-user/.local/lib/python3.7/site-packages:$PYTHONPATH" >> ~/.bashrc
echo "export SPARK_HOME=$SPARK_PREFIX" >> ~/.bashrc
echo "export PYSPARK_PYTHON=/usr/bin/python3:/home/ec2-user/.local/lib/python3.7/site-packages:$PYSPARK_PYTHON" >> ~/.bashrc
#echo "export SPARK=$SPARK_PREFIX" >> ~/.bashrc
echo "export HADOOP_PREFIX=$HADOOP_PREFIX" >> ~/.bashrc
echo "export HADOOP_HOME=$HADOOP_PREFIX" >> ~/.bashrc
echo "export HADOOP_COMMON_HOME=$HADOOP_PREFIX" >> ~/.bashrc
echo  "export HADOOP_CONF_DIR=$HADOOP_PREFIX/conf" >> ~/.bashrc
echo "export HADOOP_HDFS_HOME=$HADOOP_PREFIX" >> ~/.bashrc
echo "export HADOOP_MAPRED_HOME=$HADOOP_PREFIX" >> ~/.bashrc
echo "export HADOOP_YARN_HOME=$HADOOP_PREFIX" >> ~/.bashrc
#echo "source /root/.bashrc" >> ~/.bashrc


: `  
sudo sh -c 'echo "export SPARK_HOME=$SPARK_PREFIX" >> /etc/environment'
sudo sh -c 'echo "export PYSPARK_PYTHON=python3" >> /etc/environment'
sudo sh -c 'echo "export HADOOP_PREFIX=$HADOOP_PREFIX" >> /etc/environment'
sudo sh -c 'echo "export HADOOP_HOME=$HADOOP_PREFIX" >> /etc/environment'
sudo sh -c 'echo "export HADOOP_COMMON_HOME=$HADOOP_PREFIX" >> /etc/environment'
sudo sh -c 'echo  "export HADOOP_CONF_DIR=$HADOOP_PREFIX/conf" >> /etc/environment'
sudo sh -c 'echo "export HADOOP_HDFS_HOME=$HADOOP_PREFIX" >> /etc/environment'
sudo sh -c 'echo "export HADOOP_MAPRED_HOME=$HADOOP_PREFIX" >> /etc/environment'
sudo sh -c 'echo "export HADOOP_YARN_HOME=$HADOOP_PREFIX" >> /etc/environment'
sudo sh -c 'echo "source /root/.bashrc" >> /etc/environment'
`


cp $HADOOP_PREFIX/etc/hadoop/capacity-scheduler.xml $HADOOP_PREFIX/conf/
cp $HADOOP_PREFIX/etc/hadoop/log4j.properties $HADOOP_PREFIX/conf/

#sudo su -c 'cp /home/ec2-user/.bashrc /root/.bashrc'

