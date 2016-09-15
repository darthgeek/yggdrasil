package net.darthgeek.yggdrasil.mvc.api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import net.darthgeek.yggdrasil.data.model.ExternalAuthProvider;
import net.darthgeek.yggdrasil.data.model.User;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by jason on 9/15/16.
 */
public class UserDto {
  private String id;
  private ExternalAuthProvider accountType;
  private String username;
  private String email;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'hh:mm:ss'Z'")
  private Date createdTime;
  private Set<String> roles = new HashSet<>();
  private Boolean isOnline;

  public UserDto() {
    // Default constructor
  }

  public UserDto(final User user) {
    this(user, null);
  }

  public UserDto(final User user, final Boolean isOnline) {
    this.id = Long.toString(user.getId());
    this.accountType = user.getExternalAuthProvider() == null ? ExternalAuthProvider.LOCAL : user.getExternalAuthProvider();
    this.username = user.getUsername();
    this.email = user.getEmail();
    this.createdTime = user.getCreatedTime();
    this.roles = user.getRoles()
          .stream()
          .map(el -> el.getName())
          .collect(Collectors.toSet());
    this.isOnline = isOnline;
  }

  public String getId() {
    return id;
  }

  public void setId(final String id) {
    this.id = id;
  }

  public ExternalAuthProvider getAccountType() {
    return accountType;
  }

  public void setAccountType(final ExternalAuthProvider accountType) {
    this.accountType = accountType;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(final String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(final String email) {
    this.email = email;
  }

  public Date getCreatedTime() {
    return createdTime;
  }

  public void setCreatedTime(final Date createdTime) {
    this.createdTime = createdTime;
  }

  public Set<String> getRoles() {
    return roles;
  }

  public void setRoles(final Set<String> roles) {
    this.roles = roles;
  }

  public Boolean isOnline() {
    return isOnline;
  }

  public void setOnline(final Boolean online) {
    isOnline = online;
  }

  @Override
  public boolean equals(final Object o) {
    if (this == o) return true;
    if (!(o instanceof UserDto)) return false;

    UserDto userDto = (UserDto) o;

    return id != null ? id.equals(userDto.id) : userDto.id == null;

  }

  @Override
  public int hashCode() {
    return id != null ? id.hashCode() : 0;
  }

  @Override
  public String toString() {
    return "UserDto{" +
          "id='" + id + '\'' +
          ", username='" + username + '\'' +
          ", email='" + email + '\'' +
          ", createdTime='" + createdTime + '\'' +
          ", roles=" + roles +
          ", isOnline=" + isOnline +
          '}';
  }
}
