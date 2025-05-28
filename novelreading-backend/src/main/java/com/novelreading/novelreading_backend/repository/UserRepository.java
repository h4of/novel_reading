package com.novelreading.novelreading_backend.repository;

import com.novelreading.novelreading_backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    public Page<User> findAll(Pageable pageable);

    public Optional<User> findByEmail(String email);

    public User findByEmailAndPassword(String email,String password);
}
