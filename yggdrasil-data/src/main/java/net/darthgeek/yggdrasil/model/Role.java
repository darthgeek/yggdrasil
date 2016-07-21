package net.darthgeek.yggdrasil.model;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import org.hibernate.validator.constraints.NotBlank;
import org.springframework.security.core.GrantedAuthority;

/**
 * A user access group.
 *
 * @author jason
 */
@SuppressWarnings("serial")
@Entity
public class Role implements GrantedAuthority {
  private static final String AUTH_PREFIX = "ROLE_";

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(unique = true, nullable = false)
  @NotBlank
  private String name;

  @ManyToMany(fetch = FetchType.LAZY)
  private Set<Permission> permissions;

  @ManyToMany(fetch = FetchType.LAZY, mappedBy = "roles")
  private Set<User> users;

  @Override
  public boolean equals(final Object obj) {
    if (this == obj) {
      return true;
    }
    if (obj == null) {
      return false;
    }
    if (!(obj instanceof Role)) {
      return false;
    }
    Role other = (Role) obj;
    if (name == null) {
      if (other.name != null) {
        return false;
      }
    } else if (!name.equals(other.name)) {
      return false;
    }
    return true;
  }

  @Override
  public String getAuthority() {
    return "ROLE_" + name;
  }

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public Set<Permission> getPermissions() {
    return permissions;
  }

  public Set<User> getUsers() {
    return users;
  }

  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + ((AUTH_PREFIX == null) ? 0 : AUTH_PREFIX.hashCode());
    result = prime * result + ((name == null) ? 0 : name.hashCode());
    return result;
  }

  public void setId(final Long id) {
    this.id = id;
  }

  public void setName(final String name) {
    this.name = name;
  }

  public void setPermissions(final Set<Permission> permissions) {
    this.permissions = permissions;
  }

  public void setUsers(final Set<User> users) {
    this.users = users;
  }

  @Override
  public String toString() {
    return getAuthority();
  }
}