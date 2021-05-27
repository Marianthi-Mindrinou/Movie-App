package com.springmysql.movieapplication.Controllers;

import com.springmysql.movieapplication.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class MovieController {

    @Autowired
    private UserRepository userRepository;

    public MovieController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping({"/movie"})
    public String index() {
        return "index.html";
    }

    @GetMapping({"/login"})
    public String login() {
        return "login.html";
    }

    @GetMapping({"/movies/{id}"})
    public String movie(@PathVariable(value = "id") String movieId) {
        return "movie.html";
    }

}