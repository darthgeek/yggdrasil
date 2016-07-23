package net.darthgeek.yggdrasil.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;

import javax.annotation.Resource;
import javax.sql.DataSource;

/**
 * Created by jason on 7/21/2016.
 */
@Configuration
@ComponentScan
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
  @Resource
  private DataSource dataSource;

  @Resource
  private UserDetailsService userDetailsService;

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
            .loginPage("/login")
            .permitAll()
            .and()
          .logout().permitAll().and()
            .rememberMe()
            .rememberMeParameter("remember-me").tokenRepository(persistentTokenRepository())
            .userDetailsService(userDetailsService).tokenValiditySeconds(86400).and()
          .csrf().and()
          .exceptionHandling().accessDeniedPage("/error/403");
    // @formatter:on
  }

  @Override
  public void configure(final WebSecurity web) throws Exception {
    web.ignoring().antMatchers("/css/**", "/js/**", "/images/**", "/fonts/**");
  }

  @Bean
  public PersistentTokenRepository persistentTokenRepository() {
    JdbcTokenRepositoryImpl db = new JdbcTokenRepositoryImpl();
    db.setDataSource(dataSource);
    return db;
  }

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
