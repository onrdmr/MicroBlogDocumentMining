import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.*;
import org.apache.hadoop.mapreduce.*;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.mapreduce.lib.input.TextInputFormat;
import org.apache.hadoop.mapreduce.lib.output.TextOutputFormat;

public class TFIDFCalculator {

    public static class TFIDFMapper extends Mapper<LongWritable, Text, Text, Text> {

        private final Text word = new Text();
        private final Text documentIdAndWordCount = new Text();

        public void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
            // Split the input line into document ID and text
            String[] parts = value.toString().split("\t");
            if (parts.length == 2) {
                String documentId = parts[0];
                String[] words = parts[1].split(" ");

                // Count the occurrences of each word in the document
                Map<String, Integer> wordCountMap = new HashMap<>();
                for (String w : words) {
                    wordCountMap.put(w, wordCountMap.getOrDefault(w, 0) + 1);
                }

                // Emit word count for each word in the document
                for (Map.Entry<String, Integer> entry : wordCountMap.entrySet()) {
                    String currentWord = entry.getKey();
                    int wordCount = entry.getValue();

                    word.set(currentWord);
                    documentIdAndWordCount.set(documentId + ":" + wordCount);

                    context.write(word, documentIdAndWordCount);
                }
            }
        }
    }

public static class TFIDFReducer extends Reducer<Text, Text, Text, DoubleWritable> {

    private final DoubleWritable tfidf = new DoubleWritable();

    public void reduce(Text key, Iterable<Text> values, Context context)
            throws IOException, InterruptedException {

        int documentFrequency = 0;
        Map<String, Integer> documentWordCountMap = new HashMap<>();

        // Iterate over the word counts for the given word in different documents
        for (Text value : values) {
            String[] parts = value.toString().split(":");
            if (parts.length == 2) {
                String documentId = parts[0];
                int wordCount = Integer.parseInt(parts[1]);

                documentWordCountMap.put(documentId, wordCount);
                documentFrequency++;
            }
        }

        // Calculate TF-IDF for each document
        int totalDocuments = context.getConfiguration().getInt("totalDocuments", 1);
        double idf = Math.log((double) totalDocuments / (double) documentFrequency);

        for (Map.Entry<String, Integer> entry : documentWordCountMap.entrySet()) {
            String documentId = entry.getKey();
            int wordCount = entry.getValue();

            double tf = (double) wordCount / (double) getTotalWordCount(documentWordCountMap);

            tfidf.set(tf * idf);

            context.write(new Text(documentId + ":" + key.toString()), tfidf);
        }
    }

    private int getTotalWordCount(Map<String, Integer> wordCountMap) {
        int totalWordCount = 0;
        for (int count : wordCountMap.values()) {
            totalWordCount += count;
        }
        return totalWordCount;
    }
}

}
public static void main(String[] args) throws Exception {
    Configuration conf = new Configuration();
    Job job = Job.getInstance(conf, "tfidf calculator");
    job.setJarByClass(TFIDFCalculator.class);
    job.setMapperClass(TFIDFMapper.class);
    job.setReducerClass(TFIDFReducer.class);
    job.setOutputKeyClass(Text.class);
    job.setOutputValueClass(Text.class);
    job.setInputFormatClass(TextInputFormat.class);
    job.setOutputFormatClass(TextOutputFormat.class);
    FileInputFormat.addInputPath(job, new Path(args[0]));
    FileOutputFormat.setOutputPath(job, new Path(args[1]));

    job.waitForCompletion(true);
}