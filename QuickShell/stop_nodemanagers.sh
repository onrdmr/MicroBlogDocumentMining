#flintrock run-command bigdata-cluster '$HADOOP_PREFIX/sbin/start-yarn.sh '
flintrock run-command bigdata-cluster 'yarn --daemon stop nodemanager'
#
