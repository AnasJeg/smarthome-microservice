package com.userrating.controller;

import com.userrating.entities.Appareil;
import com.userrating.entities.Category;
import com.userrating.entities.Rating;
import com.userrating.service.RatingService;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;


@RestController
@RequestMapping("api/rating")
@CrossOrigin
@RequiredArgsConstructor
public class RatingController {

   // private final RestTemplate restTemplate;

    private final RatingService ratingService;

    private final String baseUrl = "http://localhost:8090/api/";

    @GetMapping("/filter/{id}")
    public ResponseEntity<Category> rate(@PathVariable Long id) {
      //  Category category = restTemplate.getForObject(baseUrl + "categories/get?id=" + id, Category.class);
        Category category = new RestTemplate().getForEntity(baseUrl + "categories/get?id=" + id, Category.class).getBody();
        if (category != null) {
            return ResponseEntity.ok(category);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/rate")
    public ResponseEntity<Rating> rateApp(@RequestBody Rating rating) {
        Rating savedRating=this.ratingService.save(rating);
        return new ResponseEntity<>(savedRating, HttpStatus.CREATED);
    }
    /*
    @PostMapping("")
    public ResponseEntity<Appareil> addAppareil(@RequestBody Appareil appareil) {
        ResponseEntity<Appareil> response = restTemplate.postForEntity(baseUrl + "appareils", appareil, Appareil.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
        } else {
            return ResponseEntity.status(response.getStatusCode()).build();
        }
    }
    */
}
