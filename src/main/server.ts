import { app } from './app'
import { processSaleWorker } from './queue/workers/lead-distribution';

const PORT = process.env.PORT ? process.env.PORT : 4000

app.listen(PORT, () => console.log(`API running on port: ${PORT}`))

processSaleWorker.on('completed', (job) => {
  console.log(`✅ Job ${job.id} completed.`);
});
processSaleWorker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err);
});
