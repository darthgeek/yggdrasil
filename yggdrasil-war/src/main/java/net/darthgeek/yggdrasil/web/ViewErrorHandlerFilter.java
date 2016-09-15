package net.darthgeek.yggdrasil.web;

import org.springframework.http.HttpStatus;
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
      doRedirect(HttpStatus.NOT_FOUND.value(), nse.getCause(), request, response);
    } catch (final Exception ex) {
      doRedirect(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex, request, response);
    }
  }

  private void doRedirect(int httpStatus, Throwable t, final ServletRequest request, final ServletResponse response) throws IOException {
    final HttpServletResponse httpResponse = (HttpServletResponse) response;
    try {
      httpResponse.setStatus(httpStatus);
      request.getRequestDispatcher(String.format("/error/%d", httpStatus)).forward(request, response);
    } catch (ServletException e) {
      throw new RuntimeException("unable to forward to error page", e);
    }
  }
}
