package com.userrating.service;


import com.userrating.entities.Rating;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RatingService {
    Rating save(Rating rating);

    Page<Rating> getAll(Pageable pageable);
    Rating update(Rating rating);
    boolean delete(Long id);
    Rating getById(Long id);
    Rating getByUserId(Long id);
}
