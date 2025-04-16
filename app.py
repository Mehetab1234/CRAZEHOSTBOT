from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    # Passing show data (replace with real show data as needed)
    shows = [
        {"title": "Show 1", "image": "https://via.placeholder.com/200", "description": "Short description of Show 1."},
        {"title": "Show 2", "image": "https://via.placeholder.com/200", "description": "Short description of Show 2."},
        {"title": "Show 3", "image": "https://via.placeholder.com/200", "description": "Short description of Show 3."}
    ]
    return render_template('index.html', shows=shows)

if __name__ == '__main__':
    app.run(debug=True)
