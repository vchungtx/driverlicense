/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gplx.utils;

import com.gplx.entity.Link;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;


import java.util.List;

/**
 * Hibernate Utility class with a convenient method to get Session Factory
 * object.
 *
 * @author Nguyen Viet Chung
 */
public class DBUtils {

    public static List getLinkByValue(String value){
        Session session = HibernateUtil.getSessionFactory().openSession();
        List list = session.createCriteria(Link.class).add(Restrictions.eq("value", value)).list();
        session.close();
        return list;
    }

    public static void saveEntity(Object object){
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction transaction = session.beginTransaction();
        session.saveOrUpdate(object);
        transaction.commit();
        session.close();

    }

    public static List getAllLinks(){
        Session session = HibernateUtil.getSessionFactory().openSession();
        List list = session.createCriteria(Link.class).list();
        session.close();
        return list;
    }

}
