/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.deviget.minesweeperultimate.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import com.vladmihalcea.hibernate.type.json.JsonStringType;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

/**
 *
 * @author smedina
 */
@Entity
@Table(name = "game")
@TypeDefs({
    @TypeDef(name = "json", typeClass = JsonStringType.class),
    @TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
})
public class Game implements Serializable {
    
    private Long id;
    private String board;
    private boolean finished;
    private int numberOfRows;
    private int numberOfColumns;
    private int numberOfMines;
    private int movesLeft;
    private boolean hasFirstMove;
    private Date lastTimePlayed;
    private double totalTimePlayed;
    private User user;
  
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    @Type(type = "jsonb")
    @Column(columnDefinition = "jsonb")
    public String getBoard() {
        return board;
    }

    public void setBoard(String board) {
        this.board = board;
    }

    public boolean isFinished() {
        return finished;
    }

    public void setFinished(boolean finished) {
        this.finished = finished;
    }
    
    @Column(name="number_of_rows")
    public int getNumberOfRows() {
        return numberOfRows;
    }

    public void setNumberOfRows(int numberOfRows) {
        this.numberOfRows = numberOfRows;
    }

    @Column(name="number_of_columns")
    public int getNumberOfColumns() {
        return numberOfColumns;
    }

    public void setNumberOfColumns(int numberOfColumns) {
        this.numberOfColumns = numberOfColumns;
    }

    @Column(name="number_of_mines")
    public int getNumberOfMines() {
        return numberOfMines;
    }

    public void setNumberOfMines(int numberOfMines) {
        this.numberOfMines = numberOfMines;
    }
    
    @Column(name="moves_left")
    public int getMovesLeft() {
        return movesLeft;
    }

    public void setMovesLeft(int movesLeft) {
        this.movesLeft = movesLeft;
    }

    @Column(name="has_first_move")
    public boolean isHasFirstMove() {
        return hasFirstMove;
    }

    public void setHasFirstMove(boolean hasFirstMove) {
        this.hasFirstMove = hasFirstMove;
    }
    
    @Column(name="last_time_played")
    public Date getLastTimePlayed() {
        return lastTimePlayed;
    }

    public void setLastTimePlayed(Date lastTimePlayed) {
        this.lastTimePlayed = lastTimePlayed;
    }
    
    @Column(name="total_time_played")
    public double getTotalTimePlayed() {
        return totalTimePlayed;
    }

    public void setTotalTimePlayed(double totalTimePlayed) {
        this.totalTimePlayed = totalTimePlayed;
    }
    
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinTable(name = "users_game", joinColumns = @JoinColumn(name = "game_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


}