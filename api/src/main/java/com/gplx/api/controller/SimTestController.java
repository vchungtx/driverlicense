package com.gplx.api.controller;

import com.gplx.api.bean.TestResponse;
import com.gplx.api.entity.SimQuestion;
import com.gplx.api.entity.SimTest;
import com.gplx.api.repository.SimQuestionRepository;
import com.gplx.api.repository.SimTestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping(path = "/sim/test")
public class SimTestController {

    @Autowired
    private SimTestRepository simTestRepository;

    @Autowired
    private SimQuestionRepository simQuestionRepository;

    @GetMapping(path = "/all")
    public @ResponseBody
    TestResponse getAllUsers() {
        TestResponse response = new TestResponse();
        response.setTestList(simTestRepository.findAll());
        response.setQuestionList(simQuestionRepository.findAll());
        return response;
    }
}
