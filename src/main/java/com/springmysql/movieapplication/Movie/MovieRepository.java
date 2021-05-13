package com.springmysql.movieapplication.Movie;

import org.springframework.data.repository.CrudRepository;

public interface MovieRepository extends CrudRepository<Movie, String> {
}
