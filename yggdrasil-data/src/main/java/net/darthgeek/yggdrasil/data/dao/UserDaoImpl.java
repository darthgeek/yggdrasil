package net.darthgeek.yggdrasil.data.dao;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import net.darthgeek.yggdrasil.data.model.User;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityNotFoundException;
import java.util.Date;
import java.util.List;

/**
 * Data access object implementation for users.
 *
 * @author jason
 */
@Repository("userDao")
public class UserDaoImpl extends AbstractDaoImpl<User, Long> implements UserDao, UserDetailsService {
  /** Class logger. */
  private static final Logger log = LoggerFactory.getLogger(UserDaoImpl.class);

  @SuppressWarnings("unchecked")
  @Override
  public int deleteUnverifiedCreatedBefore(final Date expirationTime) {
    final List<User> users = getSession().createCriteria(getEntityClass())
          .add(Restrictions.eq("emailVerified", false))
          .add(Restrictions.lt("createdTime", expirationTime))
          .list();

    if (users.size() == 0) {
      log.debug("no unverified users");
    }
    for (User user : users) {
      log.info(String.format("deleting unverified account %s [email=%s]", user.getUsername(),
            user.getEmail()));
      delete(user.getId());
    }
    return users.size();
  }

  @Override
  public User findByEmail(final String email) {
    final Session session = getSession();

    @SuppressWarnings("unchecked")
    final List<User> results =
          session.createCriteria(getEntityClass())
                .add(Restrictions.eq("email", email))
                .list();

    if (results.size() == 0) {
      throw new EntityNotFoundException("e-mail address " + email + " not found");
    } else {
      return results.get(0);
    }
  }

  @Override
  public User findByName(final String username) {
    final Session session = getSession();

    @SuppressWarnings("unchecked")
    final List<User> results =
          session.createCriteria(getEntityClass())
                .add(Restrictions.eq("username", username))
                .list();

    if (results.size() == 0) {
      throw new EntityNotFoundException("username " + username + " not found");
    } else {
      return results.get(0);
    }
  }

  @Override
  protected Class<User> getEntityClass() {
    return User.class;
  }

  @Override
  @SuppressFBWarnings(value = "RV_RETURN_VALUE_IGNORED_NO_SIDE_EFFECT",
        justification = "Walk user authority relationships to force load of permissions for spring-security")
  public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
    final Session session = getSession();

    @SuppressWarnings("unchecked")
    final List<User> results =
          session.createCriteria(getEntityClass())
                .add(Restrictions.eq("username", username))
                .list();

    if (results.size() == 0) {
      throw new UsernameNotFoundException("username " + username + " not found");
    } else {
      final User user = results.get(0);
      user.getAuthorities();
      return user;
    }
  }
}