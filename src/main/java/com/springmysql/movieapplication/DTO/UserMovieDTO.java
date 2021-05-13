package com.springmysql.movieapplication.DTO;

public class UserMovieDTO {

    private String email;
    private String imdbId;

    public UserMovieDTO() {
    }

    public UserMovieDTO(String email, String imdbId) {
        this.email = email;
        this.imdbId = imdbId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImdbId() {
        return imdbId;
    }

    public void setImdbId(String imdbId) {
        this.imdbId = imdbId;
    }
}
