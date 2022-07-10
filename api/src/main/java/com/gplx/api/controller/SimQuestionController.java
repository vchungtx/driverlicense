package com.gplx.api.controller;

import com.gplx.api.entity.SimQuestion;
import com.gplx.api.repository.SimQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/sim/question")
public class SimQuestionController {

    @Autowired
    private SimQuestionRepository simQuestionRepository;

    @GetMapping(path = "/all")
    public @ResponseBody
    Iterable <SimQuestion> getAllUsers() {
        return simQuestionRepository.findAll();
    }
}
