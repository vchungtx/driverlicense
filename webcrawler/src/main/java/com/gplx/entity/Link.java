package com.gplx.entity;

import javax.persistence.*;

@Entity
@Table(name = "link")
public class Link {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "url", length = 500)
    private String url;

    @Column(name = "video", length = 500)
    private String video;

    @Column(name = "start_time")
    private Double startTime;

    @Column(name = "end_time")
    private Double endTime;

    @Column(name = "answer", length = 500)
    private String answer;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public Double getStartTime() {
        return startTime;
    }

    public void setStartTime(Double startTime) {
        this.startTime = startTime;
    }

    public Double getEndTime() {
        return endTime;
    }

    public void setEndTime(Double endTime) {
        this.endTime = endTime;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

}
