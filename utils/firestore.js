const { Firestore } = require('@google-cloud/firestore');

const firestore = new Firestore();

async function savePredictionToFirestore(data) {
    const collection = firestore.collection('predictions');
    await collection.doc(data.id).set(data);
}

module.exports = { savePredictionToFirestore };
