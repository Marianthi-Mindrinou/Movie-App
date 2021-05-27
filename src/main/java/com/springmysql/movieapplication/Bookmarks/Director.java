package com.springmysql.movieapplication.Bookmarks;


import com.springmysql.movieapplication.Movie.Movie;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Director {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(nullable = false)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @ManyToMany(mappedBy = "directors", fetch =  FetchType.LAZY,cascade = CascadeType.ALL)
    private Set<Movie> movies = new HashSet<>();

    public Director() {
    }

    public Director(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Movie> getMovies() {
        return movies;
    }

    public void setMovies(Set<Movie> movies) {
        this.movies = movies;
    }

    @Override
    public String toString() {
        return "Director{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
