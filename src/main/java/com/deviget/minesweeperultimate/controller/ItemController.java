/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.deviget.minesweeperultimate.controller;


import com.deviget.minesweeperultimate.pojo.Game;
import com.deviget.minesweeperultimate.pojo.User;
import com.deviget.minesweeperultimate.service.AuthenticationService;
import com.deviget.minesweeperultimate.service.GameService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import com.deviget.minesweeperultimate.service.UserService;
import java.util.ArrayList;
 
@Controller
@RequestMapping("/item")
public class ItemController {
 
    @Autowired
    UserService userService;
    
    @Autowired
    private AuthenticationService authenticationService;
    
    @Autowired
    GameService gameService;
    
    
    @RequestMapping(value="/games/{userId}")
    public ResponseEntity<List> listGamesOfUser(@PathVariable("userId") long userId) {
        System.out.println("*************************************ListGamesOfUser");
        
        User user= (User) userService.findById(userId);
        List<Game> games= new ArrayList<>();
        if (user.getUsername().equals(authenticationService.getPrincipal())) {
            
            games= userService.getGames(user);
            
        }

        if(games.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(games, HttpStatus.OK);
    }
    
    @RequestMapping(value="/games/{id}")
    public ResponseEntity<Game> findSpecificGame(@PathVariable("id") long id) {
        System.out.println("*************************************findSpecificGame");
        Game router =   (Game) gameService.findById(id);
        if(router == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(router, HttpStatus.OK);
    }
      
   
}