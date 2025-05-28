package com.novelreading.novelreading_backend.repository;

import com.novelreading.novelreading_backend.entity.Author;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends JpaRepository<Author,Long> {
    public Page<Author> findAll(Pageable pageable);

    public Author findByRoute(String route);
}
