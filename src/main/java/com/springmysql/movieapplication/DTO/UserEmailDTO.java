package com.springmysql.movieapplication.DTO;

public class UserEmailDTO {

    private String userEmail;

    public UserEmailDTO(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}
