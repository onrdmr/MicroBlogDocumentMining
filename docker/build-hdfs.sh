#!/bin/sh

docker network create dock_net
docker container prune

docker rmi hadoop_base:1
docker build -t hadoop_base:1 .

docker rmi namenode:latest
docker build -t namenode:latest hdfs/namenode

docker rmi datanode:latest
docker build -t datanode:latest hdfs/datanode
