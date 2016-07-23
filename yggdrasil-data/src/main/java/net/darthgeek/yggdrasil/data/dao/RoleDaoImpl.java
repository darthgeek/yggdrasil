package net.darthgeek.yggdrasil.data.dao;

import net.darthgeek.yggdrasil.data.model.Role;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

/**
 * Data access object implementation for roles.
 *
 * @author jason
 */
@Repository("roleDao")
public class RoleDaoImpl extends AbstractDaoImpl<Role, Long> implements RoleDao {
  /** Class logger. */
  private static final Logger log = LoggerFactory.getLogger(RoleDaoImpl.class);

  @Override
  public Role findByName(final String name) {
    final Session session = getSession();

    @SuppressWarnings("unchecked")
    final List<Role> results =
          session.createCriteria(getEntityClass())
                .add(Restrictions.eq("name", name))
                .list();

    if (results.size() == 0) {
      throw new EntityNotFoundException("role " + name + " not found");
    } else {
      return results.get(0);
    }
  }

  @Override
  protected Class<Role> getEntityClass() {
    return Role.class;
  }
}
