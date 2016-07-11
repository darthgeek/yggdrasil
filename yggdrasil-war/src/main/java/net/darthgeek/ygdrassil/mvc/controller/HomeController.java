package net.darthgeek.ygdrassil.mvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by jason on 7/10/2016.
 */
@Controller("homeController")
@RequestMapping("/index.html")
public class HomeController {
  @RequestMapping(method = RequestMethod.GET)
  public String home() {
    return "index";
  }
}
