package net.darthgeek.yggdrasil.mvc;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.security.access.AccessDeniedException;
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

  @ExceptionHandler(value = AccessDeniedException.class)
  public ModelAndView accessDeniedError(HttpServletRequest req, Exception e) throws Exception {
    return errorHandler("error/403", req, e, true);
  }

  @ExceptionHandler(value = Throwable.class)
  public ModelAndView defaultErrorHandler(HttpServletRequest req, Exception e) throws Exception {
    return errorHandler("error/default", req, e, false);
  }

  private ModelAndView errorHandler(String view, HttpServletRequest req, Exception e, boolean isUserError) throws Exception {
    final String errorId = UUID.randomUUID().toString();
    if (isUserError) {
      if (LOG.isDebugEnabled()) {
        LOG.debug(String.format("(user error) path: %s, errorId: %s: %s", req.getRequestURL(), errorId, e));
        if (LOG.isTraceEnabled()) {
          LOG.trace("Stack Trace:", e);
        }
      }
    } else {
      LOG.error(String.format("path: %s, errorId: %s: %s", req.getRequestURL(), errorId, e), e);
    }

    if (AnnotationUtils.findAnnotation(e.getClass(), ResponseStatus.class) != null)
      throw e;

    final ModelAndView mav = new ModelAndView(view);
    mav.addObject("exception", e);
    mav.addObject("request", req);
    mav.addObject("isUserError", isUserError);
    mav.addObject("errorId", errorId);
    return mav;
  }
}
