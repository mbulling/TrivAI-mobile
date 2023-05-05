import { Textract } from 'aws-sdk';

const analyzeText = async (key) => {
  const payload = {
    Document: {
      S3Object: {
        //the bucket where you uploaded your images
        Bucket: 'BUCKET_NAME',
        Name: key,
      },
    },
  };

  return new Textract().detectDocumentText(payload);
}

const textractScan = async (event) => {
  try {
    console.log(event);
    const body = JSON.parse(event.body);

    const { imageKey } = body;

    const analyzeTextResult = await analyzeText(imageKey);
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'ERROR_ANALYZING_DOCUMENT' }),
    };
  }
};