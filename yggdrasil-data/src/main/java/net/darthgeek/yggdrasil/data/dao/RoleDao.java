package net.darthgeek.yggdrasil.data.dao;

import net.darthgeek.yggdrasil.data.model.Role;

import javax.persistence.EntityNotFoundException;

/**
 * Data access object for roles.
 *
 * @author jason
 */
public interface RoleDao extends AbstractDao<Role, Long> {
  /**
   * Finds a role by name.
   *
   * @param name
   * @return role
   * @throws EntityNotFoundException if no such user is found
   */
  Role findByName(String name);
}
