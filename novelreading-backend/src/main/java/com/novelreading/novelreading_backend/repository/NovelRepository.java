package com.novelreading.novelreading_backend.repository;

import com.novelreading.novelreading_backend.entity.Novel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NovelRepository extends JpaRepository<Novel,Long> {
    public Page<Novel> findAllByOrderByDateDesc(Pageable pageable);

    public Page<Novel> findAllByOrderByViewDesc(Pageable pageable);

    public Optional<Novel> findByRoute(String route);

    public Page<Novel> findAll(Pageable pageable);

    @Query("SELECT n FROM Novel n " +
            "WHERE (n.genre =:genre or :genre IS NULL) " +
            "AND (n.status = :status OR :status IS NULL)")
    public Page<Novel> filterNovel(@Param("genre")String genre,@Param("country")String country,@Param("status") String status,Pageable pageable);

    @Query("SELECT n FROM Novel n WHERE n.name LIKE CONCAT('%',:search,'%')")
    public List<Novel> searchNovel(@Param("search") String search);

    @Query("""
    SELECT n
    FROM Novel n
    LEFT JOIN Rating r ON n.id = r.novelRate.id
    GROUP BY n.id
    HAVING AVG(r.rate) >= 3.0
    ORDER BY AVG(r.rate) DESC
    """)
    Page<Novel> findAllByAvgRating(Pageable pageable);
}
