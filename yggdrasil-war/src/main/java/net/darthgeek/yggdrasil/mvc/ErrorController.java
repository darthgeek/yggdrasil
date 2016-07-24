package net.darthgeek.yggdrasil.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by jason on 7/23/2016.
 */
@Controller("errorController")
@RequestMapping("/error")
public class ErrorController {
  @RequestMapping(value = "/{error}", method = RequestMethod.GET)
  public String errorPage(final @PathVariable String error) {
    return String.format("error/%s", error);
  }

  @RequestMapping(value = "/{error}", method = {RequestMethod.POST, RequestMethod.PUT})
  public String errorPageRedirect(final @PathVariable String error) {
    return String.format("redirect:error/%s", error);
  }
}
