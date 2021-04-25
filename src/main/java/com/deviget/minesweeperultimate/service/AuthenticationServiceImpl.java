/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.deviget.minesweeperultimate.service;

import com.deviget.minesweeperultimate.pojo.User;
import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 *
 * @author smedina
 */
@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
  
        return SecurityContextHolder.getContext().getAuthentication().getAuthorities();  
    }
    
    @Override
    public String getPrincipal(){
		String userName = null;
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		if (principal instanceof User) {
			userName = ((User)principal).getUsername();
		} else {
			userName = principal.toString();
		}
		return userName;
	}
    
    
}
