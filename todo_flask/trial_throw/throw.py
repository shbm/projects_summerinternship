from flask import Flask, jsonify
from flaskext.mysql import MySQL

app = Flask(__name__)

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_DB'] = 'dbms_project'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'

mysql = MySQL()
mysql.init_app(app)
conn = mysql.connect()
cursor = conn.cursor()

cursor.execute('''INSERT INTO todos (text, status, edits) VALUES (%s, %s, %s)''', ("Shubham", "1", "0"))
conn.commit()

# @app.route('/')
# def temp():
# return jsonify(data=cursor.fetchall())

# if __name__ == '__main__':
# app.run(debug = True)
