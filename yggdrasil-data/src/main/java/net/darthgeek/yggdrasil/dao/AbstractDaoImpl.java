package net.darthgeek.yggdrasil.dao;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import javax.annotation.Resource;
import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.io.Serializable;
import java.util.List;

/**
 * Base implementation for abstract base data access objects.
 *
 * @author jason
 */
@Transactional
public abstract class AbstractDaoImpl<T, PK extends Serializable> implements AbstractDao<T, PK> {
  /** Hibernate session factory. */
  @Resource
  private SessionFactory sessionFactory;

  @SuppressWarnings("unchecked")
  @Override
  public PK create(final T entity) {
    return (PK) getSession().save(entity);
  }

  @Override
  public Criteria createCriteria() {
    return getSession().createCriteria(getEntityClass());
  }

  @Override
  public void delete(final PK key) {
    final T entity = get(key);
    if (null == entity) {
      throw new EntityNotFoundException("no such " + getEntityClass().getSimpleName()
            + " with primary key " + key);
    }
    getSession().delete(entity);
  }

  @SuppressWarnings("unchecked")
  @Override
  public T get(final PK key) {
    return (T) getSession().get(getEntityClass(), key);
  }

  @SuppressWarnings("unchecked")
  @Override
  public List<T> getAll() {
    final Session session = getSession();

    return session.createCriteria(getEntityClass()).list();
  }

  abstract protected Class<T> getEntityClass();

  /**
   * Gets the current hibernate session.
   *
   * @return session
   */
  protected Session getSession() {
    return sessionFactory.getCurrentSession();
  }

  @Override
  public void update(final T entity) {
    getSession().update(entity);
  }
}