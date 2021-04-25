/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.deviget.minesweeperultimate.filter;

/**
 *
 * @author smedina
 */
import java.util.Locale;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import javax.servlet.http.HttpServletRequest;

public class CustomWebAuthenticationDetails extends WebAuthenticationDetails {


    private final Locale locale;

    public CustomWebAuthenticationDetails(HttpServletRequest request) {
        super(request);
        this.locale = request.getLocale();
    }


    
    public Locale getLocale() {
        return locale;
    }

}