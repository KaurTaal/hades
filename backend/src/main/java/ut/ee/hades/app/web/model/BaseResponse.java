package ut.ee.hades.app.web.model;

import ut.ee.hades.app.enums.ControllerResultEnum;
import ut.ee.hades.app.enums.ExceptionCodeEnum;
import ut.ee.hades.app.enums.HttpMethodEnum;
import ut.ee.hades.app.enums.RestApiOperations;

public class BaseResponse {
    public Object object;
    public RestApiOperations operation;
    public HttpMethodEnum method;
    public ControllerResultEnum result;
    public ExceptionCodeEnum exceptionCode;

    public BaseResponse(Object object, RestApiOperations operation, HttpMethodEnum method, ControllerResultEnum result, ExceptionCodeEnum exceptionCode) {
        this.object = object;
        this.operation = operation;
        this.method = method;
        this.result = result;
        this.exceptionCode = exceptionCode;
    }

    public Object getObject() {
        return object;
    }

    public void setObject(Object object) {
        this.object = object;
    }

    public RestApiOperations getOperation() {
        return operation;
    }

    public void setOperation(RestApiOperations operation) {
        this.operation = operation;
    }

    public HttpMethodEnum getMethod() {
        return method;
    }

    public void setMethod(HttpMethodEnum method) {
        this.method = method;
    }

    public ControllerResultEnum getResult() {
        return result;
    }

    public void setResult(ControllerResultEnum result) {
        this.result = result;
    }

    public ExceptionCodeEnum getExceptionCode() {
        return exceptionCode;
    }

    public void setExceptionCode(ExceptionCodeEnum exceptionCode) {
        this.exceptionCode = exceptionCode;
    }
}
