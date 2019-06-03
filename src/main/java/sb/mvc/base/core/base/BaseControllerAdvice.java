/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 18 오후 5:21.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.core.base;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

import javax.servlet.ServletContext;

@Controller
@ControllerAdvice
public class BaseControllerAdvice {

    private ServletContext context;

    @Autowired
    public BaseControllerAdvice(ServletContext context) {
        this.context = context;
    }

    private String getContextPath() {
        return this.context.getContextPath();
    }

    @ModelAttribute
    public void addAttributes(Model model) {
        model.addAttribute("contextPath", getContextPath());
    }
}
