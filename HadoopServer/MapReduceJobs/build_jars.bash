#!/bin/bash

scriptdir=$(dirname $0)
pushd $scriptdir

jobs=("WordCount" "UsernameCount")

for job in ${jobs[@]}; 
do
    pushd $job

    javac -classpath `hadoop classpath` $job.java
    jar -cfe $job.jar $job $job*.class

    popd
done
