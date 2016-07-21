package net.darthgeek.yggdrasil.web;

import net.darthgeek.yggdrasil.mvc.MvcConfig;
import net.darthgeek.yggdrasil.websocket.WebSocketConfig;
import net.darthgeek.yggdrasil.dao.DaoConfig;
import org.springframework.core.annotation.Order;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

/**
 * Created by jason on 7/10/2016.
 */
@Order(10)
public class WebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {
  @Override
  protected Class<?>[] getRootConfigClasses() {
    return new Class<?>[]{RootConfig.class, DaoConfig.class};
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
