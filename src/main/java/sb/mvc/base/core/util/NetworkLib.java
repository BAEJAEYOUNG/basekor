/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 19 오후 1:54.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.core.util;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

public class NetworkLib {

    // IP & Hostname Get
    public static String ipAndHostnameGet() throws UnknownHostException {
        String      ipString = "";
        InetAddress ip;

        ip = InetAddress.getLocalHost();
        ipString = ip.toString();

        return ( ipString );
    }

    public static String getHostIpAddr() {
        String      ipString = "";
        InetAddress Address  = null;
        try {
            Address = InetAddress.getLocalHost();
        } catch( UnknownHostException e ) {
            e.printStackTrace();
        }
        ipString = Address.getHostAddress();
        return ipString;
    }


    //jiyun : Get Host IpAddress
    public static String getHostIpAddrFromNet() {

        String hostAddr = "";

        try {
            Enumeration<NetworkInterface> niEnum = NetworkInterface.getNetworkInterfaces();
            while( niEnum.hasMoreElements() ) {
                NetworkInterface         ni       = niEnum.nextElement();
                Enumeration<InetAddress> addrEnum = ni.getInetAddresses();
                while( addrEnum.hasMoreElements() ) {
                    InetAddress inetAddress = addrEnum.nextElement();
                    if( !inetAddress.isLoopbackAddress() && !inetAddress.isLinkLocalAddress() && inetAddress.isSiteLocalAddress() ) {
                        hostAddr = inetAddress.getHostAddress();
                        break;
                    }
                }
            }
        } catch( SocketException e ) {
            e.printStackTrace();
        }

        return hostAddr;
    }

    //jiyun : Get Host IpAddress
    public static List<String> getHostIpAddrListFromNet() {

        List<String> hostAddrList = new ArrayList<String>();
        try {
            Enumeration<NetworkInterface> niEnum = NetworkInterface.getNetworkInterfaces();
            while( niEnum.hasMoreElements() ) {
                NetworkInterface         ni       = niEnum.nextElement();
                Enumeration<InetAddress> addrEnum = ni.getInetAddresses();
                while( addrEnum.hasMoreElements() ) {
                    InetAddress inetAddress = addrEnum.nextElement();
                    if( !inetAddress.isLoopbackAddress() && !inetAddress.isLinkLocalAddress() && inetAddress.isSiteLocalAddress() ) {
                        String hostAddr = inetAddress.getHostAddress();
                        hostAddrList.add( hostAddr );
                    }
                }
            }
        } catch( SocketException e ) {
            e.printStackTrace();
        }

        return hostAddrList;
    }

}
