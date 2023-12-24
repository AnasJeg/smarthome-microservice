package com.user_management.service;

import com.user_management.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {
    User save(User user);
    Page<User> getAll(Pageable pageable);
    User update(User user);
    boolean delete(Long id);
    User getById(Long id);
}
