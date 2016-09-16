package net.darthgeek.yggdrasil.data.dao;

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
public abstract class AbstractDaoImpl<T, K extends Serializable> implements AbstractDao<T, K> {
  /** Hibernate session factory. */
  @Resource
  private SessionFactory sessionFactory;

  @SuppressWarnings("unchecked")
  @Override
  public K create(final T entity) {
    return (K) getSession().save(entity);
  }

  @Override
  public Criteria createCriteria() {
    return getSession().createCriteria(getEntityClass());
  }

  @Override
  public void delete(final K key) {
    final T entity = get(key);
    if (null == entity) {
      throw new EntityNotFoundException("no such " + getEntityClass().getSimpleName()
            + " with primary key " + key);
    }
    getSession().delete(entity);
  }

  @SuppressWarnings("unchecked")
  @Override
  public T get(final K key) {
    return (T) getSession().get(getEntityClass(), key);
  }

  @SuppressWarnings("unchecked")
  @Override
  public List<T> getAll() {
    final Session session = getSession();

    return session.createCriteria(getEntityClass())
          .setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY)
          .list();
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