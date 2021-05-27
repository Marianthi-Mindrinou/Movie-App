package com.springmysql.movieapplication.Movie;

import com.springmysql.movieapplication.Bookmarks.Director;
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

    @ManyToMany(fetch =  FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinTable(
            name = "movie_directors",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "director_id"))
    private Set<Director> directors = new HashSet<>();

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

    @Override
    public String toString() {
        return "Movie{" +
                "imdbId='" + imdbId + '\'' +
                '}';
    }
}
