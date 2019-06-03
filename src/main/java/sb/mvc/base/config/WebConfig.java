/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 5. 21 오후 5:33.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;
import sb.mvc.base.biz.support.intercept.ViewAttributesInterceptor;
import sb.mvc.base.biz.support.resolver.view.CCSXlsView;
import sb.mvc.base.biz.support.resolver.view.CCSXlsxView;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Bean(name = "json")
    public MappingJackson2JsonView jsonView() {
        return new MappingJackson2JsonView();
    }

    @Bean(name="xls")
    public CCSXlsView xlsView() {
        return new CCSXlsView();
    }

    @Bean(name="xlsx")
    public CCSXlsxView xlsxView() {
        return new CCSXlsxView();
    }

    @Bean
    ViewAttributesInterceptor viewAttributesInterceptor() {
        return new ViewAttributesInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(viewAttributesInterceptor());
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/login").setViewName("/login");
    }

}
