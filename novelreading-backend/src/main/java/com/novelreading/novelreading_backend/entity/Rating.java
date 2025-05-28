package com.novelreading.novelreading_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "rating")
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "rate")
    private int rate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User userRate;

    @ManyToOne
    @JoinColumn(name = "novel_id")
    private Novel novelRate;

    public Rating() {
    }


    public User getUserRate() {
        return userRate;
    }

    public void setUserRate(User userRate) {
        this.userRate = userRate;
    }

    public Novel getNovelRate() {
        return novelRate;
    }

    public void setNovelRate(Novel novelRate) {
        this.novelRate = novelRate;
    }

    public int getRate() {
        return rate;
    }

    public void setRate(int rate) {
        this.rate = rate;
    }

}
