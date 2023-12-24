package com.userrating.repository;


import com.userrating.entities.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.QueryByExampleExecutor;

public interface RatingRepository extends JpaRepository<Rating,Long>, QueryByExampleExecutor<Rating> {

    @Query(value = "SELECT AVG(r.rate) FROM rating r WHERE r.appareil_id = ?1",nativeQuery = true)
    double getAverageRatingByAppareil(Long id);


}
