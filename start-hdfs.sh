#!/bin/sh

#namenode
docker start namenode

#datanode 1
docker start datanode1

#datanode 2
docker start datanode2

#datanode 3
docker start datanode3

#datanode for operating hadoop cluster(attached to current terminal)
# docker start datanode_for_use
# docker exec -it datanode_for_use /bin/bash

