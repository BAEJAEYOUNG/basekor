/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 5. 27 오후 5:05.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import sb.mvc.base.biz.login.security.LoginAccessDeniedHandler;
import sb.mvc.base.biz.login.security.LoginAuthenticationEntryPoint;
import sb.mvc.base.biz.login.security.LoginFailureHandler;
import sb.mvc.base.biz.login.security.LoginSuccessHandler;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    /**
     * 스프링 시큐리티 룰을 무시하게 하는 Url 규칙.
     *
     * @param web
     * @throws Exception
     */
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .antMatchers("/favicon.ico"
                        , "/resources/**"
                        , "/webjars/**"
                        , "/html/**"
                        , "/css/**"
                        , "/agent/**"
                        , "/js/**"
                        , "/image/**"
                        , "/error/**"
                        , "/system/cd/comboList/**"
//                        , "/main/**"
//                      , "/system/**"

                )
        ;
    }

    /**
     * 스프링 시큐리티 룰.
     *
     * @param http
     * @throws Exception
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.headers()
                .frameOptions()
                .sameOrigin()
                .and()
                .authorizeRequests()
                .antMatchers("/", "/logout", "/security").permitAll()
                .antMatchers("/login/**").permitAll()
                .antMatchers("/logout/**").permitAll()
                .antMatchers("/system/**").access("hasRole('ROLE_agc000')")
                .antMatchers("/**").access("hasRole('ROLE_agc000')")//.hasAnyRole("ROLEagc000", "ROLEagc010")
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .usernameParameter("mngrId")
                .passwordParameter("mngrPwd")
                .loginPage("/login")
                .loginProcessingUrl("/login/security")
                .successHandler(authenticationSuccessHandler())
                .failureHandler(authenticationFailureHandler())
                .permitAll()
                .and()
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessHandler(logoutSuccessHandler())
                .invalidateHttpSession(true)
                .permitAll()
                .and()
                .exceptionHandling()
                .accessDeniedHandler(accessDeniedHandler())
                .authenticationEntryPoint(authenticationEntryPoint())
                .and()
                .csrf().disable()
        ;

    }

    /*
     * SuccessHandler bean register
     */
    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler() {
        LoginSuccessHandler successHandler = new LoginSuccessHandler();
        successHandler.setDefaultTargetUrl("/main");
        return successHandler;
    }

    /**
     * FailureHandler bean register
     *
     * @return
     */
    @Bean
    public AuthenticationFailureHandler authenticationFailureHandler() {
        LoginFailureHandler failureHandler = new LoginFailureHandler();
        failureHandler.setDefaultFailureUrl("/login?fail=true");
        return failureHandler;
    }

    /**
     * LogoutSuccessHandler bean register
     *
     * @return
     */
    @Bean
    public LogoutSuccessHandler logoutSuccessHandler() {
        sb.mvc.base.biz.login.security.LogoutSuccessHandler logoutSuccessHandler = new sb.mvc.base.biz.login.security.LogoutSuccessHandler();
        logoutSuccessHandler.setDefaultTargetUrl("/login");
        return logoutSuccessHandler;
    }

    /**
     * AccessDeniedHandler bean register
     *
     * @return
     */
    @Bean
    public AccessDeniedHandler accessDeniedHandler() {
        LoginAccessDeniedHandler accessDeniedHandler = new LoginAccessDeniedHandler();
        accessDeniedHandler.setTargetUrl("/login");
        return accessDeniedHandler;
    }

    /**
     * AuthenticationEntryPoint bean register
     *
     * @return
     */
    @Bean
    public AuthenticationEntryPoint authenticationEntryPoint() {
        LoginAuthenticationEntryPoint authenticationEntryPoint = new LoginAuthenticationEntryPoint();
        authenticationEntryPoint.setRedirect(false);
        authenticationEntryPoint.setTargetUrl("/login");
        return authenticationEntryPoint;
    }

}

