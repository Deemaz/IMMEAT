from flask import Flask, request, jsonify, send_from_directory, render_template_string
import httpx
import logging
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Настройка логирования
logging.basicConfig(level=logging.INFO)

# Данные телеграмм бота и чата
TELEGRAM_BOT_TOKEN = '6563724015:AAFpNm9n2cIQ_zAkOJ3OMAHVASNoBj50kvI'
TELEGRAM_CHAT_ID = '6563724015'

@app.route('/')
def index():
    with open("index.html") as file:
        content = file.read()
    return render_template_string(content)

@app.route('/order', methods=['POST'])
def order():
    try:
        data = request.json
        app.logger.info(f"Полученные данные заказа: {data}")

        message = f"Новый заказ:\n"
        for item in data['cart']:
            message += f"{item['quantity']} x {item['product']} ({item['sauce']}) - {item['price']} р\n"
        message += f"Общая стоимость: {data['total_price']} р"

        app.logger.info(f"Отправка сообщения: {message}")
        send_telegram_message(message)

        return jsonify({'status': 'success'})
    except Exception as e:
        app.logger.error(f"Ошибка при обработке заказа: {e}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

def send_telegram_message(message):
    url = f'https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage'
    payload = {
        'chat_id': TELEGRAM_CHAT_ID,
        'text': message
    }
    response = httpx.post(url, json=payload)
    response.raise_for_status()

@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory('.', filename)

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)