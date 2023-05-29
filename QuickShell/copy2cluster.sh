flintrock copy-file bigdata-cluster yarn-site.xml ./hadoop/conf/
#flintrock copy-file bigdata-cluster capacity-scheduler.xml ./hadoop/conf/


flintrock copy-file bigdata-cluster enable-yarn.sh ./
flintrock run-command bigdata-cluster 'sh ~/enable-yarn.sh'
#flintrock run-command bigdata-cluster 'sudo sh ~/enable-yarn.sh'
