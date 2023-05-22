javac -classpath `hadoop classpath` $1.java
jar -cf jar.jar $1*.class
hadoop jar jar.jar $1 $2 /$1/count
hdfs  dfs -head  /$1/count/part-r-00000