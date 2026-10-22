
function InlineForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Form submitted successfully!");
  };

  return (
    <form
      className="row lg:row-cols-auto g-3 align-items-center"
      onSubmit={handleSubmit}
    >
      <div className="col-12">
        <label
          className="visually-hidden"
          htmlFor="inlineFormInputGroupUsername"
        >
          Username
        </label>

        <div className="input-group">
          <div className="input-group-text">@</div>
          <input
            type="text"
            className="form-control"
            id="inlineFormInputGroupUsername"
            placeholder="Username"
          />
        </div>
      </div>

      <div className="col-12">
        <label
          className="visually-hidden"
          htmlFor="inlineFormSelectPref"
        >
          Preference
        </label>

        <select
          className="form-select"
          id="inlineFormSelectPref"
          defaultValue=""
        >
          <option value="" disabled>
            Choose...
          </option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>

      <div className="col-12">
        <div className="form-field">
          <input
            type="checkbox"
            id="inlineFormCheck"
            className="check"
          />
          <label htmlFor="inlineFormCheck">
            Remember me
          </label>
        </div>
      </div>

      <div className="col-12">
        <button
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default InlineForm;
