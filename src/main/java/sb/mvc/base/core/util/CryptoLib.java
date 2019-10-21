/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 19 오후 1:54.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.core.util;

import org.apache.commons.codec.binary.Base64;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class CryptoLib {

    // Base64 Encode
    public static String base64EncoderConv( String encStr ) {

        return Base64.encodeBase64String( encStr.getBytes() );
    }


    // Base64 Decode
    public static String base64DecoderConv( String decStr ) {

        return new String( Base64.decodeBase64( decStr ) );
    }

    public static String sha256GetEncrypt( String source, byte[] salt ) {

        String result = "";

        try {
            byte[] a     = source.getBytes();
            byte[] bytes = new byte[a.length + salt.length];

            System.arraycopy( salt, 0, bytes, a.length, salt.length );

            MessageDigest md = MessageDigest.getInstance( "SHA-256" );
            md.update( bytes );

            byte[] byteData = md.digest();

            StringBuffer sb = new StringBuffer();
            for( int i = 0; i < byteData.length; ++i ) {
                sb.append( Integer.toString( ( byteData[i] & 0xFF ) + 256, 16 ).substring( 1 ) );
            }

            result = sb.toString();
        } catch( NoSuchAlgorithmException e ) {
            e.printStackTrace();
        }
        return ( result );
    }

    // SHA-256 Salt Convert
    public static String sha256Convert( String orgData, String shaPasswd ) {

        byte[] saltBytes = new byte[8];

        saltBytes = orgData.getBytes();

        StringBuffer salt = new StringBuffer();
        for( int i = 0; i < saltBytes.length; i++ ) {
            salt.append( String.format( "%02x", saltBytes[i] ) );
        }
        String encrypt = sha256GetEncrypt( shaPasswd, saltBytes );
        return ( encrypt );
    }
}
