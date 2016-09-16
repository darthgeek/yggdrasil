package net.darthgeek.yggdrasil.mvc.api;

import net.darthgeek.yggdrasil.data.dao.UserDao;
import net.darthgeek.yggdrasil.data.model.User;
import net.darthgeek.yggdrasil.mvc.api.dto.UserDto;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by jason on 9/15/16.
 */
@Controller("userResource")
@RequestMapping("/api/user")
@PreAuthorize("isAuthenticated()")
@Transactional
public class UserResource {
  @Resource
  private UserDao userDao;

  /**
   * Lists all users that the current user is allowed to see.
   *
   * @return list of users
   */
  @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
  public
  @ResponseBody
  List<UserDto> listUsers() {
    final List<User> users = userDao.getAll();
    return users.stream().map(user -> new UserDto(user)).collect(Collectors.toList());
  }
}
