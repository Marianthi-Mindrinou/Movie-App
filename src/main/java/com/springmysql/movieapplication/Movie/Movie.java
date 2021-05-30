package com.springmysql.movieapplication.Movie;

import com.springmysql.movieapplication.Bookmarks.Director;
import com.springmysql.movieapplication.Bookmarks.Writer;
import com.springmysql.movieapplication.User.User;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Movie {

    @Id
    private String imdbId;

    @ManyToMany(mappedBy = "likedMovies", fetch =  FetchType.LAZY,cascade = CascadeType.ALL)
    private Set<User> user = new HashSet<>();

    @ManyToMany(mappedBy = "movies", fetch =  FetchType.LAZY,cascade = CascadeType.ALL)
    private Set<Director> directors = new HashSet<>();

    @ManyToMany(mappedBy = "movies", fetch =  FetchType.LAZY,cascade = CascadeType.ALL)
    private Set<Writer> writers = new HashSet<>();

    public Movie() {
    }

    public Movie(String imdbId) {
        this.imdbId = imdbId;
    }

    public String getImdbId() {
        return imdbId;
    }

    public void setImdbId(String imdbId) {
        this.imdbId = imdbId;
    }

    public Set<User> getUser() {
        return user;
    }

    public void setUser(Set<User> user) {
        this.user = user;
    }

    public Set<Director> getDirectors() {
        return directors;
    }

    public void setDirectors(Set<Director> directors) {
        this.directors = directors;
    }

    public Set<Writer> getWriters() {
        return writers;
    }

    public void setWriters(Set<Writer> writers) {
        this.writers = writers;
    }

    @Override
    public String toString() {
        return "Movie{" +
                "imdbId='" + imdbId + '\'' +
                '}';
    }
}
