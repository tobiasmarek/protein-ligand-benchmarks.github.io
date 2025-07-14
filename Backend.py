from flask import Flask, jsonify, redirect, url_for, request
from flask_cors import CORS
import pandas as pd
import pickle as pickle 
from method_results import MethodAcuracy

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/backend', methods=["GET"])
def backend():
    data = MethodAcuracy.giveData()  
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=9001)