package com.deviget.minesweeperultimate.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.io.Serializable;
import java.util.Set;


import javax.persistence.*;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;


@Entity
@Table(name = "users")
public class User implements Serializable {
    
    private Long id;
    private String username;
    private String password;
    private boolean enabled=true;
    private boolean accountNonLocked=true;
    private Set<Game> games;

  
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
  
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
  
    public boolean isEnabled() {
        
        return this.enabled;
    }
    
    public void setEnabled(boolean enabled) {
        
        this.enabled = enabled;
    }
    
    
    public boolean isAccountNonLocked() {
            
        return this.accountNonLocked;
    }
    
    public void setAccountNonLocked(boolean accountNonLocked) {
        
        this.accountNonLocked = accountNonLocked;
    }

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(mappedBy="user")
    public Set<Game> getGames() {
        return games;
    }

    @JsonProperty
    public void setGames(Set<Game> games) {
        this.games = games;
    }
  

    
}
