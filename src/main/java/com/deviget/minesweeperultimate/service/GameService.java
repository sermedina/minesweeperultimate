/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.deviget.minesweeperultimate.service;

/**
 *
 * @author smedina
 */
import com.deviget.minesweeperultimate.pojo.Game;

public interface GameService {
    void save(Game game);
    void delete(Game game);
    Object findById(long id);    
    
}
