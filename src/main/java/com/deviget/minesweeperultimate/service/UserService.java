package com.deviget.minesweeperultimate.service;


import com.deviget.minesweeperultimate.pojo.Game;
import com.deviget.minesweeperultimate.pojo.User;
import java.util.List;

public interface UserService {
    void save(User user);
    User findByUsername(String username);
    
    Object findById(long id);
    
    List<Game> getGames(User user);
    

}
