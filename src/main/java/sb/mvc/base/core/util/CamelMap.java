/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 19 오후 1:54.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.core.util;

import org.apache.commons.collections4.map.ListOrderedMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Clob;
import java.sql.SQLException;

@SuppressWarnings( "rawtypes" )
public class CamelMap extends ListOrderedMap {

    protected static final Logger logger           = LoggerFactory.getLogger( CamelMap.class );
    private static final   long   serialVersionUID = 1L;

    @SuppressWarnings( "unchecked" )
    @Override
    public Object put( Object key, Object value ) {

        //logger.debug("CamelMap.put key[{}] value[{}]", key, value);

        if( value != null && value instanceof Clob ) {
            try {
                value = ( (Clob)value ).getSubString( 1, (int)( (Clob)value ).length() );
            } catch( SQLException e ) {
                value = "";
                e.printStackTrace();
            }

            //logger.debug("CamelMap.put CLOB key[{}] value[{}]", key, value);
        }

        return super.put( BaseUtil.toCamelCase( (String)key ), value );
    }
}
