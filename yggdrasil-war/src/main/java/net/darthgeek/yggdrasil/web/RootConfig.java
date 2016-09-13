package net.darthgeek.yggdrasil.web;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;

/**
 * Created by jason on 7/10/2016.
 */
@Configuration
@PropertySource("classpath:application.properties")
@ComponentScan
@EnableGlobalMethodSecurity(prePostEnabled = true, proxyTargetClass = true)
public class RootConfig {
  @Bean
  public ResourceBundleMessageSource messageSource() {
    final ResourceBundleMessageSource messages = new ResourceBundleMessageSource();
    messages.setBasenames("i18n/app");
    return messages;
  }
}
