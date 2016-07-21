package net.darthgeek.yggdrasil.dao;

import java.io.Serializable;
import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Criteria;

/**
 * Implementations of this interface provide base data access operations for an
 * entity type.
 *
 * @author jason
 * @param <T>
 *          entity type
 * @param <K>
 *          primary key type
 */
@Transactional
public interface AbstractDao<T, K extends Serializable> {
  /**
   * Creates a new persistent object.
   *
   * @param entity
   *          values to use in creating entity
   * @return entity object with any modifications made by the persistence layer
   */
  K create(T entity);

  /**
   * Creates search criteria for the entity type of this DAO.
   *
   * @return search criteria
   */
  Criteria createCriteria();

  /**
   * Deletes an entity.
   *
   * @param key
   *          primary key for entity
   */
  void delete(K key);

  /**
   * Retrieves an entity.
   *
   * @param key
   *          primary key for entity
   * @return entity object
   */
  T get(K key);

  /**
   * Gets all entity objects of this type.
   *
   * @return list of entity objects
   */
  List<T> getAll();

  /**
   * Updates an entity object.
   *
   * @param entity
   *          entity to save
   */
  void update(T entity);
}