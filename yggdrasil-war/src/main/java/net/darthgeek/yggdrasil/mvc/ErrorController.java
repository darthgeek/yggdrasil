package net.darthgeek.yggdrasil.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by jason on 7/23/2016.
 */
@Controller("errorController")
@RequestMapping("/error")
public class ErrorController {
  @RequestMapping(value = "/{error}", method = RequestMethod.GET)
  public ModelAndView errorPage(final @PathVariable String error, HttpServletRequest req) {
    final ModelAndView mav = new ModelAndView(String.format("error/%s", error));
    mav.addObject("request", req);
    mav.addObject("isUserError", false);
    return mav;
  }

  @RequestMapping(value = "/{error}", method = {RequestMethod.POST, RequestMethod.PUT})
  public String errorPageRedirect(final @PathVariable String error) {
    return String.format("redirect:/error/%s", error);
  }
}
