package net.darthgeek.ygdrassil.mvc;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.BeanInitializationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.*;
import org.springframework.core.env.Environment;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.*;
import org.thymeleaf.dialect.IDialect;
import org.thymeleaf.extras.springsecurity4.dialect.SpringSecurityDialect;
import org.thymeleaf.spring4.SpringTemplateEngine;
import org.thymeleaf.spring4.templateresolver.SpringResourceTemplateResolver;
import org.thymeleaf.spring4.view.ThymeleafViewResolver;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ITemplateResolver;

import java.io.IOException;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * Created by jason on 7/10/2016.
 */
@EnableWebMvc
@Configuration
@ComponentScan
@PropertySource("classpath:thymeleaf.properties")
public class MvcConfig extends WebMvcConfigurerAdapter implements ApplicationContextAware {
  private static final TypeReference<Map<String, Object>> ASSETS_TYPE_REF = new TypeReference<Map<String, Object>>() {
  };
  private static final ObjectMapper JSON_MAPPER = new ObjectMapper();

  private ApplicationContext applicationContext;

  @javax.annotation.Resource
  private Environment env;

  @Value("classpath:assets.json")
  private Resource assetsJsonFile;
  private Map<String, Object> assets;


  @Override
  public void setApplicationContext(ApplicationContext applicationContext) {
    this.applicationContext = applicationContext;
  }

  @Override
  public void addResourceHandlers(final ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/css/**").addResourceLocations("/WEB-INF/css/", "classpath:/META-INF/resources/css/")
          .setCachePeriod(2592000);
    registry.addResourceHandler("/images/**").addResourceLocations("/WEB-INF/images/", "classpath:/META-INF/resources/images/")
          .setCachePeriod(2592000);
    registry.addResourceHandler("/js/**").addResourceLocations("/WEB-INF/js/", "classpath:/META-INF/resources/js/")
          .setCachePeriod(2592000);
    registry.addResourceHandler("/fonts/**").addResourceLocations("/WEB-INF/fonts/", "classpath:/META-INF/resources/fonts/")
          .setCachePeriod(2592000);
  }

  @Override
  public void configureDefaultServletHandling(final DefaultServletHandlerConfigurer configurer) {
    configurer.enable();
  }

  @Bean
  public Set<IDialect> dialects() {
    final Set<IDialect> sets = new HashSet<>();
    sets.add(new SpringSecurityDialect());
    return sets;
  }

  @Bean
  public SpringTemplateEngine templateEngine() {
    final SpringTemplateEngine templateEngine = new SpringTemplateEngine();
    templateEngine.addTemplateResolver(templateResolver());
    templateEngine.setEnableSpringELCompiler(true);
    templateEngine.setAdditionalDialects(dialects());
    return templateEngine;
  }

  @Bean
  public ITemplateResolver templateResolver() {
    SpringResourceTemplateResolver resolver = new SpringResourceTemplateResolver();
    resolver.setApplicationContext(applicationContext);
    resolver.setPrefix("/WEB-INF/templates/");
    resolver.setSuffix(".html");
    resolver.setTemplateMode(TemplateMode.HTML);
    return resolver;
  }

  @Bean
  public ViewResolver viewResolver() {
    ThymeleafViewResolver viewResolver = new ThymeleafViewResolver();
    viewResolver.setTemplateEngine(templateEngine());
    viewResolver.setCharacterEncoding("UTF-8");
    return viewResolver;
  }

  @Bean
  public Map<String, Object> assets() {
    try {
      return JSON_MAPPER.readValue(assetsJsonFile.getInputStream(), ASSETS_TYPE_REF);
    } catch (final IOException ioe) {
      throw new BeanInitializationException("Error loading " + assetsJsonFile, ioe);
    }
  }
}
