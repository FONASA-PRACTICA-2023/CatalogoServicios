import React from "react";



function ClaveUnica() {



  return (
    <div className="container w-50 mt-4">
      <h1 className="mb-3">Formulario de Acceso</h1>
      <form className="row g-3 needs-validation" noValidate>
        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">
            First name
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            value="Mark"
            required
          />
        </div>
      </form>
    </div>

  );
}

export default ClaveUnica;