async function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);

  form.setAttribute("aria-busy", "true");
  form.querySelector("button").disabled = true;
  form
    .querySelectorAll("[data-alert]")
    .forEach((el) => el.setAttribute("hidden", ""));

  try {
    const resp = await fetch(form.action, {
      method: form.method,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data).toString(),
    });

    if (!resp.ok) {
      throw new Error("Request failed");
    }

    form.querySelector('[data-alert="positive"]').removeAttribute("hidden");
  } catch (err) {
    form.querySelector('[data-alert="negative"]').removeAttribute("hidden");
  } finally {
    form.removeAttribute("aria-busy");
    form.querySelector("button").disabled = false;
    form.reset();
  }
}
document.forms.contact.addEventListener("submit", handleSubmit);
