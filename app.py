"""Standalone web entry point for metadata.hminhtri.cloud.

Personal exports are never sent to this server; the browser performs analysis.
"""

from flask import Flask, render_template


app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
