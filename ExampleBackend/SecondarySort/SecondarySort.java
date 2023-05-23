import org.apache.hadoop.fs.Path;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.mapreduce.lib.partition.TotalOrderPartitioner;
import org.apache.hadoop.mapreduce.lib.partition.KeyFieldBasedComparator;

import java.io.IOException;

public class SecondarySort {
    // Mapper class
    public static class MyMapper extends Mapper<Object, Text, IntWritable, Text> {
        private final IntWritable count = new IntWritable();
        private final Text name = new Text();

        public void map(Object key, Text value, Context context) throws IOException, InterruptedException {
            // Split the input line by tab character
            String[] parts = value.toString().split("\\t");

            // Extract the name and count from the input
            String nameValue = parts[0].trim();
            int countValue = Integer.parseInt(parts[1].trim());

            // Set the count as the key and the name as the value
            count.set(countValue);
            name.set(nameValue);

            // Write the key-value pair to the context
            context.write(count, name);
        }
    }

    // Reducer class
    public static class MyReducer extends Reducer<IntWritable, Text, Text, IntWritable> {
        public void reduce(IntWritable key, Iterable<Text> values, Context context) throws IOException, InterruptedException {
            // Iterate over the values and write them in descending order
            for (Text value : values) {
                // Write the name as the key and the count as the value
                context.write(value, key);
            }
        }
    }

    public static void main(String[] args) throws Exception {
        Configuration conf = new Configuration();
        Job job = Job.getInstance(conf, "SecondarySort");

        job.setJarByClass(SecondarySort.class);
        job.setMapperClass(MyMapper.class);
        job.setReducerClass(MyReducer.class);
        job.setMapOutputKeyClass(IntWritable.class);
        job.setMapOutputValueClass(Text.class);
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(IntWritable.class);

        // Set the partitioner and comparator classes for secondary sorting
        job.setPartitionerClass(TotalOrderPartitioner.class);
        job.setSortComparatorClass(KeyFieldBasedComparator.class);

        // Set the key and value delimiter for sorting
        conf.set("mapreduce.map.output.key.field.separator", "\t");
        conf.set("mapreduce.partition.keycomparator.options", "-k1,1nr");

        // Set the number of reduce tasks to 1 for global sorting
        job.setNumReduceTasks(1);

        // Set the input and output paths
        FileInputFormat.addInputPath(job, new Path(args[0]));
        FileOutputFormat.setOutputPath(job, new Path(args[1]));

        // Execute the job and wait for completion
        System.exit(job.waitForCompletion(true) ? 0 : 1);
    }
}