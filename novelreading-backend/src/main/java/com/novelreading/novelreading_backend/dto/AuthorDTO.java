package com.novelreading.novelreading_backend.dto;

import java.util.List;

public class AuthorDTO {
    private Long id;
    private String name;
    private String anou;
    private String date;
    private String route;
    private List<NovelDTO> novels;

    public AuthorDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<NovelDTO> getNovels() {
        return novels;
    }

    public void setNovels(List<NovelDTO> novels) {
        this.novels = novels;
    }

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAnou() {
        return anou;
    }

    public void setAnou(String anou) {
        this.anou = anou;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
