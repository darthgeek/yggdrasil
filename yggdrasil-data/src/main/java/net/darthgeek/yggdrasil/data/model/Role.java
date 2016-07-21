package net.darthgeek.yggdrasil.data.model;

import org.hibernate.validator.constraints.NotBlank;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.Set;

/**
 * A user access group.
 *
 * @author jason
 */
@Entity
public class Role implements GrantedAuthority {
  private static final String AUTH_PREFIX = "ROLE_";
  private static final long serialVersionUID = -2484659709742149219L;

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

  public void setId(final Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(final String name) {
    this.name = name;
  }

  public Set<Permission> getPermissions() {
    return permissions;
  }

  public void setPermissions(final Set<Permission> permissions) {
    this.permissions = permissions;
  }

  public Set<User> getUsers() {
    return users;
  }

  public void setUsers(final Set<User> users) {
    this.users = users;
  }

  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + AUTH_PREFIX.hashCode();
    result = prime * result + ((name == null) ? 0 : name.hashCode());
    return result;
  }

  @Override
  public String toString() {
    return getAuthority();
  }
}