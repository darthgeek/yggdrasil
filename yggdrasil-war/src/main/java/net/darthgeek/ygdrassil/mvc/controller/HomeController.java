package net.darthgeek.ygdrassil.mvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by jason on 7/10/2016.
 */
@Controller("homeController")
public class HomeController {
  @RequestMapping(value = "/", method = RequestMethod.GET)
  public String home() {
    return "index";
  }

  @RequestMapping(value = "/phaser-tutorial", method = RequestMethod.GET)
  public String phaserDemo() {
    return "phaser-tutorial";
  }

  @RequestMapping(value = "/websocket-tutorial", method = RequestMethod.GET)
  public String websocketDemo() {
    return "websocket-tutorial";
  }
}
