/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 5. 9 오전 10:49.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.biz.support.intercept;

import org.apache.commons.lang3.ObjectUtils;
import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.plugin.*;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.support.RequestContextUtils;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

@Intercepts( { @Signature( type = Executor.class, method = "query", args = { MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class } ) } )
public class MybatisQueryParameters implements Interceptor {

    protected static final Logger logger = LoggerFactory.getLogger( MybatisQueryParameters.class );

    @SuppressWarnings( "unchecked" )
    @Override
    public Object intercept( Invocation invocation ) throws Throwable {

        logger.debug( "MybatisQueryParameters.intercept invocation[{}]", invocation );

        Object oldParameter = invocation.getArgs()[1];

        Map<String, Object> newParameter = null;

        if( oldParameter instanceof Map ) {
            newParameter = (Map<String, Object>)oldParameter;
        } else {
            newParameter = new HashMap<String, Object>();

            if( oldParameter != null ) {
                newParameter.put( "default", oldParameter );
            }
        }

        ServletRequestAttributes requestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
        logger.debug( "MybatisQueryParameters.intercept requestAttributes [{}]", requestAttributes );

        if( ObjectUtils.allNotNull( requestAttributes ) ) {
            String language = RequestContextUtils.getLocale( requestAttributes.getRequest() ).getLanguage();
            logger.debug( "MybatisQueryParameters.intercept language [{}]", language );
            newParameter.put( "language", language );

            HttpSession session = requestAttributes.getRequest().getSession();

            Map<String, Object> sessionUser = (Map<String, Object>)session.getAttribute( "sessionUser" );
            logger.debug( "MybatisQueryParameters.intercept sessionUser [{}]", sessionUser );

            if( ObjectUtils.allNotNull( sessionUser ) ) {
                newParameter.put( "ssnMngrId", sessionUser.get( "mngrId" ) );
                newParameter.put( "ssnAthrCd", sessionUser.get( "athrCd" ) );

                if( !newParameter.containsKey( "regId" ) || StringUtils.isEmpty( newParameter.get( "regId" ) ) ) {
                    newParameter.put( "regId", sessionUser.get( "mngrId" ) );
                }
                if( !newParameter.containsKey( "chgId" ) || StringUtils.isEmpty( newParameter.get( "chgId" ) ) ) {
                    newParameter.put( "chgId", sessionUser.get( "mngrId" ) );
                }
            }

        }

        invocation.getArgs()[1] = newParameter;

        return invocation.proceed();
    }

    @Override
    public Object plugin( Object target ) {

        return Plugin.wrap( target, this );
    }

    @Override
    public void setProperties( Properties properties ) {

    }
}