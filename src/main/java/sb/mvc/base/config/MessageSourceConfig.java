/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 5. 21 오전 11:45.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import java.util.Locale;

@Configuration
public class MessageSourceConfig implements WebMvcConfigurer {

    protected static final Logger logger = LoggerFactory.getLogger(MessageSourceConfig.class);

    @Bean
    public LocaleResolver localeResolver() {
        System.out.println("---------------------------------------------------------------------");
        System.out.println("MessageSourceConfig > localeResolver()");
        System.out.println("---------------------------------------------------------------------");
        SessionLocaleResolver slr = new SessionLocaleResolver();
        slr.setDefaultLocale(Locale.KOREA);
        return slr;
    }

    @Bean
    public LocaleChangeInterceptor localeChangeInterceptor() {
        System.out.println("---------------------------------------------------------------------");
        System.out.println("MessageSourceConfig > localeChangeInterceptor()");
        System.out.println("---------------------------------------------------------------------");
        LocaleChangeInterceptor lci = new LocaleChangeInterceptor();
        lci.setParamName("locale");
        return lci;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        System.out.println("---------------------------------------------------------------------");
        System.out.println("MessageSourceConfig > addInterceptors()");
        System.out.println("---------------------------------------------------------------------");
        registry.addInterceptor(localeChangeInterceptor());
    }

    @Bean
    public MessageSource messageSource(
            @Value("${spring.messages.basename}") String basename,
            @Value("${spring.messages.encoding}") String encoding
    ) {
        System.out.println("============== basename = " + basename);
        System.out.println("============== encoding = " + encoding);

        ResourceBundleMessageSource ms = new ResourceBundleMessageSource();
        ms.setBasenames(basename.split(","));
        ms.setDefaultEncoding(encoding);
        ms.setAlwaysUseMessageFormat(true);
        ms.setUseCodeAsDefaultMessage(true);
        ms.setFallbackToSystemLocale(true);
        return ms;

//        ReloadableResourceBundleMessageSource ms = new ReloadableResourceBundleMessageSource();
//        ms.setBasenames(basename.split(","));
//        ms.setDefaultEncoding(encoding);
//        ms.setCacheSeconds(180);
//        ms.setAlwaysUseMessageFormat(true);
//        ms.setUseCodeAsDefaultMessage(true);
//        ms.setFallbackToSystemLocale(true);
//        return ms;

//        YamlMessageSource ms = new YamlMessageSource();
//        ms.setBasenames(basename.split(","));
//        ms.setDefaultEncoding(encoding);
//        ms.setAlwaysUseMessageFormat(true);
//        ms.setUseCodeAsDefaultMessage(true);
//        ms.setFallbackToSystemLocale(true);
//        return ms;
    }
}

//class YamlMessageSource extends ResourceBundleMessageSource {
//
//    @Override
//    protected ResourceBundle doGetBundle(String basename, Locale locale) throws MissingResourceException {
//        return ResourceBundle.getBundle(basename, locale, YamlResourceBundle.Control.INSTANCE);
//    }
//}