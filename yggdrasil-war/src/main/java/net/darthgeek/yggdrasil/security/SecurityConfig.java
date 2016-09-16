package net.darthgeek.yggdrasil.security;

import net.darthgeek.yggdrasil.data.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.access.AccessDeniedHandlerImpl;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.security.web.csrf.CsrfException;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by jason on 7/21/2016.
 */
@Configuration
@ComponentScan
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, proxyTargetClass = true)
public class SecurityConfig {
  @Configuration
  public static class AppSecurityConfig extends WebSecurityConfigurerAdapter {
    @Resource
    private UserDetailsService userDetailsService;

    @Override
    public void configure(final WebSecurity web) throws Exception {
      web.ignoring().antMatchers("/css/**", "/js/**", "/images/**", "/fonts/**", "/hbs/**");
    }

    @Override
    @Bean(name = "authenticationManager")
    public AuthenticationManager authenticationManagerBean() throws Exception {
      return super.authenticationManagerBean();
    }

    @Override
    protected void configure(final HttpSecurity http) throws Exception {
      // @formatter:off
      http.authorizeRequests()
            .antMatchers("/error/**").permitAll()
            .antMatchers("/login/google").permitAll()
            .anyRequest().authenticated().and()
          .formLogin()
            .loginPage("/login").permitAll()
            .defaultSuccessUrl("/")
            .successHandler(loginHandler())
            .and()
          .logout().permitAll()
            .invalidateHttpSession(true).and()
          .rememberMe()
            .rememberMeParameter("remember-me").tokenRepository(persistentTokenRepository())
            .userDetailsService(userDetailsService).tokenValiditySeconds(86400).and()
          .exceptionHandling()
            .accessDeniedHandler(accessDeniedHandler()).and()
          .csrf();
      // @formatter:on
    }

    @Bean
    public AccessDeniedHandler accessDeniedHandler() {
      return new MyAccessDeniedHandler("/error/403");
    }

    @Bean
    public PersistentTokenRepository persistentTokenRepository() {
      return null;
    }

    @Bean
    public AuthenticationSuccessHandler loginHandler() {
      return (request, response, authentication) -> {
        final User user = (User) authentication.getPrincipal();
        // TODO: track time of last login for user here
        request.getSession().setAttribute("user", user);
        response.sendRedirect("/");
      };
    }

    /**
     * Specialization of the default access denied handler that handles
     * CSRF exceptions on the logout link differently.  Instead of
     * showing the 403 error page, the user is redirected to the home
     * page where if they're not currently logged in they'll go to
     * the login page.
     */
    private static class MyAccessDeniedHandler extends AccessDeniedHandlerImpl {
      public MyAccessDeniedHandler(final String errorPage) {
        setErrorPage(errorPage);
      }

      @Override
      public void handle(final HttpServletRequest request, final HttpServletResponse response, final AccessDeniedException accessDeniedException) throws IOException, ServletException {
        if (accessDeniedException instanceof CsrfException &&
              "/logout".equals(request.getPathInfo())) {
          response.sendRedirect("/");
        } else {
          super.handle(request, response, accessDeniedException);
        }
      }
    }
  }

  @Configuration
  @Order(1)
  public static class GuiApiSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    public void configure(final HttpSecurity http) throws Exception {
      // @formatter:off
      http.antMatcher("/api/**")
            .authorizeRequests()
              .anyRequest().authenticated().and()
          .exceptionHandling()
            .authenticationEntryPoint(restEntryPoint()).and()
          .httpBasic().and()  // TODO - remove after testing complete
          .headers()
            .frameOptions().sameOrigin();
      // @formatter:on
    }

    @Bean
    public AuthenticationEntryPoint restEntryPoint() {
      // We only authenticate through the webapp to get to the API
      return (request, response, authException) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
    }
  }

  @Resource
  private UserDetailsService userDetailsService;

  @Bean
  public SavedRequestAwareAuthenticationSuccessHandler savedRequestAwareAuthenticationSuccessHandler() {
    SavedRequestAwareAuthenticationSuccessHandler auth
          = new SavedRequestAwareAuthenticationSuccessHandler();
    auth.setTargetUrlParameter("targetUrl");
    return auth;
  }

  @Bean
  public DaoAuthenticationProvider daoAuthenticationProvider() {
    final DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
    provider.setUserDetailsService(userDetailsService);
    provider.setPasswordEncoder(passwordEncoder());
    return provider;
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Autowired
  public void registerGlobal(final AuthenticationManagerBuilder auth) throws Exception {
    auth.authenticationProvider(daoAuthenticationProvider());
  }
}
