/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 19 오후 1:54.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.core.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class KeyGenerate {
    protected static final Logger logger = LoggerFactory.getLogger( KeyGenerate.class );

    public static String userAuthCodeMake() {
        //        KsidDateLib.GetLocalDateTime();
        String gAuthCode = StringLib.getRandomNumberString( 8 );

        logger.debug( "KsidDateLib.GetLocalDateTime() [{}]", DateLib.getLocalDateTime() );
        logger.debug( "KsidStringLib.GetRandomNumberString() [{}]", gAuthCode );

        return ( gAuthCode );
    }

    public static String tidMake() {
        int  iday = 0;
        long dateTime;

        iday = Integer.parseInt( DateLib.getLocalDay() );
        dateTime = Long.parseLong( DateLib.getLocalDateTimeTid() );

        logger.debug( "TidMake hex [{}]", Long.toHexString( dateTime + iday ).toUpperCase() );

        return ( Long.toHexString( dateTime + iday ).toUpperCase() );
    }


    public static String deviceAuthCodeMake() {
        //        KsidDateLib.GetLocalDateTime();
        String gAuthCode = StringLib.getRandomNumberString( 6 );

        logger.debug( "DeviceAuthCodeMake GetLocalDateTime() [{}]", DateLib.getLocalDateTime() );
        logger.debug( "DeviceAuthCodeMake() [{}]", gAuthCode );

        return ( gAuthCode );
    }
}
