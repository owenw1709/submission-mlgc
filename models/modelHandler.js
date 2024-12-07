const tf = require('@tensorflow/tfjs-node');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage();

async function loadModel() {
    const bucket = storage.bucket(process.env.MODEL_BUCKET_NAME);
    const modelPath = 'model/model.json'; // Path dalam bucket
    const modelUrl = `gs://${process.env.MODEL_BUCKET_NAME}/${modelPath}`;

    return await tf.loadGraphModel(modelUrl);
}

async function predict(imageBuffer, model) {
    const tensor = tf.node.decodeImage(imageBuffer, 3)
        .resizeBilinear([224, 224])
        .expandDims();
    const prediction = model.predict(tensor).arraySync()[0][0];
    const isCancer = prediction > 0.5;

    return {
        label: isCancer ? 'Cancer' : 'Non-cancer',
        suggestion: isCancer ? 'Segera periksa ke dokter!' : 'Penyakit kanker tidak terdeteksi.',
    };
}

module.exports = { loadModel, predict };
