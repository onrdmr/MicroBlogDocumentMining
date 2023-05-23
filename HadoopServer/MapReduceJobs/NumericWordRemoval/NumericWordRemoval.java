import java.io.IOException;
import java.util.regex.Pattern;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;


public class NumericWordRemoval {

    public static class NumericWordMapper extends Mapper<Object, Text, Text, Text> {

        private static final Pattern NUMERIC_PATTERN = Pattern.compile("\\d+");
        private static final Text NOT_NUMERIC_FLAG = new Text("not_numeric");
        private static final Text NUMERIC_FLAG = new Text("numeric");

        public void map(Object key, Text value, Context context) throws IOException, InterruptedException {
            String line = value.toString();
            String[] words = line.split("\\s+");

            for (String word : words) {
                if (isMostlyNumeric(word)) {
                    context.write(new Text(word), NUMERIC_FLAG);
                } else {
                    context.write(new Text(word), NOT_NUMERIC_FLAG);
                }
            }
        }

        private boolean isMostlyNumeric(String word) {
            int numericCount = 0;
            int nonNumericCount = 0;

            for (char c : word.toCharArray()) {
                if (Character.isDigit(c)) {
                    numericCount++;
                } else {
                    nonNumericCount++;
                }
            }

            return numericCount > nonNumericCount;
        }
    }

    public static class NumericWordReducer extends Reducer<Text, Text, Text, Text> {

        private static final Text NOT_NUMERIC_FLAG = new Text("not_numeric");

        public void reduce(Text key, Iterable<Text> values, Context context)
                throws IOException, InterruptedException {

            boolean isMostlyNumeric = true;
            for (Text value : values) {
                if (value.equals(NOT_NUMERIC_FLAG)) {
                    isMostlyNumeric = false;
                    break;
                }
            }

            if (!isMostlyNumeric) {
                context.write(key, new Text(""));
            }
        }
    }

    public static void main(String[] args) throws Exception {
        Configuration conf = new Configuration();
        Job job = Job.getInstance(conf, "numeric word removal");
        job.setJarByClass(NumericWordRemoval.class);
        job.setMapperClass(NumericWordMapper.class);
        job.setReducerClass(NumericWordReducer.class);
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(Text.class);
        Path inputPath = new Path(args[0]);
        Path outputPath = new Path(args[1]);
        FileInputFormat.addInputPath(job, inputPath);
        FileOutputFormat.setOutputPath(job, outputPath);
        System.exit(job.waitForCompletion(true) ? 0 : 1);
    }
}
