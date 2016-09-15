package net.darthgeek.yggdrasil.data.model;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.*;

/**
 * A user of the application.
 *
 * @author jason
 */
@Entity
public class User implements UserDetails {
  private static final long serialVersionUID = -5590585702123249516L;
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

  @Column(nullable = false)
  private Date createdTime;

  @Column
  @Enumerated(EnumType.STRING)
  private ExternalAuthProvider externalAuthProvider;

  @Column
  private String externalAuthKey;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
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
    return authorities;
  }

  public Date getCreatedTime() {
    return new Date(createdTime.getTime());
  }

  public void setCreatedTime(final Date createdTime) {
    this.createdTime = new Date(createdTime.getTime());
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(final String email) {
    this.email = email;
  }

  public Long getId() {
    return id;
  }

  public void setId(final Long id) {
    this.id = id;
  }

  @Override
  public String getPassword() {
    return password;
  }

  public void setPassword(final String password) {
    this.password = password;
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

  public void setRoles(final Set<Role> roles) {
    this.roles = roles;
  }

  @Override
  public String getUsername() {
    return username;
  }

  public void setUsername(final String username) {
    this.username = username;
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

  @Override
  public boolean isEnabled() {
    return enabled;
  }

  public void setEnabled(final boolean enabled) {
    this.enabled = enabled;
  }

  public ExternalAuthProvider getExternalAuthProvider() {
    return externalAuthProvider;
  }

  public void setExternalAuthProvider(final ExternalAuthProvider externalAuthProvider) {
    this.externalAuthProvider = externalAuthProvider;
  }

  public String getExternalAuthKey() {
    return externalAuthKey;
  }

  public void setExternalAuthKey(final String externalAuthKey) {
    this.externalAuthKey = externalAuthKey;
  }

  public void setExternalAuth(final ExternalAuthProvider externalAuthProvider, final String externalAuthKey) {
    this.externalAuthProvider = externalAuthProvider;
    this.externalAuthKey = externalAuthKey;
  }

  @Override
  public String toString() {
    return email;
  }
}