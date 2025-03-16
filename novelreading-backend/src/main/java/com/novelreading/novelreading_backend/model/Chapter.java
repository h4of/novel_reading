package com.novelreading.novelreading_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "chapter")
public class Chapter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long chapter_id;
    private String title;
    private String content;
//    @ManyToOne
//    @JoinColumn(name = "novel_id",nullable = false)
//    private Novel novel;

    public Chapter() {
    }

    public long getChapter_id() {
        return chapter_id;
    }

    public void setChapter_id(long chapter_id) {
        this.chapter_id = chapter_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

}
