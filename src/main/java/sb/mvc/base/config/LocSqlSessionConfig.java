/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 3:36.
 * Last modified 19. 5. 28 오후 1:42.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.config;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
@Profile( "loc" )
@EnableTransactionManagement
public class LocSqlSessionConfig {

    @Autowired
    ConfigProperty configProperty;

    @Autowired
    private ApplicationContext applicationContext;

    //    @Bean(name="dataSource")
    //    @ConfigurationProperties(prefix="spring.datasource")
    //    public DataSource dataSource() {
    //        return DataSourceBuilder.create().build();
    //    }

    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.hikari")
    public HikariConfig hikariConfig() {
        return new HikariConfig();
    }

    @Bean
    public DataSource dataSource() {
        DataSource dataSource = new HikariDataSource(hikariConfig());
        log.info("datasource : {}", dataSource);
        return dataSource;
    }

    @Bean
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(dataSource);
        sqlSessionFactoryBean.setConfigLocation( applicationContext.getResource( configProperty.getMybatisConfigLocation() ) );
        sqlSessionFactoryBean.setMapperLocations( applicationContext.getResources( configProperty.getMybatisMapperLocation() ) );
        return sqlSessionFactoryBean.getObject();
    }

    @Bean
    public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(sqlSessionFactory);
    }

//    @Bean
//    public DataSource dataSource() throws SQLException {
//        System.out.println( "=========================> DevMariaDBSqlSessionConfig > dataSource()" );
//        SimpleDriverDataSource dataSource = new SimpleDriverDataSource();
//        dataSource.setDriverClass( org.mariadb.jdbc.Driver.class );
//        dataSource.setUsername( configProperty.getDbUser() );
//        dataSource.setUrl( configProperty.getDbUrl() );
//        dataSource.setPassword( configProperty.getDbPwd() );
//        log.info( "datasource : {}, {}, {}", configProperty.getDbUrl(), configProperty.getDbUser(), configProperty.getDbPwd() );
//        return dataSource;
//    }

//    @Bean
//    public SqlSessionFactory sqlSessionFactory() throws Exception {
//        System.out.println( "=========================> DevMariaDBSqlSessionConfig > sqlSessionFactory()" );
//        SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
//        log.info( "applicationContext.getResource(configProperty.getMybatisConfigLocation()) [{}]", applicationContext.getResource( configProperty.getMybatisConfigLocation() ) );
//        factoryBean.setConfigLocation( applicationContext.getResource( configProperty.getMybatisConfigLocation() ) );
//        factoryBean.setMapperLocations( applicationContext.getResources( configProperty.getMybatisMapperLocation() ) );
//        factoryBean.setDataSource( dataSource() );
//        return factoryBean.getObject();
//    }

//    @Bean()
//    public SqlSessionTemplate sqlSessionTemplate() throws Exception {
//        System.out.println( "=========================> sqlSessionTemplate()" );
//        return new SqlSessionTemplate( sqlSessionFactory() );
//    }

//    @Bean
//    public DataSourceTransactionManager transactionManager() throws SQLException {
//        return new DataSourceTransactionManager( dataSource() );
//    }

}
