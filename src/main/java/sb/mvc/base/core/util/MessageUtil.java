/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 26 오후 1:17.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.core.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Locale;

@Slf4j
@Component
public class MessageUtil {

    @Autowired
    private MessageSource messageSource;

    private MessageSourceAccessor accessor;

    @PostConstruct
    private void init() {
        log.debug( "###################################    Messges locale [{}]", Locale.getDefault() );
        accessor = new MessageSourceAccessor( messageSource, Locale.getDefault() );
    }

    public String getMessage( String code ) {
        return accessor.getMessage( code );
    }

}
