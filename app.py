from flask import Flask, render_template, request, redirect, url_for, session

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
    
    data_from_button = 'OFF'
    if request.method == 'POST':
        data_from_button = request.form.get('button_data')
        print(data_from_button)
        return render_template('controller.html', data_from_button=data_from_button)

    return render_template('controller.html', data_from_button=data_from_button)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)