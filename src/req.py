from flask import Flask, request,jsonify #import main Flask class and request object
from flask_cors import CORS, cross_origin
import json

# from functools import wraps
# from flask import request, g, abort
# from jwt import decode, exceptions
# import json

# def login_required(f):
#    @wraps(f)
#    def wrap(*args, **kwargs):
#        authorization = request.headers.get("authorization", None)
#        if not authorization:
#            return json.dumps({'error': 'no authorization token provied'}), 403, {'Content-type': 'application/json'}
      
#        try:
#            token = authorization.split(' ')[1]
#            resp = decode(token, None, verify=False, algorithms=['HS256'])
#            g.user = resp['sub']
#        except exceptions.DecodeError as identifier:
#            return json.dumps({'error': 'invalid authorization token'}), 403, {'Content-type': 'application/json'}
      
#        return f(*args, **kwargs)
 
#    return wrap


app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route('/login-check',methods=["GET","POST"])
@cross_origin(supports_credentials=True)
def login_check():
	request_payload=dict(request.form)
	request_payload=json.loads(list(request_payload.keys())[0])
	print(request_payload)
	if len(request_payload.keys())==2 and "username" in request_payload.keys() and "password" in request_payload.keys():
		return {"isLoggedIn":True}
	else:
		return {"annen":"Abi ne gerek var böyle işleri yapmaya yapma işte, boşuna chunk muhabbeti yaptırma bana sie"}


@app.route('/submit-summoner-form',methods=["GET","POST"])
@cross_origin(supports_credentials=True)
# @login_required
def submit_summoner_form():
	request_payload=dict(request.form)
	request_payload=json.loads(list(request_payload.keys())[0])
	request_payload["isRespRecvd"]=True
	print(request_payload)
	return request_payload


if __name__ == '__main__':
    app.run(debug=True, port=5000) #run app in debug mode on port 5000