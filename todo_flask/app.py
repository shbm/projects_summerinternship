from flask import Flask, jsonify, request, render_template, redirect, url_for
from flaskext.mysql import MySQL
import time
import pprint

app = Flask(__name__)

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_DB'] = 'dbms_project'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'

mysql = MySQL()
mysql.init_app(app)
conn = mysql.connect()
cursor = conn.cursor()


@app.route('/', methods=['GET', 'POST'], strict_slashes=False)
def index():
    if request.method == 'GET':
        cursor.execute(
            '''SELECT * FROM todos WHERE status = 1 ORDER BY timestamp DESC''')
        e = cursor.fetchall()
        return render_template('index.html', entries=e)

    if request.method == 'POST':
        data = request.form['newtodo']
        pprint.pprint(data)
        q = '''INSERT INTO todos (text, status) VALUES ('%s', 1)''' % (
            data)
        print q
        cursor.execute(q)
        # Fix the trigger
        conn.commit()
        return jsonify({'data': data})


@app.route('/edit/<int:todo_id>', strict_slashes=False)
def edit(todo_id):
    current_time = time.strftime('%Y-%m-%d %H:%M:%S')
    if request.method == 'GET':
        q = '''
        SELECT * FROM todos_edit_history h
        WHERE id = %s
        AND id = h.id
        AND revision_timestamp < now()
        ''' % (todo_id)
        cursor.execute(q)
        e = cursor.fetchall()
        pprint.pprint(e)
        if len(e) == 0:
            return redirect(url_for('index'))
        return render_template('index.html', entries=e)


@app.route('/archive', methods=['GET', 'POST'], strict_slashes=False)
def archive():
    if request.method == 'GET':
        q = '''SELECT * FROM todos WHERE status = 0 ORDER BY timestamp DESC'''
        cursor.execute(q)
        e = cursor.fetchall()
        return render_template('index.html', entries=e)
    if request.method == 'POST':
        todo_id = request.form['id']
        action = request.form['action']
        pprint.pprint(action)
        q = ''
        if action == '1':
            q = '''UPDATE todos SET status = '0' WHERE id = %s''' % (todo_id)
            pprint.pprint(q)
        elif action == '0':
            q = '''UPDATE todos SET status = '1' WHERE id = %s''' % (todo_id)
            pprint.pprint(q)
        cursor.execute(q)
        conn.commit()
        pprint.pprint('%s Action %s' % (todo_id, action))
        return jsonify({"id": todo_id, "action": action})


if __name__ == '__main__':
    app.run(debug=True)


