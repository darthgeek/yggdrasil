package net.darthgeek.yggdrasil.data.dao;

import net.darthgeek.yggdrasil.data.model.User;

import javax.persistence.EntityNotFoundException;
import java.util.Date;

/**
 * Data access object for users.
 *
 * @author jason
 */
public interface UserDao extends AbstractDao<User, Long> {
  /**
   * Deletes unverified user accounts created before a certain time.
   *
   * @param expirationTime creation time threshold for unverified users
   * @return number of users accounts deleted
   */
  int deleteUnverifiedCreatedBefore(Date expirationTime);

  /**
   * Finds a user by e-mail address.
   *
   * @param email
   * @return user
   * @throws EntityNotFoundException if no such user is found
   */
  User findByEmail(String email);

  /**
   * Finds a user by username.
   *
   * @param username
   * @return user
   * @throws EntityNotFoundException if no such user is found
   */
  User findByName(String username);

  /**
   * Finds a user by external authorization ID.
   *
   * @param provider string identifying external authentication provider
   * @param key user's unique ID with external authentication provider
   * @return null if user not found
   */
  User findByExternalId(String provider, String key);
}
