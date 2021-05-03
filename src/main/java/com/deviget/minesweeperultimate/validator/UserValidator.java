package com.deviget.minesweeperultimate.validator;

import com.deviget.minesweeperultimate.exception.MyValidationException;
import com.deviget.minesweeperultimate.pojo.User;
import com.deviget.minesweeperultimate.service.UserService;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 *
 * @author smedina
 */

@Component
public class UserValidator implements Validator {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private MessageSource messageSource;

    @Override
    public boolean supports(Class<?> aClass) {
        return User.class.equals(aClass);
    }
    


    @Override
    public void validate(Object o, Errors errors) {
        User user = (User) o;

        
        Map customValidationErrors = new HashMap();
         
        if (checkInputString(user.getUsername())) {
            customValidationErrors.put("username", messageSource.getMessage("NotEmpty", null, 
            new Locale("es", "ES")));
        }
        
        else {
            if (user.getUsername().length() < 3 || user.getUsername().length() > 32) {
                customValidationErrors.put("username", messageSource.getMessage("Size.userForm.username", null, 
                new Locale("es", "ES")));
            }

            if (userService.findByUsername(user.getUsername()) != null ) {
                customValidationErrors.put("username", messageSource.getMessage("Duplicate.userForm.username", null, 
                new Locale("es", "ES")));
            }
        }
       
         
        if (customValidationErrors!=null && !customValidationErrors.isEmpty()) {
			throw new MyValidationException(customValidationErrors);
		}

    }
    
    private boolean checkInputString(String input) {
        return (input == null || input.trim().length() == 0);
    }
    

}
