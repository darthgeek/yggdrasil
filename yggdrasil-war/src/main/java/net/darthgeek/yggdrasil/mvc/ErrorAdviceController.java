package net.darthgeek.yggdrasil.mvc;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

/**
 * Created by jason on 7/22/2016.
 */
@ControllerAdvice
public class ErrorAdviceController {
  private static final Logger LOG = LoggerFactory.getLogger(ErrorAdviceController.class);

  @ExceptionHandler(value = Throwable.class)
  public ModelAndView defaultErrorHandler(HttpServletRequest req, Exception e) throws Exception {
    final String errorId = UUID.randomUUID().toString();
    LOG.error("[errorId=" + errorId + "] " + e, e);
    if (AnnotationUtils.findAnnotation(e.getClass(), ResponseStatus.class) != null)
      throw e;


    ModelAndView mav = new ModelAndView();
    mav.addObject("exception", e);
    mav.addObject("url", req.getRequestURL());
    mav.addObject("errorId", errorId);
    mav.setViewName("error/default");
    return mav;
  }
}
