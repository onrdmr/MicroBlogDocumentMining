#!/bin/sh

docker network create dock_net

docker rmi -f hadoop_base:1
docker build -t hadoop_base:1 .

docker rmi -f namenode:latest
docker build -t namenode:latest hdfs/namenode

docker rmi -f datanode:latest
docker build -t datanode:latest hdfs/datanode
