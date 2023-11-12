from flask import Flask, render_template, request, redirect, url_for, session, jsonify
app = Flask(__name__)
app.secret_key = 'secret'

@app.route('/')
def index():
    return render_template('home.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        entered_username = request.form.get('ip')

        if entered_username == "user":
            session['logged_in'] = True
            return redirect(url_for('controller'))
        else:
            error_message = "Invalid IP address."
            return render_template('login.html', error_message=error_message)

    return render_template('login.html')

@app.route('/controller', methods=['GET', 'POST'])
def controller():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    
    data_from_button = "OFF"
    mode = "AUTO"
    if request.method == 'POST':
        data_from_button = request.form.get('button_data')
        mode = request.form.get('mode')
        direction = request.form.get('direction')
        
        if mode:
            print(mode)
        if data_from_button:
            print(data_from_button)
        if direction:
            print(direction)

        return jsonify({'data_from_button': data_from_button, 'mode':mode})
    return render_template('controller.html', data_from_button=data_from_button, mode=mode)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)