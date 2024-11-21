from flask import Flask, render_template, request, json, redirect
from weather import get_current_weather
from waitress import serve
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
@app.route('/index')
def index():
   return render_template('index.html')

@app.route('/weather')
def redirect_weather():
    return redirect('/api/weather')

@app.route('/api/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city')

    if not (city or "").strip():
        city = "Coimbatore"

    weather_data = get_current_weather(city)

    #City is not found by API
    if weather_data.get('cod') != 200:
        return {"error":weather_data.get('message','City not found')},404
    
    return {
        "city":weather_data["name"],
        "status":weather_data["weather"][0]["description"].capitalize(),
        "temperature":f"{weather_data['main']['temp']:.1f}",
        "feels_like":f"{weather_data['main']['feels_like']:.1f}"
    }

if __name__ == "__main__":
    serve(app, host="0.0.0.0",port=8000)