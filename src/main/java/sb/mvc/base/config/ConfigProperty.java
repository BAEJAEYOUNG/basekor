/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 29 오전 9:21.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.support.ServletContextAttributeExporter;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class ConfigProperty {

    @Value( "${project.name}" )
    private String projectName;

    @Value( "${mybatis.config-location}" )
    private String mybatisConfigLocation;

    @Value( "${mybatis.mapper-locations}" )
    private String mybatisMapperLocation;

    @Value( "${inc-path}" )
    private String incPath;

    @Value( "${server.servlet.context-path}" )
    private String contextPath;

    @Value( "${project.title}" )
    private String projectTitle;

    @Value( "${spring.datasource.url}" )
    private String dbUrl;

    @Value( "${spring.datasource.driver-class-name}" )
    private String dbDriver;

    @Value( "${spring.datasource.username}" )
    private String dbUser;

    @Value( "${spring.datasource.password}" )
    private String dbPwd;

    public String getProjectName() {
        return projectName;
    }

    public String getMybatisConfigLocation() {
        return mybatisConfigLocation;
    }

    public String getMybatisMapperLocation() {
        return mybatisMapperLocation;
    }

    public String getIncPath() {
        return incPath;
    }

    public String getContextPath() {
        return contextPath;
    }

    public String getProjectTitle() {
        return projectTitle;
    }

    public String getDbUrl() {
        return dbUrl;
    }

    public String getDbDriver() {
        return dbDriver;
    }

    public String getDbUser() {
        return dbUser;
    }

    public String getDbPwd() {
        return dbPwd;
    }

    @Bean
    public ServletContextAttributeExporter servletContextAttributeExporter() {
        ServletContextAttributeExporter servletContextAttributeExporter = new ServletContextAttributeExporter();
        Map<String, Object>             map                             = new HashMap<>();
        map.put( "incPath", incPath );
        map.put( "contextPath", contextPath );
        servletContextAttributeExporter.setAttributes( map );
        return new ServletContextAttributeExporter();
    }

}
