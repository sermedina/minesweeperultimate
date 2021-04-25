
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.deviget.minesweeperultimate.filter;


import com.deviget.minesweeperultimate.pojo.User;
import com.deviget.minesweeperultimate.service.UserService;
import java.util.ArrayList;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 *
 * @author smedina
 */



@Component
public class CustomAuthenticationProvider implements AuthenticationProvider{

@Autowired
private UserService userService;


@Autowired
private PasswordEncoder passwordEncoder;

private final Logger log = Logger.getLogger("logging");


    @Override
    public Authentication authenticate(Authentication auth) throws AuthenticationException {
        String username = auth.getName().trim();
        String password = auth.getCredentials().toString().trim();
        String hashedPassword = passwordEncoder.encode(password);      
        CustomWebAuthenticationDetails webAuthenticationDetails = ((CustomWebAuthenticationDetails) auth.getDetails());
        String locale = webAuthenticationDetails.getLocale().toString();
        
        try {

            User user = userService.findByUsername(username);
            if (!passwordEncoder.matches(password, user.getPassword())) {
                throw new BadCredentialsException("Invalid password");
            }

            log.info("Username: " + username);
            log.info("Password: " + hashedPassword);
            log.info("Locale: " + locale);

            return new UsernamePasswordAuthenticationToken(user, hashedPassword, new ArrayList<>());
        
        } catch(BadCredentialsException e) {
            
            throw new BadCredentialsException("Account not found");
        }

    }

    public PasswordEncoder getPasswordEncoder() {

        return passwordEncoder;
    }

    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {

        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
