package net.darthgeek.yggdrasil.mvc;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import net.darthgeek.yggdrasil.data.dao.UserDao;
import net.darthgeek.yggdrasil.data.model.ExternalAuthProvider;
import net.darthgeek.yggdrasil.data.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Date;

/**
 * Created by jason on 7/22/2016.
 */
@Controller("googleLoginController")
@RequestMapping("/login/google")
public class GoogleLoginController {
  private static final Logger LOG = LoggerFactory.getLogger(GoogleLoginController.class);
  private static final String CLIENT_ID = "1020627545730-gifi00t2fl2gvgfh89dpnt3cfjsdfh4v.apps.googleusercontent.com";
  private GoogleIdTokenVerifier verifier;

  @Resource
  private UserDao userDao;

  @PostConstruct
  public void init() {
    verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new JacksonFactory())
          .setAudience(Arrays.asList(CLIENT_ID))
          .setIssuer("accounts.google.com")
          .build();
  }

  @RequestMapping(method = RequestMethod.POST)
  @Transactional
  public String login(final @ModelAttribute GoogleLoginForm form, final HttpServletRequest request) {
    final GoogleIdToken idToken;
    try {
      idToken = verifier.verify(form.getToken());
    } catch (Exception e) {
      LOG.error("error verifying security token: " + e, e);
      return "redirect:/error/google";
    }
    if (idToken != null) {
      final GoogleIdToken.Payload payload = idToken.getPayload();

      final String googleId = payload.getSubject();

      User user = userDao.findByExternalId(ExternalAuthProvider.GOOGLE, googleId);
      if (null == user) {
        LOG.info("Creating Google user ID: " + googleId + ": (" + payload.getEmail() + ")");
        user = new User();
        user.setExternalAuth(ExternalAuthProvider.GOOGLE, googleId);
        user.setPassword("");
        user.setEnabled(true);
        user.setCreatedTime(new Date());
        user.setEmail(payload.getEmail());
        user.setUsername(payload.getEmail());
        user.setId(userDao.create(user));
      } else {
        LOG.info("Updating Google user ID: " + googleId + ": (" + payload.getEmail() + ")");
        user.setEmail(payload.getEmail());
        user.setUsername(payload.getEmail());
        userDao.update(user);
      }
      LOG.info("Authenticating " + user.getUsername() + " with authorities: " + user.getAuthorities());

      final Authentication auth = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
      SecurityContextHolder.getContext().setAuthentication(auth);
      request.getSession().setAttribute("user", user);

      return "redirect:/";
    } else {
      LOG.error("invalid Google ID token: " + form.getToken());
      return "redirect:/error/google";
    }
  }
}
