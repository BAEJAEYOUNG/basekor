/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 19 오후 1:54.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.core.util;

import org.apache.commons.validator.routines.DateValidator;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.SimpleTimeZone;

public class DateLib {
    public final static String DATE_FORMAT_GUBUN = "/";
    public final static String TIME_FORMAT_GUBUN = ":";


    public static boolean dateCheck( String dt ) {
        return DateValidator.getInstance().isValid( dt, "yyyyMMddHHmmss" );
    }

    public static boolean dateCheck( String dt, int chkLength ) {
        if( chkLength == 8 ) return DateValidator.getInstance().isValid( dt, "yyyyMMdd" );
        else if( chkLength == 6 ) return DateValidator.getInstance().isValid( dt, "yyyyMM" );
        else if( chkLength == 10 ) return DateValidator.getInstance().isValid( dt, "yyyyMMddHH" );
        else if( chkLength == 12 ) return DateValidator.getInstance().isValid( dt, "yyyyMMddHHmm" );
        else return DateValidator.getInstance().isValid( dt, "yyyyMMddHHmmss" );
    }

    public static boolean dateCheck( String dt, String errMsg ) {
        try {
            SimpleDateFormat format = new SimpleDateFormat( "yyyyMMddHHmmss" );
            format.setLenient( false );
            format.parse( dt );
        } catch( ParseException e ) {
            errMsg = e.getMessage();
            return false;
        } catch( IllegalArgumentException e ) {
            errMsg = e.getMessage();
            return false;
        }

        return true;
    }

    public static String getLocalDay() {
        Calendar now     = Calendar.getInstance();
        String   strDate = null;
        int      dd;

        dd = now.get( Calendar.DAY_OF_MONTH );

        //       if( dd < 10 ) strDate += "0";
        strDate = Integer.toString( dd );

        return strDate;
    }

    public static String getLocalDate() {
        Calendar now     = Calendar.getInstance();
        String   strDate = null;
        int      yy, mm, dd;

        yy = now.get( Calendar.YEAR );
        mm = now.get( Calendar.MONTH ) + 1;
        dd = now.get( Calendar.DAY_OF_MONTH );

        strDate = Integer.toString( yy );
        if( mm < 10 ) strDate += "0";
        strDate += Integer.toString( mm );
        if( dd < 10 ) strDate += "0";
        strDate += Integer.toString( dd );

        return strDate;
    }

    public static String getLocalDateText() {
        Calendar now     = Calendar.getInstance();
        String   strDate = null;
        int      yy, mm, dd;

        yy = now.get( Calendar.YEAR );
        mm = now.get( Calendar.MONTH ) + 1;
        dd = now.get( Calendar.DAY_OF_MONTH );

        strDate = yy + DATE_FORMAT_GUBUN;
        if( mm < 10 ) strDate += "0";
        strDate = strDate + mm + DATE_FORMAT_GUBUN;
        if( dd < 10 ) strDate += "0";
        strDate = strDate + dd;

        return strDate;
    }

    public static String getLocalDateText( String strSep ) {
        Calendar now     = Calendar.getInstance();
        String   strDate = null;
        int      yy, mm, dd;

        yy = now.get( Calendar.YEAR );
        mm = now.get( Calendar.MONTH ) + 1;
        dd = now.get( Calendar.DAY_OF_MONTH );

        strDate = yy + strSep;
        if( mm < 10 ) strDate += "0";
        strDate = strDate + mm + strSep;
        if( dd < 10 ) strDate += "0";
        strDate = strDate + dd;

        return strDate;
    }

    public static String getLocalTime() {
        Calendar now     = Calendar.getInstance();
        String   strTime = null;
        int      hh, mi, ss;

        hh = now.get( Calendar.HOUR_OF_DAY );
        mi = now.get( Calendar.MINUTE );
        ss = now.get( Calendar.SECOND );

        if( hh < 10 ) strTime = "0" + hh;
        else strTime = Integer.toString( hh );
        if( mi < 10 ) strTime += "0";
        strTime += Integer.toString( mi );
        if( ss < 10 ) strTime += "0";
        strTime += Integer.toString( ss );

        return strTime;
    }


    public static String getLocalTimeTid() {
        Calendar now     = Calendar.getInstance();
        String   strTime = null;
        int      hh, mi, ss;
        long     sum, ms;

        hh = now.get( Calendar.HOUR_OF_DAY );
        mi = now.get( Calendar.MINUTE );
        ss = now.get( Calendar.SECOND );
        ms = now.get( Calendar.MILLISECOND );

        if( hh < 10 ) strTime = "0" + hh;
        else strTime = Integer.toString( hh );
        if( mi < 10 ) strTime += "0";
        strTime += Integer.toString( mi );
        if( ss < 10 ) strTime += "0";
        sum = ss + ( ms / 10 );
        strTime += Long.toString( sum );

        return strTime;
    }


    public static String getLocalTimeText() {
        Calendar now     = Calendar.getInstance();
        String   strTime = null;
        int      hh, mi, ss;

        hh = now.get( Calendar.HOUR_OF_DAY );
        mi = now.get( Calendar.MINUTE );
        ss = now.get( Calendar.SECOND );

        if( hh < 10 ) strTime = "0" + hh + TIME_FORMAT_GUBUN;
        else strTime = hh + TIME_FORMAT_GUBUN;
        if( mi < 10 ) strTime += "0";
        strTime = strTime + mi + TIME_FORMAT_GUBUN;
        if( ss < 10 ) strTime += "0";
        strTime = strTime + ss;

        return strTime;
    }


    public static String getLocalTimeText( String strSep ) {
        Calendar now     = Calendar.getInstance();
        String   strTime = null;
        int      hh, mi, ss;

        hh = now.get( Calendar.HOUR_OF_DAY );
        mi = now.get( Calendar.MINUTE );
        ss = now.get( Calendar.SECOND );

        if( hh < 10 ) strTime = "0" + hh + strSep;
        else strTime = hh + strSep;
        if( mi < 10 ) strTime += "0";
        strTime = strTime + mi + strSep;
        if( ss < 10 ) strTime += "0";
        strTime = strTime + ss;

        return strTime;
    }

    public static String getLocalDateTime() {
        String strDate = null;
        String strTime = null;

        strDate = getLocalDate();
        strTime = getLocalTime();

        return strDate + strTime;
    }

    public static String getLocalDateTimeTid() {
        String strDate = null;
        String strTime = null;

        strDate = getLocalDate();
        strTime = getLocalTimeTid();

        return strDate + strTime;
    }


    public static String getLocalDateTimeText() {
        String strDate = null;
        String strTime = null;

        strDate = getLocalDateText();
        strTime = getLocalTimeText();

        return strDate + " " + strTime;
    }

    public static String getLocalDateTimeText( String strSep ) {
        String strDate = null;
        String strTime = null;

        strDate = getLocalDateText( strSep );
        strTime = getLocalTimeText( strSep );

        return strDate + " " + strTime;
    }

    public static String getGMTDate() {
        Calendar now     = Calendar.getInstance( new SimpleTimeZone( 0, "GMT" ) );
        String   strDate = null;
        int      yy, mm, dd;

        yy = now.get( Calendar.YEAR );
        mm = now.get( Calendar.MONTH ) + 1;
        dd = now.get( Calendar.DAY_OF_MONTH );

        strDate = Integer.toString( yy );
        if( mm < 10 ) strDate += "0";
        strDate += Integer.toString( mm );
        if( dd < 10 ) strDate += "0";
        strDate += Integer.toString( dd );

        return strDate;
    }

    public static String getGMTDateText() {
        Calendar now     = Calendar.getInstance( new SimpleTimeZone( 0, "GMT" ) );
        String   strDate = null;
        int      yy, mm, dd;

        yy = now.get( Calendar.YEAR );
        mm = now.get( Calendar.MONTH ) + 1;
        dd = now.get( Calendar.DAY_OF_MONTH );

        strDate = yy + DATE_FORMAT_GUBUN;
        if( mm < 10 ) strDate += "0";
        strDate = strDate + mm + DATE_FORMAT_GUBUN;
        if( dd < 10 ) strDate += "0";
        strDate = strDate + dd;

        return strDate;
    }

    public static String getGMTDateText( String strSep ) {
        Calendar now     = Calendar.getInstance( new SimpleTimeZone( 0, "GMT" ) );
        String   strDate = null;
        int      yy, mm, dd;

        yy = now.get( Calendar.YEAR );
        mm = now.get( Calendar.MONTH ) + 1;
        dd = now.get( Calendar.DAY_OF_MONTH );

        strDate = yy + strSep;
        if( mm < 10 ) strDate += "0";
        strDate = strDate + mm + strSep;
        if( dd < 10 ) strDate += "0";
        strDate = strDate + dd;

        return strDate;
    }

    public static String getGMTTime() {
        Calendar now     = Calendar.getInstance( new SimpleTimeZone( 0, "GMT" ) );
        String   strTime = null;
        int      hh, mi, ss;

        hh = now.get( Calendar.HOUR_OF_DAY );
        mi = now.get( Calendar.MINUTE );
        ss = now.get( Calendar.SECOND );

        if( hh < 10 ) strTime = "0" + hh;
        else strTime = Integer.toString( hh );
        if( mi < 10 ) strTime += "0";
        strTime += Integer.toString( mi );
        if( ss < 10 ) strTime += "0";
        strTime += Integer.toString( ss );

        return strTime;
    }

    public static String getGMTTimeText() {
        Calendar now     = Calendar.getInstance( new SimpleTimeZone( 0, "GMT" ) );
        String   strTime = null;
        int      hh, mi, ss;

        hh = now.get( Calendar.HOUR_OF_DAY );
        mi = now.get( Calendar.MINUTE );
        ss = now.get( Calendar.SECOND );

        if( hh < 10 ) strTime = "0" + hh + TIME_FORMAT_GUBUN;
        else strTime = hh + TIME_FORMAT_GUBUN;
        if( mi < 10 ) strTime += "0";
        strTime = strTime + mi + TIME_FORMAT_GUBUN;
        if( ss < 10 ) strTime += "0";
        strTime = strTime + ss;

        return strTime;
    }

    public static String getGMTTimeText( String strSep ) {
        Calendar now     = Calendar.getInstance( new SimpleTimeZone( 0, "GMT" ) );
        String   strTime = null;
        int      hh, mi, ss;

        hh = now.get( Calendar.HOUR_OF_DAY );
        mi = now.get( Calendar.MINUTE );
        ss = now.get( Calendar.SECOND );

        if( hh < 10 ) strTime = "0" + hh + strSep;
        else strTime = hh + strSep;
        if( mi < 10 ) strTime += "0";
        strTime = strTime + mi + strSep;
        if( ss < 10 ) strTime += "0";
        strTime = strTime + ss;

        return strTime;
    }

    public static String getGMTDateTime() {
        String strDate = null;
        String strTime = null;

        strDate = getGMTDate();
        strTime = getGMTTime();

        return strDate + strTime;
    }

    public static String getGMTDateTimeText() {
        String strDate = null;
        String strTime = null;

        strDate = getGMTDateText();
        strTime = getGMTTimeText();

        return strDate + " " + strTime;
    }

    public static String getGMTDateTimeText( String strSep ) {
        String strDate = null;
        String strTime = null;

        strDate = getGMTDateText( strSep );
        strTime = getGMTTimeText( strSep );

        return strDate + " " + strTime;
    }

    public static int getDateTimeBetweenToSec( String strDate1, String strDate2 ) {
        Date             date1 = null;
        Date             date2 = null;
        SimpleDateFormat fmt   = new SimpleDateFormat();

        try {
            fmt.applyPattern( "yyyyMMddHHmmss" );
            date1 = fmt.parse( strDate1 );
            date2 = fmt.parse( strDate2 );
        } catch( Exception e ) {
            return -1;
        }

        Calendar c1 = Calendar.getInstance();
        Calendar c2 = Calendar.getInstance();

        c1.setTime( date1 );
        c2.setTime( date2 );

        long mSec = c1.getTimeInMillis() - c2.getTimeInMillis();

        return (int)( mSec / 1000 );
    }

    public static String addDaysToDateString( String strDate, int nDay ) {
        Date             date1      = null;
        SimpleDateFormat fmt        = new SimpleDateFormat();
        String           strNewDate = null;

        try {
            fmt.applyPattern( "yyyyMMdd" );
            date1 = fmt.parse( strDate );
        } catch( Exception e ) {
            return strDate;
        }

        Calendar c1 = Calendar.getInstance();
        c1.setTime( date1 );
        c1.add( Calendar.DATE, nDay );
        strNewDate = c1.get( Calendar.YEAR ) + StringLib.zeroPaddingLeft( c1.get( Calendar.MONTH ) + 1, 2 ) + StringLib.zeroPaddingLeft( c1.get( Calendar.DATE ), 2 );

        return strNewDate;
    }


    public static String addMonthsToDateString( String strMonth, int nMonth ) {
        Date             date1      = null;
        SimpleDateFormat fmt        = new SimpleDateFormat();
        String           strNewDate = null;

        try {
            fmt.applyPattern( "yyyyMMdd" );
            date1 = fmt.parse( strMonth );
        } catch( Exception e ) {
            return strMonth;
        }

        Calendar c1 = Calendar.getInstance();
        c1.setTime( date1 );
        c1.add( Calendar.MONTH, nMonth );
        strNewDate = c1.get( Calendar.YEAR ) + StringLib.zeroPaddingLeft( c1.get( Calendar.MONTH ) + 1, 2 );

        return strNewDate;
    }


    public static String getAddSecDateTime( String strDateTime, int nSec ) {
        Date             date1          = null;
        SimpleDateFormat fmt            = new SimpleDateFormat();
        String           strNewDateTime = null;
        Calendar         c1             = Calendar.getInstance();

        if( strDateTime != null ) {
            try {
                fmt.applyPattern( "yyyyMMddHHmmss" );
                date1 = fmt.parse( strDateTime );
            } catch( Exception e ) {
                return strDateTime;
            }
            c1.setTime( date1 );
        }

        c1.add( Calendar.SECOND, nSec );
        strNewDateTime = c1.get( Calendar.YEAR ) + StringLib.zeroPaddingLeft( c1.get( Calendar.MONTH ) + 1, 2 ) + StringLib.zeroPaddingLeft( c1.get( Calendar.DATE ), 2 ) + StringLib.zeroPaddingLeft( c1.get( Calendar.HOUR_OF_DAY ), 2 ) + StringLib.zeroPaddingLeft( c1.get( Calendar.MINUTE ), 2 ) + StringLib.zeroPaddingLeft( c1.get( Calendar.SECOND ), 2 );

        return strNewDateTime;
    }

    public static String getDateTimeText( String strDateTime ) {
        String strTxt = null;

        if( strDateTime == null || strDateTime.length() == 0 ) return "";

        strTxt = strDateTime.substring( 0, 4 );
        strTxt += "-";
        strTxt += strDateTime.substring( 4, 6 );
        strTxt += "-";
        strTxt += strDateTime.substring( 6, 8 );

        if( strDateTime.length() == 8 ) return strTxt;

        strTxt += " ";
        strTxt += strDateTime.substring( 8, 10 );
        strTxt += ":";
        strTxt += strDateTime.substring( 10, 12 );
        strTxt += ":";
        strTxt += strDateTime.substring( 12, 14 );

        return strTxt;
    }


    public static String getDateYYYYMMDDText( String strDateTime ) {
        String strTxt = null;

        if( strDateTime == null || strDateTime.length() == 0 ) return "";

        strTxt = strDateTime.substring( 0, 4 );
        strTxt += "-";
        strTxt += strDateTime.substring( 4, 6 );
        strTxt += "-";
        strTxt += strDateTime.substring( 6, 8 );

        return strTxt;
    }


    public static String getMonthLastDay( String strMonth ) {
        Date             date1      = null;
        SimpleDateFormat fmt        = new SimpleDateFormat();
        String           strNewDate = null;

        try {
            if( strMonth.length() == 6 ) fmt.applyPattern( "yyyyMM" );
            else if( strMonth.length() == 8 ) fmt.applyPattern( "yyyyMMdd" );
            date1 = fmt.parse( strMonth );
        } catch( Exception e ) {
            if( strMonth.length() == 6 ) return strMonth + "01";
            else return strMonth;
        }

        Calendar c1 = Calendar.getInstance();
        c1.setTime( date1 );
        int dayofMonth = c1.getActualMaximum( Calendar.DAY_OF_MONTH );
        strNewDate = c1.get( Calendar.YEAR ) + StringLib.zeroPaddingLeft( c1.get( Calendar.MONTH ) + 1, 2 ) + StringLib.zeroPaddingLeft( dayofMonth, 2 );

        return strNewDate;
    }

    public static Date changeStringToDate( String dateInput ) {
        Date       resultDate = null;
        String     dateFormat = "yyyyMMdd";
        DateFormat df         = new SimpleDateFormat( dateFormat );
        try {
            resultDate = df.parse( dateInput );
        } catch( ParseException e ) {
            e.printStackTrace();
        }
        return resultDate;
    }

    public static int getDifferenceOfDate( String startDate, String endDate ) {
        Calendar cal         = Calendar.getInstance();
        int      nYear1      = 0, nMonth1 = 0, nDate1 = 0;
        int      nYear2      = 0, nMonth2 = 0, nDate2 = 0;
        int      nTotalDate1 = 0, nTotalDate2 = 0, nDiffOfYear = 0, nDiffOfDay = 0;

        nYear1 = Integer.parseInt( startDate.substring( 0, 4 ) );
        nMonth1 = Integer.parseInt( startDate.substring( 4, 6 ) );
        nDate1 = Integer.parseInt( startDate.substring( 6, 8 ) );

        nYear2 = Integer.parseInt( endDate.substring( 0, 4 ) );
        nMonth2 = Integer.parseInt( endDate.substring( 4, 6 ) );
        nDate2 = Integer.parseInt( endDate.substring( 6, 8 ) );

        if( nYear1 > nYear2 ) {
            for( int i = nYear2; i < nYear1; i++ ) {
                cal.set( i, 12, 0 );
                nDiffOfYear += cal.get( Calendar.DAY_OF_YEAR );
            }
            nTotalDate1 += nDiffOfYear;
        } else if( nYear1 < nYear2 ) {
            for( int i = nYear1; i < nYear2; i++ ) {
                cal.set( i, 12, 0 );
                nDiffOfYear += cal.get( Calendar.DAY_OF_YEAR );
            }
            nTotalDate2 += nDiffOfYear;
        }
        cal.set( nYear1, nMonth1 - 1, nDate1 );
        nDiffOfDay = cal.get( Calendar.DAY_OF_YEAR );
        nTotalDate1 += nDiffOfDay;
        cal.set( nYear2, nMonth2 - 1, nDate2 );
        nDiffOfDay = cal.get( Calendar.DAY_OF_YEAR );
        nTotalDate2 += nDiffOfDay;

        return nTotalDate1 - nTotalDate2;
    }

    public static Date getDateStringToDateConv( String strDate, String dateFmt ) throws ParseException {
        SimpleDateFormat format  = new SimpleDateFormat( dateFmt.trim() );
        Date             rstDate = format.parse( strDate.trim() );

        return ( rstDate );
    }

}
