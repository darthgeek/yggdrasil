package net.darthgeek.ygdrassil.web;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;

/**
 * Created by jason on 7/10/2016.
 */
@Configuration
@ComponentScan
public class RootConfig {
  @Bean
  public ResourceBundleMessageSource messageSource() {
    final ResourceBundleMessageSource messages = new ResourceBundleMessageSource();
    messages.setBasenames("i18n/app");
    return messages;
  }
}
