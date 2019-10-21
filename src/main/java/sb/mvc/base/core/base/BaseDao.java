/*
 * Developed by JAEYOUNG BAE on 19. 5. 28 오후 1:41.
 * Last modified 19. 4. 24 오전 10:17.
 * Copyright (c) 2019. All rights reserved.
 */

package sb.mvc.base.core.base;

import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Map;

@Slf4j
@Repository
public abstract class BaseDao<T> extends SqlSessionDaoSupport {

    @Autowired
    private SqlSessionFactory sqlSessionFactory;

    @PostConstruct
    public void initialize() {

        setSqlSessionFactory( sqlSessionFactory );
    }

    @Override
    public void setSqlSessionFactory( SqlSessionFactory sqlSessionFactory ) {

        super.setSqlSessionFactory( sqlSessionFactory );
    }

    protected abstract String getNameSpace();

    protected abstract String getMapperId();

    protected String getStatementId( String format ) {
        log.debug( "----> sql mapper id : {}", String.format( format, this.getNameSpace(), this.getMapperId() ) );
        return String.format( format, this.getNameSpace(), this.getMapperId() );
    }

    protected String getStatementId( String format, String statementId ) {
        log.debug( "----> sql mapper id : {}", String.format( format, this.getNameSpace(), statementId ) );
        return String.format( format, this.getNameSpace(), statementId );
    }

    public int cntDataList( T param ) {

        int i = 0;

        try {
            i = getSqlSession().selectOne( this.getStatementId( "%s.cnt%sList" ), param );
        } catch( Exception e ) {
            log.error( e.getMessage(), e );
            throw new RuntimeException( String.format( "%s 데이터 조회 오류", this.getStatementId( "%s.ins%s" ) ) );
        }

        return i;

    }

    public int cntDataList( String statementId, T param ) {

        int i = 0;

        try {
            i = getSqlSession().selectOne( this.getStatementId( "%s.%s", statementId ), param );
        } catch( Exception e ) {
            log.error( e.getMessage(), e );
            throw new RuntimeException( String.format( "%s 데이터 조회 오류", this.getStatementId( "%s.ins%s" ) ) );
        }

        return i;

    }

    public <E> List<E> selDataList( T param ) {

        List<E> list = null;

        try {
            list = getSqlSession().selectList( this.getStatementId( "%s.sel%sList" ), param );
        } catch( Exception e ) {
            log.error( e.getMessage(), e );

            throw new RuntimeException( String.format( "%s 데이터 조회 오류", this.getStatementId( "%s.sel%sList" ) ) );
        }

        return list;
    }

    public <E> List<E> selDataList( String statementId, T param ) {

        List<E> list = null;

        try {
            list = getSqlSession().selectList( this.getStatementId( "%s.%s", statementId ), param );
        } catch( Exception e ) {
            log.error( e.getMessage(), e );

            throw new RuntimeException( String.format( "%s 데이터 조회 오류", this.getStatementId( "%s.%s", statementId ) ) );
        }

        return list;
    }

    public T selData( T param ) {

        T t = null;

        try {
            t = getSqlSession().selectOne( this.getStatementId( "%s.sel%s" ), param );
        } catch( Exception e ) {
            log.error( e.getMessage(), e );

            throw new RuntimeException( String.format( "%s 데이터 조회 오류", this.getStatementId( "%s.sel%s" ) ) );
        }

        return t;
    }

    public T selData( String statementId, T param ) {

        T t = null;

        try {
            t = getSqlSession().selectOne( this.getStatementId( "%s.%s", statementId ), param );
        } catch( Exception e ) {
            log.error( e.getMessage(), e );

            throw new RuntimeException( String.format( "%s 데이터 조회 오류", this.getStatementId( "%s.%s", statementId ) ) );
        }

        return t;
    }

    public Object selValue( T param ) {

        Object object = null;

        try {
            object = getSqlSession().selectOne( this.getStatementId( "%s.sel%s" ), param );
        } catch( Exception e ) {
            log.error( e.getMessage(), e );

            throw new RuntimeException( String.format( "%s 데이터 조회 오류", this.getStatementId( "%s.sel%s" ) ) );
        }

        return object;
    }

    public Object selValue( String statementId, T param ) {

        Object object = null;

        try {
            object = getSqlSession().selectOne( this.getStatementId( "%s.%s", statementId ), param );
        } catch( Exception e ) {
            log.error( e.getMessage(), e );

            throw new RuntimeException( String.format( "%s 데이터 조회 오류", this.getStatementId( "%s.%s", statementId ) ) );
        }

        return object;
    }

    public int insData( T param ) {

        int i = 0;

        try {
            if( param instanceof Map ) {
                log.debug( "BaseDao.insData param [{}]", param );
            }

            i = getSqlSession().insert( this.getStatementId( "%s.ins%s" ), param );
        } catch( Exception e ) {
            log.error( e.getMessage(), e );

            throw new RuntimeException( String.format( "%s 데이터 등록 오류", this.getStatementId( "%s.ins%s" ) ) );
        }

        return i;
    }

    public int insData( String statementId, T param ) {

        int i = 0;

        try {
            if( param instanceof Map ) {
                log.debug( "BaseDao.insData statementId [{}] param [{}]", statementId, param );
            }

            i = getSqlSession().insert( this.getStatementId( "%s.%s", statementId ), param );
        } catch( Exception e ) {
            log.error( e.getMessage(), e );

            throw new RuntimeException( String.format( "%s 데이터 등록 오류", this.getStatementId( "%s.%s", statementId ) ) );
        }

        return i;
    }

    public int updData( T param ) {

        int i = 0;

        try {
            if( param instanceof Map ) {
                log.debug( "BaseDao.updData param [{}]", param );
            }

            i = getSqlSession().update( this.getStatementId( "%s.upd%s" ), param );
        } catch( Exception e ) {
            log.error( e.getMessage(), e );

            throw new RuntimeException( String.format( "%s 데이터 수정 오류", this.getStatementId( "%s.upd%s" ) ) );
        }

        return i;
    }

    public int updData( String statementId, T param ) {

        int i = 0;

        try {
            if( param instanceof Map ) {
                log.debug( "BaseDao.updData statementId [{}] param [{}]", statementId, param );
            }

            i = getSqlSession().update( this.getStatementId( "%s.%s", statementId ), param );
        } catch( Exception e ) {
            log.error( e.getMessage(), e );

            throw new RuntimeException( String.format( "%s 데이터 수정 오류", this.getStatementId( "%s.%s", statementId ) ) );
        }

        return i;
    }

    public int delData( T param ) {

        int i = 0;

        try {
            i = getSqlSession().delete( this.getStatementId( "%s.del%s" ), param );
        } catch( Exception e ) {
            log.error( e.getMessage(), e );

            throw new RuntimeException( String.format( "%s 데이터 삭제 오류", this.getStatementId( "%s.del%s" ) ) );
        }

        return i;
    }

    public int delData( String statementId, T param ) {

        int i = 0;

        try {
            i = getSqlSession().delete( this.getStatementId( "%s.%s", statementId ), param );
        } catch( Exception e ) {
            log.error( e.getMessage(), e );

            throw new RuntimeException( String.format( "%s 데이터 삭제 오류", this.getStatementId( "%s.%s", statementId ) ) );
        }

        return i;
    }
}
