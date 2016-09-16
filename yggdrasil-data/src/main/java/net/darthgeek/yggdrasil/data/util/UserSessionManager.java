package net.darthgeek.yggdrasil.data.util;

import net.darthgeek.yggdrasil.data.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by jason on 9/16/16.
 */
@Component
public class UserSessionManager {
  private static final Logger LOG = LoggerFactory.getLogger(UserSessionManager.class);

  private final Map<User, HttpSession> sessionMap = new ConcurrentHashMap<>();

  /**
   * Registers a user HTTP session.  This invalidates any existing session for that user.
   *
   * @param user authenticated user
   * @param session HTTP session
   */
  public void register(final User user, final HttpSession session) {
    final HttpSession oldSession = sessionMap.remove(user);
    if (null != oldSession) {
      try {
        oldSession.invalidate();
      } catch (IllegalStateException ise) {
        LOG.info("old session for " + user + " is already invalid");
      }
    }
    sessionMap.put(user, session);
  }

  /**
   * Unregisters a user HTTP session.
   *
   * @param user
   */
  public void unregister(final User user) {
    sessionMap.remove(user);
  }

  /**
   * Retrieves the HTTP session for a user if they are currently logged in.
   *
   * @param user user
   * @return HTTP session or null if user not currently logged in
   */
  public HttpSession getSession(final User user) {
    return sessionMap.get(user);
  }

  /**
   * Returns a list of currently logged in users.
   *
   * @return list of users
   */
  public List<User> getOnlineUsers() {
    return new ArrayList<>(sessionMap.keySet());
  }
}
