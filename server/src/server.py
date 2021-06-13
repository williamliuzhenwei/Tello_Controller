# Pyramid Imports
import json
from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.renderers import render_to_response
from pyramid.response import Response
from datetime import datetime
import time
# Import MySQL Connector Driver
import mysql.connector as mysql

# Load the DB credentials
import os
db_host = os.environ['MYSQL_HOST']
db_user = os.environ['MYSQL_USER']
db_pass = os.environ['MYSQL_PASSWORD']
db_name = os.environ['MYSQL_DATABASE']

# Valid commands from web UI controller
valid_commands = ['takeoff','land','up','down','left','right','back','forward','cw','ccw']


""" Helper Functions """

# A Function to Queue Commands to the MySQL Database
def send_command(command):
  # Insert code to insert commands to database here:
  db = mysql.connect(user=db_user,password=db_pass,host=db_host,database=db_name)
  cursor = db.cursor()

  now = datetime.now()
  current_time = now.strftime("%Y-%m-%d %H:%M:%S")
  query = "INSERT INTO Commands(message,created_at) VALUES (%s,%s)"
  values = (command,current_time) 
  cursor.execute(query,values)

  cursor.execute("SELECT * FROM Commands")
  response = cursor.fetchall()
  for i in response:
    print(i)
  
  db.commit()
  pass


""" Routes """

# TEST ROUTE TEST ROUTE TEST ROUTE TEST ROUTE TEST ROUTE
def test(req):
  send_command("test")
  return Response("Command sent to db (server): 'test'")

# VIEW: Web Controller Route
def web_ui_route(req):
  return render_to_response('templates/web_ui.html', [], request=req)

# REST: Drone Command Route
def drone_command_route(req):
  command = req.matchdict.get('command')
  arg = req.matchdict.get('arg')

  if command not in valid_commands:
    return {'Response (server):':'Invalid command received'}

  # Combine argument with command
  command = command if not arg else command + " " + arg[0]

  print('Sending command: ', command)
  send_command(command)
  return {'Response (server):':'Command sent!'}

def get_telemetry(req):
    db = mysql.connect(user=db_user,password=db_pass,host=db_host,database=db_name)
    cursor = db.cursor()
    cursor.execute("SELECT * FROM Telemetry ORDER BY id DESC LIMIT 1")
    data = cursor.fetchone()

    tele = []
    if data != None:
      for values in data:
        tele.append(values)
      tele.pop()
      tele.pop(0)
    db.commit()
    keys = ["pitch", "roll", "yaw", "vgx", "vgy", "vgz", "templ",
            "temph", "tof", "h", "bat", "baro", "time", "agx", "agy", "agz"]

    tel = dict(zip(keys, tele))

    # This Response sets a header so that CORS requests can be handled... should be behind OAUTH
    response = Response(body=json.dumps(tel))
    response.headers.update({'Access-Control-Allow-Origin': '*',})
    return response

def flight_plan(req):
    command = req.matchdict.get('command')
    arg = req.matchdict.get('arg')

    command = command.replace(",",' ')
    command = command.split()
    for comm in command:
      comm = comm.replace('_',' ')
      com = comm.split()
      print(comm)
      if com[0] not in valid_commands:
        return {'Response (server):':'Invalid command received'}
      print('Sending command: ', comm)
      send_command(comm)
      time.sleep(6)

""" Main Entrypoint """

if __name__ == '__main__':
  with Configurator() as config:
    config.include('pyramid_jinja2')
    config.add_jinja2_renderer('.html')

    # TEST ROUTE TEST ROUTE TEST ROUTE TEST ROUTE TEST ROUTE
    config.add_route('test', '/test')
    config.add_view(test, route_name='test')

    config.add_route('web_ui', '/')
    config.add_view(web_ui_route, route_name='web_ui')

    config.add_route('drone_command', '/drone_command/{command}*arg')
    config.add_view(drone_command_route, route_name='drone_command', renderer='json')

    #########################################################
    ############## State your NEW routes here: ##############
    #########################################################
    config.add_route('flight_plan', '/flight_plan/{command}')
    config.add_view(flight_plan, route_name='flight_plan', renderer='json')

    config.add_route('get_telemetry', '/get_telemetry')
    config.add_view(get_telemetry, route_name='get_telemetry', renderer='json')
    
    config.add_static_view(name='/', path='./public', cache_max_age=3600)

    app = config.make_wsgi_app()

  server = make_server('0.0.0.0', 1234, app)
  print('Web server started on: http://0.0.0.0:8000 OR http://localhost:8000')
  server.serve_forever()
