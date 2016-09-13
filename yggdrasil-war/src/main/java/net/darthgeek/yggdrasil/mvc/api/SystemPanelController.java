package net.darthgeek.yggdrasil.mvc.api;

import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by jason on 9/12/16.
 */
@Controller("adminSystemPanel")
@RequestMapping("/api/systemPanel")
@PreAuthorize("isAuthenticated()")
public class SystemPanelController {
  @PreAuthorize("hasAuthority('PERM_ADMIN')")
  @RequestMapping(path = "/admin//{panelName}", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
  public ModelAndView adminPanel(@PathVariable final String panelName) {
    final ModelAndView mav = new ModelAndView("systemPanel/admin/" + panelName);
    return mav;
  }

  @RequestMapping(path = "/{panelName}", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
  public ModelAndView userPanel(@PathVariable final String panelName) {
    final ModelAndView mav = new ModelAndView("systemPanel/" + panelName);
    return mav;
  }
}
