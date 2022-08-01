package com.gplx.api.bean;

import com.gplx.api.entity.SimQuestion;
import com.gplx.api.entity.SimTest;

import java.util.List;

public class TestResponse {
    List<SimQuestion> questionList;
    List<SimTest> testList;

    public List<SimQuestion> getQuestionList() {
        return questionList;
    }

    public void setQuestionList(List<SimQuestion> questionList) {
        this.questionList = questionList;
    }

    public List<SimTest> getTestList() {
        return testList;
    }

    public void setTestList(List<SimTest> testList) {
        this.testList = testList;
    }
}
