/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.deviget.minesweeperultimate.service;

import com.deviget.minesweeperultimate.pojo.Game;
import com.deviget.minesweeperultimate.repository.GameDao;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author smedina
 */
@Service
public class GameServiceImpl implements GameService {
    
    @Autowired
    private GameDao gameRepository;
    
    @Override
    public void save(Game game) {

        gameRepository.save(game);
        
    }
    
    @Override
     public void delete(Game game)  {
       gameRepository.delete(game);
    }
    
    @Override
    public Optional <Game> findById(long id) {
        return gameRepository.findById(id);
    }

    
}
