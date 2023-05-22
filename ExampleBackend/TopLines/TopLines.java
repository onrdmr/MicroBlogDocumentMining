import java.io.IOException;
import java.util.Map;
import java.util.TreeMap;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

public class TopLines {

    public static class TopLinesMapper extends Mapper<Object, Text, Text, Text> {

        private TreeMap<Integer, String> TopLinesMap;

        @Override
        protected void setup(Context context) throws IOException, InterruptedException {
            TopLinesMap = new TreeMap<>();
        }

        @Override
        public void map(Object key, Text value, Context context) throws IOException, InterruptedException {
            String[] parts = value.toString().split("\t");
            if (parts.length == 2) {
                String entity = parts[0];
                int number = Integer.parseInt(parts[1]);

                // Add the entity to the TreeMap with the value as the key
                TopLinesMap.put(number, entity);

                // Keep only the top 10 entities in the TreeMap
                if (TopLinesMap.size() > 10) {
                    TopLinesMap.remove(TopLinesMap.firstKey());
                }
            }
        }

        @Override
        protected void cleanup(Context context) throws IOException, InterruptedException {
            // Emit the top 10 entities from the TreeMap
            for (Map.Entry<Integer, String> entry : TopLinesMap.entrySet()) {
                context.write(new Text(entry.getValue()), new Text(String.valueOf(entry.getKey())));
            }
        }
    }

    public static class TopLinesReducer extends Reducer<Text, Text, Text, Text> {

        @Override
        public void reduce(Text key, Iterable<Text> values, Context context) throws IOException, InterruptedException {
            // Emit the key-value pair as it is
            for (Text value : values) {
                context.write(key, value);
            }
        }
    }

    public static void main(String[] args) throws Exception {
        Configuration conf = new Configuration();
        Job job = Job.getInstance(conf, "top entities");
        job.setJarByClass(TopLines.class);
        job.setMapperClass(TopLinesMapper.class);
        job.setReducerClass(TopLinesReducer.class);
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(Text.class);
        FileInputFormat.addInputPath(job, new Path(args[0]));
        FileOutputFormat.setOutputPath(job, new Path(args[1]));
        System.exit(job.waitForCompletion(true) ? 0 : 1);
    }
}
