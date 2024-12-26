import os
from flask import Flask, jsonify
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Fetch MongoDB URI from an environment variable
MONGO_URI = os.getenv("MONGODB_URI")
client = MongoClient(MONGO_URI)
db = client["mydatabase"]
collection = db["mycollection"]

@app.route('/get_path', methods=['GET'])
def get_path():
    """Fetch data for markers"""
    data = list(collection_flight_path.find({}, {'_id': 0}))  # Exclude '_id'
    return jsonify(data)

@app.route('/get_heatmap_data', methods=['GET'])
def get_heatmap_data():
    """Fetch data for the heatmap"""
    data = list(collection_heatmap_data.find({}, {'_id': 0}))  # Exclude '_id'
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
