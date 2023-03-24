package ut.ee.hades.app.web.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import ut.ee.hades.app.enums.ControllerResultEnum;
import ut.ee.hades.app.enums.ExceptionCodeEnum;
import ut.ee.hades.app.enums.HttpMethodEnum;
import ut.ee.hades.app.enums.RestApiOperations;


@Data
@AllArgsConstructor
public class BaseResponse {
    public Object object;
    public RestApiOperations operation;
    public HttpMethodEnum method;
    public ControllerResultEnum result;
    public ExceptionCodeEnum exceptionCode;

}
