import java.io.IOException;
import java.util.HashSet;
import java.util.Set;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

public class UsernameCount {

    public static class UsernameCountMapper extends Mapper<LongWritable, Text, Text, IntWritable> {
        private static final IntWritable ONE = new IntWritable(1);
        private static final Set<String> stopwords = new HashSet<>();

        // Define your stopwords here
        static {
            stopwords.add("the");
            stopwords.add("a");
            stopwords.add("an");
            // Add more stopwords as needed
        }

        public void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
            String line = value.toString();
            String[] usernames = line.split("\n");
            for (String username : usernames) {
                // Remove non-alphanumeric characters
                //username = username.replaceAll("[^a-zA-Z0-9]", "");

                // Check if the username is a stopword
                // if (!stopwords.contains(username.toLowerCase())) {
                    context.write(new Text(username), ONE);
                // }
            }
        }
    }

    public static class UsernameCountReducer extends Reducer<Text, IntWritable, Text, IntWritable> {
        public void reduce(Text key, Iterable<IntWritable> values, Context context)
                throws IOException, InterruptedException {
            int count = 0;
            for (IntWritable value : values) {
                count += value.get();
            }
            context.write(key, new IntWritable(count));
        }
    }

    public static void main(String[] args) throws Exception {
        Configuration conf = new Configuration();
        Job job = Job.getInstance(conf, "username count");
        job.setJarByClass(UsernameCount.class);
        job.setMapperClass(UsernameCountMapper.class);
        job.setReducerClass(UsernameCountReducer.class);
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(IntWritable.class);
        FileInputFormat.addInputPath(job, new Path(args[0]));
        FileOutputFormat.setOutputPath(job, new Path(args[1]));
        System.exit(job.waitForCompletion(true) ? 0 : 1);
    }
}
