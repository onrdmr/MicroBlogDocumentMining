#!/bin/sh

docker network create dock_net
docker container prune

docker rmi hadoop_base:1
docker build --network=host -t hadoop_base:1 .

docker rmi namenode:latest
docker build --network=host -t namenode:latest -f hdfs/namenode/Dockerfile .

docker rmi datanode:latest
docker build --network=host -t datanode:latest -f hdfs/datanode/Dockerfile .
