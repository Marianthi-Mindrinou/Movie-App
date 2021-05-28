package com.springmysql.movieapplication.DTO;

public class UserMovieDTO {

    private String email;
    private String imdbId;
    private String directorName;


    public UserMovieDTO() {
    }

    public UserMovieDTO(String email, String imdbId, String directorName) {
        this.email = email;
        this.imdbId = imdbId;
        this.directorName = directorName;
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

    public String getDirectorName() {
        return directorName;
    }

    public void setDirectorName(String directorName) {
        this.directorName = directorName;
    }
}
