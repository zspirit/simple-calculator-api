from flask import Flask, jsonify
from flask_restx import Resource, Api, reqparse
from apispec import APISpec
from marshmallow import Schema, fields
from apispec.ext.marshmallow import MarshmallowPlugin
from flask_apispec.extension import FlaskApiSpec
from flask_apispec.views import MethodResource
from flask_apispec import marshal_with, doc, use_kwargs
from flask_cors import CORS
app = Flask(__name__)  # Flask app instance initiated
CORS(app)
api = Api(app,
          version='1.0',
          title='Simple Calculator API',
          description='This is a simple demo calculator API ')  # Flask restful wraps Flask app around it.
ns = api.namespace('/',
                   description='Demo : Simple Calculator')
app.config.update({
    'APISPEC_SPEC': APISpec(
        title='Calculator Demo',
        version='v1',
        plugins=[MarshmallowPlugin()],
        openapi_version='2.0.0'
    ),
    'APISPEC_SWAGGER_URL': '/swagger/',  # URI to access API Doc JSON
    'APISPEC_SWAGGER_UI_URL': '/swagger-ui/'  # URI to access UI of API Doc
})
docs = FlaskApiSpec(app)

#  Restful way of creating APIs through Flask Restful
@ns.route('/<string:formula>')
class CalculatorAPI(MethodResource, Resource):
    @doc(description='Demo Calculator API.', tags=['GET', 'Calculator', 'API'])
    def get(self, formula,):
        try:
            if '÷' or '/' or '%2F' in formula:
                formula = formula.replace('÷', '/')
            return {'status': 'Success',
                    'code': 200,
                    'formula': formula,
                    'result': eval(formula)}
        except Exception as e:
            return jsonify({'status': 'Error',
                            'code': 400,
                            'formula': formula,
                            'message': str(e)})

if __name__ == '__main__':
    app.run(debug=True)

