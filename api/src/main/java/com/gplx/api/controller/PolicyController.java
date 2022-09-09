package com.gplx.api.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PolicyController {
    @GetMapping(value = "privacy")
    public String getPolicy(){
        return "policy";
    }
}
