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

    @GetMapping({"/movies"})
    public String index() {
        return "index.html";
    }

    @GetMapping({"/login"})
    public String login() {
        return "login.html";
    }

    @GetMapping({"/bookmark"})
    public String bookmark() {
        return "bookmarks.html";
    }

    @GetMapping(value="/search", params = "director")
    public String searchDirector(@RequestParam String director) {
        return "searchBookmark.html";
    }
    @GetMapping(value="/search", params = "writer")
    public String searchWriter(@RequestParam String writer) {
        return "searchBookmark.html";
    }
    @GetMapping({"/movie"})
    public String movie(@RequestParam String id) {
        return "movie.html";
    }

}