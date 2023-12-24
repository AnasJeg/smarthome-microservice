package com.userrating.service.impl;


import com.userrating.entities.Appareil;
import com.userrating.entities.Category;
import com.userrating.entities.Rating;
import com.userrating.repository.RatingRepository;
import com.userrating.service.RatingService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class RatingServiceImp implements RatingService {

   private final RatingRepository ratingRepository;

    private final String baseUrl = "http://localhost:8888/USERS-APPAREIL/api/";


    @Override
    public Rating save(Rating rating) {
        Long appId = rating.getAppareil_id();
        this.ratingRepository.save(rating);
        log.warn("rating avg {}",ratingRepository.getAverageRatingByAppareil(appId));
        if (ratingRepository.getAverageRatingByAppareil(appId) <= 2) {
            RestTemplate restTemplate = new RestTemplate();
            restTemplate.postForEntity(baseUrl + "appareils/switch?id=" + appId, null, Appareil.class);
        }else {
            RestTemplate restTemplate = new RestTemplate();
            restTemplate.postForEntity(baseUrl + "appareils/switch?id=" + appId, null, Appareil.class);
        }

        return rating;
    }

    @Override
    public Page<Rating> getAll(Pageable pageable) {
        return null;
    }

    @Override
    public Rating update(Rating rating) {
        return null;
    }

    @Override
    public boolean delete(Long id) {
        return false;
    }

    @Override
    public Rating getById(Long id) {
        return null;
    }

    @Override
    public Rating getByUserId(Long id) {
        return null;
    }
}
