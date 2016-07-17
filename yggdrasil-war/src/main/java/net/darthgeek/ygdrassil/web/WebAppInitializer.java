package net.darthgeek.ygdrassil.web;

import net.darthgeek.ygdrassil.mvc.MvcConfig;
import net.darthgeek.ygdrassil.websocket.WebSocketConfig;
import org.springframework.core.annotation.Order;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

/**
 * Created by jason on 7/10/2016.
 */
@Order(10)
public class WebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {
  @Override
  protected Class<?>[] getRootConfigClasses() {
    return new Class<?>[]{RootConfig.class};
  }

  @Override
  protected Class<?>[] getServletConfigClasses() {
    return new Class<?>[]{MvcConfig.class, WebSocketConfig.class};
  }

  @Override
  protected String[] getServletMappings() {
    return new String[]{"/", "*.htm", "*.html", "/*"};
  }

  @Override
  protected String getServletName() {
    return "Yggdrasil Server";
  }

}
