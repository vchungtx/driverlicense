package com.gplx.api.controller;

import com.gplx.api.entity.SimChapter;
import com.gplx.api.entity.SimQuestion;
import com.gplx.api.repository.SimChapterRepository;
import com.gplx.api.repository.SimQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/sim/chapter")
public class SimChapterController {

    @Autowired
    private SimChapterRepository simChapterRepository;

    @GetMapping(path = "/all")
    public @ResponseBody
    Iterable <SimChapter> getAllUsers() {
        return simChapterRepository.findAll();
    }
}
