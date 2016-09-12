package net.darthgeek.yggdrasil.mvc;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import nz.net.ultraq.thymeleaf.LayoutDialect;
import org.springframework.beans.factory.BeanInitializationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.*;
import org.springframework.core.Ordered;
import org.springframework.core.io.Resource;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.transaction.annotation.EnableTransactionManagement;
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
@EnableTransactionManagement
@EnableGlobalMethodSecurity(prePostEnabled = true, proxyTargetClass = true)
public class MvcConfig extends WebMvcConfigurerAdapter implements ApplicationContextAware {
  private static final TypeReference<Map<String, Object>> ASSETS_TYPE_REF = new TypeReference<Map<String, Object>>() {
  };
  private static final ObjectMapper JSON_MAPPER = new ObjectMapper();

  private ApplicationContext applicationContext;

  @Value("classpath:assets.json")
  private Resource assetsJsonFile;
  private Map<String, Object> assets;

  @Value("${spring.resource.cache:false}")
  private boolean resourceCache;

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
    registry.addResourceHandler("/assets/**").addResourceLocations("/WEB-INF/assets/", "classpath:/META-INF/resources/assets/")
          .setCachePeriod(2592000);
    registry.addResourceHandler("/hbs/**").addResourceLocations("/WEB-INF/assets/", "classpath:/META-INF/resources/hbs/")
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
    sets.add(new LayoutDialect());
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
    resolver.setCacheable(resourceCache);
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
  @Scope(value = BeanDefinition.SCOPE_PROTOTYPE, proxyMode = ScopedProxyMode.INTERFACES)
  public synchronized Map<String, Object> assets() {
    if (assets == null || !resourceCache) {
      try {
        assets = JSON_MAPPER.readValue(assetsJsonFile.getInputStream(), ASSETS_TYPE_REF);
      } catch (final IOException ioe) {
        throw new BeanInitializationException("Error loading " + assetsJsonFile, ioe);
      }
    }
    return assets;
  }

  @Override
  public void addViewControllers(ViewControllerRegistry registry) {
    registry.addViewController("/login").setViewName("login");

    registry.addViewController("/phaser-tutorial").setViewName("phaser-tutorial");
    registry.addViewController("/websocket-tutorial").setViewName("websocket-tutorial");

    registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
  }
}
