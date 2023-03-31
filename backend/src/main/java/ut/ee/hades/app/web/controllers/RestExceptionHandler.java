package ut.ee.hades.app.web.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import ut.ee.hades.app.exceptions.ui.UiAlertException;
import ut.ee.hades.app.web.model.UiAlert;

@Slf4j
@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    @ExceptionHandler(UiAlertException.class)
    public UiAlert uiAlertHandler(UiAlertException uiAlertException) {
        log.info("Intercepted ui alert exception", uiAlertException);
        return uiAlertException.getAlert();
    }
}
