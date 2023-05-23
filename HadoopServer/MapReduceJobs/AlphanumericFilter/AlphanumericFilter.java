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
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.HashSet;

public class AlphanumericFilter {
    public static class AlphanumericMapper extends Mapper<Object, Text, Text, Text> {
        private Text rowId = new Text();


        private final static Set<String> stopwords = new HashSet<>();
        
        // Define your stopwords here
        static {
            stopwords.add("the");
            stopwords.add("is");
            stopwords.add("are");
            stopwords.add("a");
            stopwords.add("an");
            stopwords.add("and");
            stopwords.add("but");
            stopwords.add("by");
            stopwords.add("in");
            stopwords.add("is");
            stopwords.add("it");
            stopwords.add("of");
            stopwords.add("on");
            stopwords.add("or");
            stopwords.add("that");
            stopwords.add("the");
            stopwords.add("this");
            stopwords.add("to");
            stopwords.add("was");
            stopwords.add("with");
            stopwords.add("A");
            stopwords.add("B");
            stopwords.add("me");
            stopwords.add("you");


            // Add more stopwords as needed
        }


        @Override
        protected void map(Object key, Text value, Context context) throws IOException, InterruptedException {
            String row = value.toString();
            String alphanumericRow = row.replaceAll("[^a-zA-Z\\s]", ""); // Keep only alphanumeric characters and spaces "[^a-zA-Z0-9\\s]"

            StringBuilder patternBuilder = new StringBuilder();
            for (String word : stopwords) {
                patternBuilder.append("\\b").append(Pattern.quote(word)).append("\\b|");
            }
            String patternString = patternBuilder.toString();
            patternString = patternString.substring(0, patternString.length() - 1); // Remove the trailing pipe character
            Pattern pattern = Pattern.compile(patternString, Pattern.CASE_INSENSITIVE);



            // Remove stopwords using regex
            Matcher matcher = pattern.matcher(alphanumericRow);
            String result = matcher.replaceAll("");


            rowId.set(result.trim());

            context.write(rowId, new Text(""));
        }
    }

    public static class AlphanumericReducer extends Reducer<Text, Text, Text, Text> {
        @Override
        protected void reduce(Text key, Iterable<Text> values, Context context)
                throws IOException, InterruptedException {
            context.write(key, new Text(""));
        }
    }

    public static void main(String[] args) throws Exception {
        Configuration conf = new Configuration();
        Job job = Job.getInstance(conf, "Alphanumeric Filter");

        job.setJarByClass(AlphanumericFilter.class);
        job.setMapperClass(AlphanumericMapper.class);
        job.setReducerClass(AlphanumericReducer.class);

        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(Text.class);

        FileInputFormat.addInputPath(job, new Path(args[0]));
        FileOutputFormat.setOutputPath(job, new Path(args[1]));

        System.exit(job.waitForCompletion(true) ? 0 : 1);
    }
}
