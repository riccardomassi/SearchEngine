from flask import Flask, jsonify, request
from flask_cors import CORS
from QUERY.query import querySearch
import os


app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "https://thespoon.vercel.app"])


@app.route('/api/search', methods=['GET', 'POST'])
def callOnQuerySearch():
    if request.method == 'POST':
        try:
            # Parse JSON data from the request body
            request_data = request.get_json()

            # Your logic here using the received data
            results, new_phrase = querySearch(
                request_data['searchValue'],
                float(request_data['rating']),
                request_data['sorting'],
                request_data['checked'],
                request_data['sentiment'],
                True,
                False,
                30)
            return jsonify({"results": results, "new_phrase": new_phrase})
        except Exception as e:
            print("Error parsing JSON data:", str(e))
            return jsonify({"status": "error", "message": "Error parsing JSON data"})
    else:
        return jsonify({"status": "error", "message": "Only POST requests are supported"})
    


if __name__=="__main__":
    if not os.path.exists("./GENERATED_INDEX"):
        print("No index generated, please run make index.")
        quit()
    app.run(port=5050)
        