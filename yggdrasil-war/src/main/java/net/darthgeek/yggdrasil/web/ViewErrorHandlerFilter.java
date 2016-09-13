package net.darthgeek.yggdrasil.web;

import org.springframework.web.util.NestedServletException;

import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by jason on 9/13/16.
 */
public class ViewErrorHandlerFilter implements Filter {

  @Override
  public void init(final FilterConfig filterConfig) throws ServletException {
    // Intentionally blank
  }

  @Override
  public void destroy() {
    // Intentionally blank
  }

  @Override
  public void doFilter(final ServletRequest request, final ServletResponse response, final FilterChain chain) throws IOException, ServletException {
    try {
      chain.doFilter(request, response);
    } catch (final NestedServletException nse) {
      doRedirect("/error/404", nse.getCause(), request, response);
    } catch (final Exception ex) {
      doRedirect("/error/500", ex, request, response);
    }
  }

  private void doRedirect(String path, Throwable t, final ServletRequest request, final ServletResponse response) throws IOException {
    final HttpServletResponse httpResponse = (HttpServletResponse) response;
    final StringBuilder sb = new StringBuilder();
    sb.append(request.getServletContext().getContextPath());
    sb.append(path);
    sb.append("?");
    sb.append("exception=");
    sb.append(t);
    httpResponse.sendRedirect(sb.toString());
  }
}
