package backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class RootController {

    @RequestMapping("/")
    public ModelAndView handleRoot() {
        return new ModelAndView("redirect:auth");
    }
}