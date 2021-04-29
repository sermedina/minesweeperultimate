/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.deviget.minesweeperultimate.filter;



import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;

/**
 *
 * @author smedina
 */

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    

    @Override
    protected void configure(
      AuthenticationManagerBuilder auth) throws Exception {  
        auth.authenticationProvider(customAuthenticationProvider());
    }
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http           
            .authorizeRequests()
                .antMatchers("/").fullyAuthenticated()
                .antMatchers("/resources/**").permitAll()
                .anyRequest().authenticated()
                .and()
            .formLogin()
                .loginPage("/login")
                .permitAll()
                .authenticationDetailsSource(customWebAuthenticationDetailsSource())
                .failureUrl("/login?error")
                .and()
                .exceptionHandling().accessDeniedPage("/accessDenied")
                .and()
            .logout()
                .logoutSuccessUrl("/login?logout")
                .deleteCookies("JSESSIONID")
                .invalidateHttpSession(true)
                .permitAll()
                .and()
            .csrf().csrfTokenRepository(csrfTokenRepository())
                .and()
            .addFilterAfter(csrfHeaderFilter(), BasicAuthenticationFilter.class);
            
            
    }
    
    @Bean
    public BCryptPasswordEncoder bcryptPasswordEncoder(){
	BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	return encoder;
        }
    
    @Bean
    public CustomWebAuthenticationDetailsSource customWebAuthenticationDetailsSource() {
        return new CustomWebAuthenticationDetailsSource();
    }
     

    @Bean
    public CsrfHeaderFilter csrfHeaderFilter() {
        return new CsrfHeaderFilter();
    }
    
    @Bean
    public CustomAuthenticationProvider customAuthenticationProvider() {
        return new CustomAuthenticationProvider();
    }
    
    @Bean
    public CsrfTokenRepository csrfTokenRepository() {
        HttpSessionCsrfTokenRepository repository =
                new HttpSessionCsrfTokenRepository();

        repository.setHeaderName("X-XSRF-TOKEN");
        return repository;
    }

    
    
}
