package com.novelreading.novelreading_backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_read_novel")
public class Read {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "read_at")
    private LocalDateTime readAt;
    @Column(name = "chapter_reading")
    private int chapterReading;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User userRead;

    @ManyToOne
    @JoinColumn(name = "novel_id")
    private Novel novelRead;

    public Read() {
    }

    public LocalDateTime getReadAt() {
        return readAt;
    }

    public void setReadAt(LocalDateTime readAt) {
        this.readAt = readAt;
    }

    public int getChapterReading() {
        return chapterReading;
    }

    public void setChapterReading(int chapterReading) {
        this.chapterReading = chapterReading;
    }

    public User getUserRead() {
        return userRead;
    }

    public void setUserRead(User userRead) {
        this.userRead = userRead;
    }

    public Novel getNovelRead() {
        return novelRead;
    }

    public void setNovelRead(Novel novelRead) {
        this.novelRead = novelRead;
    }
}
