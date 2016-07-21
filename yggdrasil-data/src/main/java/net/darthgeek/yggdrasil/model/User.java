package net.darthgeek.yggdrasil.model;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.*;

/**
 * A user of the application.
 *
 * @author jason
 */
@SuppressWarnings("serial")
@Entity
public class User implements UserDetails {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(nullable = false, unique = true)
  @Email
  @NotBlank
  private String email;

  @Column(nullable = false, unique = true)
  @NotBlank
  private String username;

  @Column(nullable = false)
  private String password;

  @Column
  private boolean enabled = true;

  @Column
  private boolean emailVerified;

  @Column(nullable = false)
  private Date createdTime;

  @ManyToMany(fetch = FetchType.LAZY)
  private Set<Role> roles = new TreeSet<Role>();

  @Override
  public boolean equals(final Object obj) {
    if (this == obj) {
      return true;
    }
    if (obj == null) {
      return false;
    }
    if (!(obj instanceof User)) {
      return false;
    }
    User other = (User) obj;
    if (email == null) {
      if (other.email != null) {
        return false;
      }
    } else if (!email.equals(other.email)) {
      return false;
    }
    return true;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    final Set<GrantedAuthority> authorities = new HashSet<GrantedAuthority>();
    authorities.addAll(getPermissions());
    for (Role role : getRoles()) {
      authorities.add(role);
    }
    if (!isEmailVerified()) {
      authorities.clear();
      authorities.add(new SimpleGrantedAuthority("ROLE_VERIFY_EMAILS"));
    }
    return authorities;
  }

  public Date getCreatedTime() {
    return new Date(createdTime.getTime());
  }

  public String getEmail() {
    return email;
  }

  public Long getId() {
    return id;
  }

  @Override
  public String getPassword() {
    return password;
  }

  public Set<Permission> getPermissions() {
    final Set<Permission> permissions = new HashSet<Permission>();
    for (Role role : getRoles()) {
      permissions.addAll(role.getPermissions());
    }
    return permissions;
  }

  public Set<Role> getRoles() {
    return roles;
  }

  @Override
  public String getUsername() {
    return username;
  }

  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + ((email == null) ? 0 : email.hashCode());
    return result;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  public boolean isEmailVerified() {
    return emailVerified;
  }

  @Override
  public boolean isEnabled() {
    return enabled;
  }

  public void setCreatedTime(final Date createdTime) {
    this.createdTime = new Date(createdTime.getTime());
  }

  public void setEmail(final String email) {
    this.email = email;
  }

  public void setEmailVerified(final boolean emailVerified) {
    this.emailVerified = emailVerified;
  }

  public void setEnabled(final boolean enabled) {
    this.enabled = enabled;
  }

  public void setId(final Long id) {
    this.id = id;
  }

  public void setPassword(final String password) {
    this.password = password;
  }

  public void setRoles(final Set<Role> roles) {
    this.roles = roles;
  }

  public void setUsername(final String username) {
    this.username = username;
  }

  @Override
  public String toString() {
    return email;
  }
}