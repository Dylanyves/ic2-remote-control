from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import os
import signal
import subprocess
from run import process_req

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
    
    motorStatus = "OFF"
    modeStatus = "AUTO"
    powerStatus = "LOW"
    if request.method == 'POST':
        motorStatus = request.form.get('button_data')
        modeStatus = request.form.get('modeStatus')
        direction = request.form.get('direction')
        powerStatus = request.form.get('powerStatus')
        
        if motorStatus:
            process_req(motorStatus)
        if modeStatus:
            process_req(modeStatus)
        if powerStatus:
            process_req(powerStatus)
        if direction:
            process_req(direction)

        return jsonify({'motorStatus': motorStatus, 'modeStatus':modeStatus, 'powerStatus':powerStatus})
    return render_template('controller.html', motorStatus=motorStatus, modeStatus=modeStatus, powerStatus=powerStatus)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)