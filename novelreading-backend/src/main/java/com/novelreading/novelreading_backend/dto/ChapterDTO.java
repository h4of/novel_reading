package com.novelreading.novelreading_backend.dto;


public class ChapterDTO {
    private String id;
    private String title;
    private String content;
    private int chapterNumber;
    private long novelID;

    public ChapterDTO() {
    }

    public int getChapterNumber() {
        return chapterNumber;
    }

    public void setChapterNumber(int chapterNumber) {
        this.chapterNumber = chapterNumber;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public long getNovelID() {
        return novelID;
    }

    public void setNovelID(long novelID) {
        this.novelID = novelID;
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
