package com.gplx.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "sim_question")
public class SimQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", length = 500)
    private String name;

    @Column(name = "detail", length = 4000)
    private String detail;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chapter_id")
    private SimChapter simChapter;

    @Column(name = "url", length = 1000)
    private String url;

    @Column(name = "number_order")
    private Integer numberOrder;

    @Column(name = "status")
    private Integer status;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @Column(name = "start_point")
    private Double startPoint;

    @Column(name = "end_point")
    private Double endPoint;

    @Column(name = "answer", length = 4000)
    private String answer;

    @Column(name = "answer_img", length = 500)
    private String answerImg;

    public Double getEndPoint() {
        return endPoint;
    }

    public void setEndPoint(Double endPoint) {
        this.endPoint = endPoint;
    }

    public Double getStartPoint() {
        return startPoint;
    }

    public void setStartPoint(Double startPoint) {
        this.startPoint = startPoint;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getNumberOrder() {
        return numberOrder;
    }

    public void setNumberOrder(Integer numberOrder) {
        this.numberOrder = numberOrder;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public SimChapter getSimChapter() {
        return simChapter;
    }

    public void setSimChapter(SimChapter simChapter) {
        this.simChapter = simChapter;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getAnswerImg() {
        return answerImg;
    }

    public void setAnswerImg(String answerImg) {
        this.answerImg = answerImg;
    }
}
