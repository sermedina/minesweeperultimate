package com.deviget.minesweeperultimate.service;


import com.deviget.minesweeperultimate.pojo.Game;
import com.deviget.minesweeperultimate.pojo.User;
import com.deviget.minesweeperultimate.repository.UserDao;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.security.authentication.BadCredentialsException;


@Service
public class UserServiceImpl implements UserService {
    
    @Autowired
    private UserDao userRepository;
    
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

      
    @Override
    public void save(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);       
    }
    
    @Override
    public User findById(long id) {
        return userRepository.getOne(id);
    }
    
    @Override
    public User findByUsername(String username) {
        
      return userRepository.findByUsername(username).orElseThrow(() -> new BadCredentialsException("Not found"));
      

    }
    

    @Override
    public List<Game> getGames(User user) {
        
            List<Game> games = new ArrayList<>();
            user.getGames().stream().forEach((Game game) -> {      
                        games.add(game);
                    
                });
        
        return games;
        
    }
     

     
  
}
