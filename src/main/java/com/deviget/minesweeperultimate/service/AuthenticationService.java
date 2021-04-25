/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.deviget.minesweeperultimate.service;

import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;

/**
 *
 * @author Sergio
 */
public interface AuthenticationService {
    
    public Collection<? extends GrantedAuthority> getAuthorities();
    public String getPrincipal();
    
}
