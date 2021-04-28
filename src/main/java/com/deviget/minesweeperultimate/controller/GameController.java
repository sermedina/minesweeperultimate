/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.deviget.minesweeperultimate.controller;


import com.deviget.minesweeperultimate.pojo.Game;
import com.deviget.minesweeperultimate.pojo.Response;
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
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
 
@Controller
@RequestMapping("/game")
public class GameController {
 
    @Autowired
    UserService userService;
    
    @Autowired
    private AuthenticationService authenticationService;
    
    @Autowired
    GameService gameService;
    
    @RequestMapping(value = "/newGame", method = RequestMethod.GET)
    public String newGame() {

       return "newGame";
    }
    
    @RequestMapping(value="/currentgame")
    public String getCurrentGameTemplate() {
    	return "currentgame";	
    }
    
    
    @RequestMapping(value="/newGame",method=RequestMethod.POST)
    public @ResponseBody Response newGame(@Valid @RequestBody  Game newGame ){
        Response res = new Response();  

        User user= (User) userService.findByUsername(authenticationService.getPrincipal());
        newGame.setUser(user);
        gameService.save(newGame);
        res.setStatus("Game created successfully");
        res.setResult(newGame.getId());

        return res;
    }
    
    @RequestMapping(value="/updateGame",method=RequestMethod.PUT)
    public @ResponseBody Response updateGame(@Valid @RequestBody  Game currentGame ){
        Response res = new Response();  

        User user= (User) userService.findByUsername(authenticationService.getPrincipal());
        currentGame.setUser(user);
        gameService.save(currentGame);
        res.setStatus("Game updated successfully");

        return res;
    }
    
    
    @RequestMapping(value="/games")
    public ResponseEntity<List> listGames() {
        System.out.println("*************************************ListGamesOfUser");
        
        User user= (User) userService.findByUsername(authenticationService.getPrincipal());
        List<Game> games= new ArrayList<>();
        games= userService.getGames(user);

        if(games.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(games, HttpStatus.OK);
    }
    
    @RequestMapping(value="/currentgame/{id}")
    public ResponseEntity<Game> findSpecificGame(@PathVariable("id") long id) {
        System.out.println("*************************************findSpecificGame");
        
        Optional<Game> game =   (Optional<Game>) gameService.findById(id);
        if(!game.isPresent()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(game.get(), HttpStatus.OK);
    }
      
   
}