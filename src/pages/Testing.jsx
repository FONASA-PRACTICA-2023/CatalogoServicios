import React from "react";
import { useCookies } from "react-cookie";

function Testing() {
  const [cookies, setCookie, removeCookie] = useCookies();

  const handleSetCookie = () => {
    console.log("handleSetCookie");
    setCookie("token", "1234567890", { path: "/" });
  };

  const handleRemoveCookie = () => {
    console.log("handleRemoveCookie");

    setCookie("token", "", { path: "/" });
    setCookie("JSESSIONID", "", { path: "/" });
    setCookie("ORA_OTD_JROUTE", "", { path: "/" });
    cookies.remove();
  };

  return (
    <>
      <header>
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              Fixed navbar
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
              <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Link
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link disabled">Disabled</a>
                </li>
              </ul>
              <form class="d-flex" role="search">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button class="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
      </header>

      <main class="flex-shrink-0">
        <div class="container">
          <h1 class="mt-5">Sticky footer with fixed navbar</h1>
          <p class="lead">
            Pin a footer to the bottom of the viewport in desktop browsers with
            this custom HTML and CSS. A fixed navbar has been added with{" "}
            <code class="small">padding-top: 60px;</code> on the{" "}
            <code class="small">main &gt; .container</code>.
          </p>
          <div>
            <h1>Testing</h1>
            <button onClick={handleSetCookie}>Set Cookie</button>

            {cookies.token && (
              <p>
                Cookie: {cookies.token}{" "}
                <button onClick={handleRemoveCookie}>Remove Cookie</button>
              </p>
            )}
          </div>
        </div>
      </main>

      <footer class="footer mt-auto py-3 bg-light">
        <div class="container">
          <span class="text-muted">Place sticky footer content here.</span>
        </div>
      </footer>
    </>
  );
}

export default Testing;