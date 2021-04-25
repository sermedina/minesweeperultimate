package com.deviget.minesweeperultimate.repository;

import com.deviget.minesweeperultimate.pojo.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameDao extends JpaRepository<Game, Long> {
    
         
}
