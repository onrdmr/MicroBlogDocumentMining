import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

public class TextStopWordRemover {
    public static class TextStopWordMapper extends Mapper<Object, Text, Text, Text> {
        private Text rowId = new Text();
        private Set<String> TextStopWords = new HashSet<>(Arrays.asList("the", "and", "is")); // Add your stop words here

        @Override
        protected void map(Object key, Text value, Context context) throws IOException, InterruptedException {
            String row = value.toString();
            
            String[] words = row.split(" ");
            StringBuilder modifiedRow = new StringBuilder();
            for (String word : words) {
                if (!TextStopWords.contains(word.toLowerCase())) {
                    modifiedRow.append(word).append(" ");
                }
            }
            rowId.set(modifiedRow.toString().trim());
            context.write(rowId, new Text(""));
        }
    }

    public static class TextStopWordReducer extends Reducer<Text, Text, Text, Text> {
        @Override
        protected void reduce(Text key, Iterable<Text> values, Context context)
                throws IOException, InterruptedException {
            context.write(key, new Text(""));
        }
    }

    public static void main(String[] args) throws Exception {
        Configuration conf = new Configuration();
        Job job = Job.getInstance(conf, "Stop Word Remover");

        job.setJarByClass(TextStopWordRemover.class);
        job.setMapperClass(TextStopWordMapper.class);
        job.setReducerClass(TextStopWordReducer.class);

        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(Text.class);

        FileInputFormat.addInputPath(job, new Path(args[0]));
        FileOutputFormat.setOutputPath(job, new Path(args[1]));

        System.exit(job.waitForCompletion(true) ? 0 : 1);
    }
}
