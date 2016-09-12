package net.darthgeek.yggdrasil.mvc;

import net.darthgeek.yggdrasil.data.model.User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import java.util.stream.Collectors;

/**
 * Created by jason on 9/12/16.
 */
@Controller("gameWindowController")
@RequestMapping("/")
public class GameWindowController {
  @Transactional
  @RequestMapping(method = RequestMethod.GET)
  public ModelAndView gameWindow() {
    final ModelAndView mav = new ModelAndView("game-window");

    final User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    mav.addObject("permissions", user.getPermissions().stream()
          .map(elt -> elt.getAuthority())
          .collect(Collectors.toList()));

    return mav;
  }
}
