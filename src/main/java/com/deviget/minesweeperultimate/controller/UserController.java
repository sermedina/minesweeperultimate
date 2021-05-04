package com.deviget.minesweeperultimate.controller;

import com.deviget.minesweeperultimate.pojo.Response;
import com.deviget.minesweeperultimate.pojo.User;
import com.deviget.minesweeperultimate.service.AuthenticationService;
import com.deviget.minesweeperultimate.service.UserService;
import com.deviget.minesweeperultimate.validator.UserValidator;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author smedina
 */

@Controller
public class UserController {
    
    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;
      
    @Autowired
    private AuthenticationService authenticationService;
    

       
    @RequestMapping(value ="/", method = RequestMethod.GET)
	public String mainPage(Model model) {
            model.addAttribute("user", authenticationService.getPrincipal());
            return "home";
        }
        
    @RequestMapping(value = "/home", method = RequestMethod.GET)
    public String homePage(Model model) {
        model.addAttribute("user", authenticationService.getPrincipal());
        return "home";
    }

    @RequestMapping(value = "/accessDenied", method = RequestMethod.GET)
    public String accessDeniedPage(Model model) {
        model.addAttribute("user", authenticationService.getPrincipal());
        return "accessDenied";
    }

 
    @RequestMapping(value="/signUp",method=RequestMethod.POST)
    public @ResponseBody Response signUp(@Valid @RequestBody  User userForm ){
        Response res = new Response();  
        userService.save(userForm);
        res.setStatus("Account created successfully");

        return res;
    }



    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login(Model model, String error, String logout) {
        if (error != null) {
            model.addAttribute("error", "Error: Invalid credentials.");
        }

        if (logout != null) {
            model.addAttribute("message", "Session closed successfully");
        }

        return "login";
    }
    

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        binder.setValidator(userValidator);
        
    }
          
     

}
