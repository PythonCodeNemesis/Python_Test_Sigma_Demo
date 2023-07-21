from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Sample shopping cart data
cart_contents = {
    'apple': 5,
    'banana': 3,
    'orange': 2,
}
def calculate_total_price():
    prices = {
        'apple': 0.5,
        'banana': 0.3,
        'orange': 0.25,
    }
    total_price = sum(prices[item] * quantity for item, quantity in cart_contents.items())
    return round(total_price, 2)
@app.route('/view_cart', methods=['GET'])
def view_cart():
    total_price = calculate_total_price()
    return jsonify({
        'cart_contents': cart_contents,
        'total_price': total_price,
    })
@app.route('/add_to_cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    item = data['item']
    quantity = data['quantity']
    cart_contents[item] = cart_contents.get(item, 0) + quantity
    total_price = calculate_total_price()
    return jsonify({
        'cart_contents': cart_contents,
        'total_price': total_price,
    })
if __name__ == '__main__':
    app.run(debug=True)