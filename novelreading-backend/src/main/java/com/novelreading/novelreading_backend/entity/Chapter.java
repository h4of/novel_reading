package com.novelreading.novelreading_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "chapter")
public class Chapter {
    @Id
    @Column(name = "chapter_id")
    private String chapterID;
    @Column(name = "chapter_number")
    private int chapterNumber;
    @Column(name = "title",columnDefinition = "TEXT")
    private String title;
    @Column(name = "content",columnDefinition = "TEXT")
    private String content;

    @ManyToOne
    @JoinColumn(name = "novel_id")
    private Novel novel;

    public Chapter() {
    }

    public Novel getNovel() {
        return novel;
    }

    public void setNovel(Novel novel) {
        this.novel = novel;
    }

    public int getChapterNumber() {
        return chapterNumber;
    }

    public void setChapterNumber(int chapterNumber) {
        this.chapterNumber = chapterNumber;
    }

    public String getChapterID() {
        return chapterID;
    }

    public void setChapterID(String chapterID) {
        this.chapterID = chapterID;
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
