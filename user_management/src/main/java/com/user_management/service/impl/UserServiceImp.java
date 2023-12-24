package com.user_management.service.impl;

import com.user_management.entities.User;
import com.user_management.repository.UserReposiroty;
import com.user_management.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class UserServiceImp implements UserService {

    private final UserReposiroty userReposiroty;

    @Override
    public User save(User user) {
        return userReposiroty.save(user);
    }

    @Override
    public Page<User> getAll(Pageable pageable) {
        return userReposiroty.findAll(pageable);
    }

    @Override
    public User update(User user) {
        return userReposiroty.save(user);
    }

    @Override
    public boolean delete(Long id) {
        if(userReposiroty.existsById(id)){
            log.info("User with id = {}",id);
            userReposiroty.delete(userReposiroty.findById(id).get());
            return true;
        }
        return false;
    }

    @Override
    public User getById(Long id) {
        if(userReposiroty.existsById(id)){
            log.info("User with id {}",id);
            return userReposiroty.findById(id).get();
        }else{
            log.warn("User with id {} not found",id);
            return null;
        }
    }
}
