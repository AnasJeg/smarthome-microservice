package com.user_management.repository;

import com.user_management.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserReposiroty extends JpaRepository<User,Long> {
}
